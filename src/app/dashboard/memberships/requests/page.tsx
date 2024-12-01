"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import { formatTimestampCustom } from "@/helper/dateTime";
import { Collection } from "@/interfaces/collection";
import { MemberShipPayment } from "@/interfaces/membership";
import { cn } from "@/lib/utils";
import { AdminAuthToken, client, extractErrors } from "@/request/actions";
import {
  NewMemberShipItemNew,
  setUserMembership,
  updateMembershipPayment,
} from "@/request/worker/membership/membership";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function page() {
  const [data, setData] = useState<Collection<MemberShipPayment>>();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const getRequests = async () => {
    return await client
      .get("/api/collections/memberships_payments/records", {
        page,
        expand: "user,membership",
      })
      .send<Collection<MemberShipPayment>>();
  };

  const loadPageData = async () => {
    try {
      setPageLoading(true);
      const req = await getRequests();
      setData({
        ...req,
        items: [...(data?.items || []), ...req?.items],
      });
      return req;
    } catch (error: any) {
      const errors = extractErrors(error?.response);
      toast.error(errors[0]);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    loadPageData();
  }, [page]);

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
      <div className="tableWrapper">
        <table className="tblView table-fixed">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Plan</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.items.map((item) => (
              <tr key={item.id}>
                <td>
                  {item.expand?.user?.first_name +
                    " " +
                    item.expand?.user?.last_name}
                </td>
                <td>{item.expand?.membership?.name}</td>
                <td>{item.amount} OMR</td>
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
                <td className="flex justify-center gap-4">
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
                          await updateMembership(item.id, { status: "cancel" });
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
    </WorkSpace>
  );
}

export default page;
