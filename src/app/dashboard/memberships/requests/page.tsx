"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import { Input } from "@/components/ui/input";
import { formatTimestampCustom } from "@/helper/dateTime";
import { Collection } from "@/interfaces/collection";
import { MembershipItem, MemberShipPayment } from "@/interfaces/membership";
import { cn } from "@/lib/utils";
import { AdminAuthToken, client, extractErrors } from "@/request/actions";
import {
  getMembership,
  NewMemberShipItemNew,
  setUserMembership,
  updateMembershipPayment,
} from "@/request/worker/membership/membership";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGlobalDataSetContext } from "@/components/context/globalDataSetContext";
import { get } from "http";

function page() {
  const { countryCityListGlobal } = useGlobalDataSetContext();
  const [data, setData] = useState<Collection<MemberShipPayment>>();
  const [page, setPage] = useState(1);
  const [memberships, setMemberships] = useState<Collection<MembershipItem>>();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
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
      const req = await updateMembershipPayment({ id, data: updateData });
      if (req.status == "confirm") {
        await setUserMembership(
          req.user,
          req.membership,
          AdminAuthToken().Authorization
        );
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

      toast.dismiss();
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
    <WorkSpace>
      <WorkHeader title="Membership Requests" />
      <div className="">
        <div className="flex justify-between items-center bg-gray-100">
          <Input
            value={filters?.search}
            onChange={(e) => setFilter({ ...filters, search: e.target.value })}
            placeholder="Search by Name or ID"
            className="rounded-none border-none bg-gray-100"
          />
          <div className="flex justify-end items-center">
            <Select
              value={filters?.plan || ""}
              onValueChange={(v) => {
                setFilter({ ...filters, plan: v });
              }}
            >
              <SelectTrigger className="w-[140px] rounded-none bg-gray-100 border-none ">
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
              <SelectTrigger className="w-[140px] rounded-none bg-gray-100 border-none ">
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
              <SelectTrigger className="w-[140px] rounded-none bg-gray-100 border-none ">
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
              <SelectTrigger className="w-[140px] rounded-none bg-gray-100 border-none ">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirm">Confirm</SelectItem>
                <SelectItem value="cancel">Cancel</SelectItem>
                <SelectItem value="null">None</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="tableWrapper">
          <table className="tblView ">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Email ID</th>
                <th>Mobile No</th>
                <th>Active Planes</th>
                <th>Country</th>
                <th>City</th>
                <th>Total Price</th>
                <th>Plan</th>
                <th>Date</th>
                <th>Status</th>
                <th className="action">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    {item.expand?.user?.first_name +
                      " " +
                      item.expand?.user?.last_name}
                  </td>
                  <td>{item.expand?.user?.email}</td>
                  <td>{item.expand?.user?.mobile_no}</td>
                  <td>{item.expand?.user?.membership?.length || "0  Plans"}</td>
                  <td>{item.expand?.user?.country}</td>
                  <td>{item.expand?.user?.city}</td>
                  <td>{item.amount} OMR</td>
                  <td>{item.expand?.membership?.name}</td>
                  <td>{formatTimestampCustom(item.created)}</td>
                  <td className="uppercase">
                    <Badge
                      className={cn(
                        item.status == "confirm" && "bg-green-500",
                        item.status == "cancel" && "bg-red-500",
                        item.status == "pending" && "bg-yellow-500"
                      )}
                    >
                      {item.status}
                    </Badge>
                  </td>
                  <td className="flex justify-center gap-4 action">
                    {item.status == "pending" ? (
                      <div className="flex justify-center gap-4">
                        <Button
                          size="sm"
                          onClick={async () => {
                            await updateMembership(item.id, {
                              status: "confirm",
                            });
                          }}
                          disabled={loading}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={loading}
                          onClick={async () => {
                            await updateMembership(item.id, {
                              status: "cancel",
                            });
                          }}
                        >
                          Reject
                        </Button>
                      </div>
                    ) : (
                      <p>Status Updated</p>
                    )}
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
    </WorkSpace>
  );
}

export default page;
