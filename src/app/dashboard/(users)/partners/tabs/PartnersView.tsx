import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDateTimeFromString } from "@/helper/dateTime";
import { UserItem } from "@/interfaces/user";
import { genPbFiles } from "@/request/actions";
import { setStatusPartner } from "@/request/worker/partnors/managePartners";
import { Eye, Info } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import PartnersInfo from "./PartnersInfo";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { getUserStatus } from "../view/[id]/actions";

function PartnersView({
  partners,
  onUpdate,
  status,
}: {
  partners: UserItem[] | undefined;
  onUpdate?: Function;
  status?: string;
}) {
  const session = useSession();
  const updatePartnerStatus = useMutation({
    mutationKey: ["updatePartnerStatus", "partners"],
    mutationFn: (data: {
      id: string;
      status: "approved" | "rejected";
      rejectReason?: string;
      updateBy?: string;
    }) =>
      setStatusPartner(data.id, data.status, data.rejectReason, data.updateBy),

    onError: () => {
      toast.error("Something went wrong! Status not updated");
    },

    onSuccess: () => {
      onUpdate?.();
      toast.success("Status updated successfully");
    },
  });

  if (partners?.length == 0) {
    return <p className="p-10">No Partners Found</p>;
  }

  return (
    <div className="tableWrapper">
      <table className="tblView ">
        <thead>
          <tr>
            <th className="w-8"></th>
            <th>User ID</th>
            <th>Image</th>
            <th>Applicant Name</th>
            <th>Position</th>
            <th>Email</th>
            <th>Mobile NO</th>
            <th>Company Name</th>
            <th>Industry Type</th>
            <th>Org./Company Type</th>
            <th>Size Hint</th>
            <th>Country</th>
            <th>City</th>
            <th>Address</th>
            <th>Request Time</th>
            <th>Map Location</th>
            <th>Assign Projects</th>
            <th>Total Amount</th>
            <th>No. of orders</th>
            <th>No. of Trees</th>
            <th>Last Login</th>
            <th>Level</th>
            {status == "Approved" && <th>Approved DateTime</th>}
            {status == "Rejected" && <th>Reject DateTime</th>}
            {status != "Pending" && <th>{status + " By"}</th>}
            {status == "Rejected" && <th>Reject Reason</th>}
            <th className="action">Actions</th>
          </tr>
        </thead>
        <tbody>
          {partners?.map((item, index) => (
            <>
              <PartnersViewTr
                key={index}
                item={item}
                index={index}
                status={status}
                updatePartnerStatus={updatePartnerStatus}
              />
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PartnersView;

function PartnersViewTr({
  item,
  index,
  status,
  updatePartnerStatus,
}: {
  item: UserItem;
  index: number;
  status?: string;
  updatePartnerStatus: any;
}) {
  const session = useSession();
  const data = useQuery({
    queryKey: [item.id],
    queryFn: async () => {
      return await getUserStatus(item.id);
    },
  });
  return (
    <tr key={index}>
      <td>
        <PartnersInfo user={item}>
          <Info className="cursor-pointer" />
        </PartnersInfo>
      </td>
      <td className="uppercase">{item.id}</td>
      <td>
        <Avatar
          className={cn(
            "ring-2 ring-green-600 ring-offset-2",
            item.isBlocked && "ring-2 ring-red-600 ring-offset-2"
          )}
        >
          <AvatarImage
            className="rounded-full"
            src={genPbFiles(item, item.avatar)}
          />
          <AvatarFallback>{item.first_name.split("")[0]}</AvatarFallback>
        </Avatar>
      </td>
      <td>{item.expand?.company?.application_name}</td>
      <td>{item.expand?.company?.position}</td>
      <td>{item.email}</td>
      <td>{item.mobile_no}</td>
      <td>{item.expand?.company?.company_name}</td>
      <td>{item.expand?.company?.Industry_type}</td>
      <td>{item.expand?.company?.companyType}</td>

      <td>{item.expand?.company?.size_hint}</td>
      <td>{item.expand?.company?.country}</td>
      <td>{item.expand?.company?.city}</td>
      <td>{item.expand?.company?.address}</td>

      <td>{formatDateTimeFromString(item.expand?.company?.created || "")}</td>
      <td>
        <Link
          href={item.expand?.company?.map_location || ""}
          target="_blank"
          className="text-blue-700"
        >
          View On Map
        </Link>
      </td>
      <td className="text-center">{data.data?.assignedProjects || "--"}</td>

      <td className="text-center">{data.data?.totalAmount || "--"}</td>
      <td className="text-center">
        {(item.tree_orders?.length || 0) + (data.data?.totalOthers || 0)}
      </td>
      <td className="text-center">{data.data?.totalTrees || 0}</td>
      <td>
        {item.lastLogin
          ? formatDateTimeFromString(item.lastLogin || "")
          : "N/A"}
      </td>
      <td>{item.level || "N/A"}</td>
      {status != "Pending" && (
        <td>
          {formatDateTimeFromString(item.expand?.company?.approvedDate || "")}
        </td>
      )}
      {status != "Pending" && (
        <td>
          {item.expand?.company?.expand?.updateBy &&
            item.expand?.company?.expand?.updateBy?.first_name +
              " " +
              item.expand?.company?.expand?.updateBy?.last_name}
        </td>
      )}

      {status == "Rejected" && <td>{item.expand?.company?.rejectReason}</td>}
      <td className="action">
        <div className="flex justify-center items-center gap-5">
          {item.expand?.company?.approved_status == "pending" && (
            <div className="flex justify-center items-center gap-3">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  const confirm = window.confirm("Are You Sure To Update?");
                  if (!confirm) {
                    return;
                  }
                  updatePartnerStatus.mutate({
                    id: item.expand?.company?.id || "",
                    status: "approved",
                  });
                }}
              >
                Accept
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  const confirm = window.confirm("Are You Sure To Reject?");
                  if (!confirm) {
                    return;
                  }
                  const rejectReason = window.prompt("Why You Reject?");
                  if (!rejectReason) {
                    return;
                  }
                  updatePartnerStatus.mutate({
                    id: item.expand?.company?.id || "",
                    status: "rejected",
                    rejectReason: rejectReason || "",
                  });
                }}
              >
                Reject
              </Button>
            </div>
          )}
          {item.expand?.company?.approved_status == "approved" && (
            <div className="flex justify-center items-center gap-3">
              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  const confirm = window.confirm("Are You Sure To Reject?");
                  if (!confirm) {
                    return;
                  }
                  const rejectReason = window.prompt("Why You Reject?");
                  if (!rejectReason) {
                    return;
                  }
                  updatePartnerStatus.mutate({
                    id: item.expand?.company?.id || "",
                    status: "rejected",
                    rejectReason: rejectReason || "",
                  });
                }}
              >
                Reject
              </Button>
            </div>
          )}
          {item.expand?.company?.approved_status == "rejected" && (
            <div className="flex justify-center items-center gap-3">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  const confirm = window.confirm("Are You Sure To Update?");
                  if (!confirm) {
                    return;
                  }
                  updatePartnerStatus.mutate({
                    id: item.expand?.company?.id || "",
                    status: "approved",
                    updateBy: session?.data?.user?.id,
                  });
                }}
              >
                ReApprove
              </Button>
            </div>
          )}
          <Link href={`/dashboard/user/${item.id}`}>
            <Eye />
          </Link>
        </div>
      </td>
    </tr>
  );
}
