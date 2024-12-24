"use client";
import { useGlobalDataSetContext } from "@/components/context/globalDataSetContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { formatDateTimeFromString } from "@/helper/dateTime";
import { usePrintElement } from "@/hooks/usePrintElement";
import { Collection } from "@/interfaces/collection";
import { MembershipItem, MemberShipPayment } from "@/interfaces/membership";
import { cn } from "@/lib/utils";
import { AdminAuthToken, client, extractErrors } from "@/request/actions";
import {
  decStocksMembership,
  getMembership,
  NewMemberShipItemNew,
  setUserMembership,
  updateMembershipPayment,
} from "@/request/worker/membership/membership";
import { Eye, Filter, Printer } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";

function RequestList() {
  const { countryCityListGlobal } = useGlobalDataSetContext();
  const [data, setData] = useState<Collection<MemberShipPayment>>();
  const [page, setPage] = useState(1);
  const [memberships, setMemberships] = useState<Collection<MembershipItem>>();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [showFilters, setShowFilter] = useState<boolean>(false);
  const [filters, setFilter] = useState<{
    state?: string;
    plan?: string;
    country?: string;
    city?: string;
    search?: string;
  }>();

  const loadMemberShip = async () => {
    const res = await getMembership();
    setMemberships(res);
  };

  useEffect(() => {
    loadMemberShip();
  }, []);

  const getRequests = async () => {
    return await client
      .get("/api/collections/memberships_payments/records", {
        page,
        expand: "user,membership",
        filter: genRateFilter(),
      })
      .send<Collection<MemberShipPayment>>();
  };

  const genRateFilter = () => {
    let filter = [];
    if (filters?.state) {
      if (filters?.state != "null") {
        filter.push(`status='${filters?.state}'`);
      }
    }
    if (filters?.plan) {
      if (filters?.plan != "null") {
        filter.push(`membership='${filters?.plan}'`);
      }
    }
    if (filters?.country) {
      if (filters?.country != "null") {
        filter.push(`user.country='${filters?.country}'`);
      }
    }
    if (filters?.city) {
      if (filters?.city != "null") {
        filter.push(`user.city='${filters?.city}'`);
      }
    }
    if (filters?.search) {
      filter.push(
        `user.first_name~'${filters?.search}' || id~'${filters?.search}'`
      );
    }
    filter.push(`completeOrder=true`);
    return filter.length > 0 ? `(${filter.join(" && ")})` : "";
  };

  const loadPageData = async (loadMore = false) => {
    try {
      setPageLoading(true);
      const req = await getRequests();
      if (loadMore) {
        setData({
          ...req,
          items: [...(data?.items || []), ...req?.items],
        });
      } else {
        setData(req);
      }
      return req;
    } catch (error: any) {
      const errors = extractErrors(error?.response);
      toast.error(errors[0]);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    loadPageData(true);
  }, [page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadPageData(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [filters]);

  const updateMembership = async (
    id: string,
    updateData: NewMemberShipItemNew
  ) => {
    try {
      toast.dismiss();
      toast.loading("Updating Membership...");
      setLoading(true);

      const req = await updateMembershipPayment({
        id,
        data: {
          ...updateData,
        },
      });
      if (req.status == "delivred") {
        const update = await decStocksMembership(req.membership);

        await setUserMembership(
          req.user,
          req.membership,
          AdminAuthToken().Authorization
        );
        if (update) {
          toast.dismiss();
        }
      } else {
        toast.dismiss();
      }

      const updatedData = [...(data?.items || [])].map((item) => {
        if (item.id === id) {
          item.status = updateData.status;
        }
        return item;
      });

      if (data) {
        setData({
          ...data,
          items: updatedData,
        });
      }

      toast.success("Membership Updated Successfully");
      return req;
    } catch (error: any) {
      toast.dismiss();

      const errors = extractErrors(error?.response);
      toast.error(errors[0]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-start items-start w-full p-5 flex-col gap-5">
        <div className="flex justify-between items-center w-full">
          <Input
            value={filters?.search}
            onChange={(e) => setFilter({ ...filters, search: e.target.value })}
            placeholder="Search by Name or ID"
            className="rounded border-none w-96 bg-gray-100"
          />
          <div className="flex justify-center gap-3 items-center">
            <Badge
              variant="secondary"
              className="rounded flex justify-center items-center gap-3"
            >
              <p className="text-sm">Total: {memberships?.totalItems || 0}</p>
            </Badge>
            <Badge
              variant={!showFilters ? "secondary" : "destructive"}
              className="rounded flex cursor-pointer justify-center items-center gap-3"
              onClick={() => {
                setFilter({
                  search: "",
                  state: "",
                  plan: "",
                  country: "",
                  city: "",
                });
                setShowFilter(!showFilters);
              }}
            >
              <Filter size={8} className="mr-1" />
              {showFilters ? "Hide Filter" : "Filter"}
            </Badge>
          </div>
        </div>
        {showFilters && (
          <div className="flex justify-center bg-gray-400 p-4 rounded items-center w-full">
            <div className="flex justify-start w-full gap-5 items-center">
              <Select
                value={filters?.plan || ""}
                onValueChange={(v) => {
                  setFilter({ ...filters, plan: v });
                }}
              >
                <SelectTrigger className="w-full rounded bg-gray-100 border-none ">
                  <SelectValue placeholder="Plan Name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="null">None</SelectItem>
                  {memberships?.items?.map((item) => (
                    <SelectItem value={item.id}>{item.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filters?.country || ""}
                onValueChange={(d) => setFilter({ ...filters, country: d })}
              >
                <SelectTrigger className="w-full rounded bg-gray-100 border-none ">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="null">None</SelectItem>
                  {countryCityListGlobal?.map((item) => (
                    <SelectItem key={item.country} value={item.country}>
                      {item.country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filters?.city || ""}
                onValueChange={(d) => setFilter({ ...filters, city: d })}
              >
                <SelectTrigger className="w-full rounded bg-gray-100 border-none ">
                  <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="null">None</SelectItem>
                  {countryCityListGlobal
                    ?.find((e) => e.country == filters?.country)
                    ?.cities?.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              <Select
                value={filters?.state || ""}
                onValueChange={(e) => {
                  setFilter({ ...filters, state: e });
                }}
              >
                <SelectTrigger className="w-full rounded bg-gray-100 border-none ">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="delivred">Delivred</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="null">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>
      <div className="tableWrapper">
        <table className="tblView ">
          <thead>
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Customer</th>
              <th>Plan</th>
              <th>Qut</th>
              <th>Total Price</th>
              <th>Email ID</th>
              <th>Mobile No</th>

              <th>Country</th>
              <th>City</th>
              <th>Date</th>
              <th className="action">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td className="uppercase">
                  <Badge
                    className={cn(
                      item.status == "delivred" && "bg-green-500",
                      item.status == "cancelled" && "bg-red-500",
                      item.status == "processing" && "bg-yellow-500",
                      item.status == "new" && "bg-blue-500"
                    )}
                  >
                    {item.status}
                  </Badge>
                </td>
                <td>
                  {item.expand?.user?.first_name +
                    " " +
                    item.expand?.user?.last_name}
                </td>
                <td>{item.expand?.membership?.name}</td>
                <td className="text-center">{item.qun}</td>
                <td>{item.amount * item.qun} OMR</td>
                <td>{item.expand?.user?.email}</td>
                <td>{item.expand?.user?.mobile_no}</td>

                <td>{item.expand?.user?.country}</td>
                <td>{item.expand?.user?.city}</td>
                <td>{formatDateTimeFromString(item.created)}</td>

                <td className="flex justify-center items-center gap-4 action">
                  <RequestListView
                    item={item}
                    updateMembership={updateMembership}
                  />

                  <Select
                    value={item.status || ""}
                    onValueChange={async (e) => {
                      await updateMembership(item.id, {
                        status: e as any,
                      });
                    }}
                  >
                    <SelectTrigger className="w-full  rounded bg-gray-100 border-none ">
                      <SelectValue placeholder={item.status} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new" disabled>
                        New
                      </SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="delivred">Delivred</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="null">None</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(data?.totalPages || 0) > page && (
          <div className="w-full my-10 flex justify-center items-center">
            <Button
              disabled={pageLoading}
              onClick={() => setPage(page + 1)}
              size="sm"
              variant="secondary"
              className="mx-auto px-10"
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RequestList;

function RequestListView({
  item,
  updateMembership,
}: {
  item: MemberShipPayment;
  updateMembership: (
    id: string,
    updateData: NewMemberShipItemNew
  ) => Promise<MemberShipPayment | undefined>;
}) {
  // Ref for the printable section
  const printRef = useRef<HTMLDivElement>(null);

  // Function to print the specific ref content
  const handlePrint = () => {
    if (printRef.current) {
      // Open a new window
      const printWindow = window.open("", "_blank")!;

      // Write the printable content to the new window
      printWindow.document.write(`
        <html>
          <head>
            <title>Request Details</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 2em; }
              .print-container { color: #333; }
              .badge { display: inline-block; padding: 0.5em; border-radius: 5px; font-weight: bold; }
              .bg-green-500 { background-color: #28a745; color: white; }
              .bg-red-500 { background-color: #dc3545; color: white; }
              .bg-yellow-500 { background-color: #ffc107; color: black; }
              .bg-blue-500 { background-color: #007bff; color: white; }
              ul { list-style: none; padding: 0; }
              li { margin-bottom: 0.5em; }
              .border { border: 1px solid #ddd; padding: 1em; }
            </style>
          </head>
          <body>
            <div class="print-container">
              ${printRef.current.innerHTML}
            </div>
          </body>
        </html>
      `);

      // Close the document stream and trigger print
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer">
        <Eye />
      </SheetTrigger>
      <SheetContent className="overflow-auto">
        <SheetHeader>
          <SheetTitle>Request Details</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          {/* Printable Section */}
          <div ref={printRef} className="p-4 bg-white">
            <ul className="flex flex-col gap-3 text-gray-800">
              <li>ID: {item.id}</li>
              <li className="uppercase mt-1 mb-2">
                <Badge
                  className={`badge ${
                    item.status === "delivred"
                      ? "bg-green-500"
                      : item.status === "cancelled"
                      ? "bg-red-500"
                      : item.status === "processing"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                  }`}
                >
                  {item.status}
                </Badge>
              </li>
              <li>
                Name:{" "}
                {`${item.expand?.user?.first_name || ""} ${
                  item.expand?.user?.last_name || ""
                }`}
              </li>
              <li>Plan: {item.expand?.membership?.name}</li>
              <li>Qut: {item.qun}</li>
              <li>Amount: {item.amount} OMR</li>
              <li>Email: {item.expand?.user?.email}</li>
              <li>MobileNo: {item.expand?.user?.mobile_no}</li>
              <li>Plans: {item.expand?.user?.mamberships?.length} Plans</li>
              <li>Country: {item.expand?.user?.country}</li>
              <li>City: {item.expand?.user?.city}</li>
              <li>Date: {formatDateTimeFromString(item.created)}</li>
            </ul>
            <div>
              {item.qna.map((qna, id) => (
                <div key={id} className="mt-2 border p-2">
                  <p className="text-gray-600">
                    <span className="font-bold">Q{id + 1}: </span>
                    {qna.qus}
                  </p>
                  <p className="text-gray-800">
                    <span className="font-bold">Answer: </span>
                    {qna.answers}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Status Dropdown */}
          <Select
            value={item.status || ""}
            onValueChange={async (e) => {
              await updateMembership(item.id, {
                status: e as any,
              });
            }}
          >
            <SelectTrigger className="w-full mt-5 mb-5 rounded bg-gray-100 border-none">
              <SelectValue placeholder={item.status} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new" disabled>
                New
              </SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="delivred">Delivred</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="null">None</SelectItem>
            </SelectContent>
          </Select>

          {/* Print Button */}
          <Button className="w-full" size="sm" onClick={handlePrint}>
            <Printer /> Print Pdf
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
