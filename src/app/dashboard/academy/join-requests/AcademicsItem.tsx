"use client";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDateTimeFromString } from "@/helper/dateTime";
import { cn } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { AcademicRequestsItem } from "./AcademicRequests";
import { updateAcademicsStatus } from "./manageRequests";

function AcademicsItem({
  item,
  onUpdate,
}: {
  item: AcademicRequestsItem;
  onUpdate: (data: AcademicRequestsItem) => void;
}) {
  const [loading, setLoading] = useState(false);
  const updateStatus = async (
    status: "pending" | "approved" | "complete" | "cancel"
  ) => {
    try {
      setLoading(true);
      const response = await updateAcademicsStatus(item.id, status);
      if (response) {
        toast.success("Status updated successfully");
        onUpdate(response);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr key={item.id} className="capitalize">
      <td>{item.id}</td>
      <td>
        <Badge
          className={cn(
            item.status == "complete" && "bg-green-500",
            item.status == "cancel" && "bg-red-500",
            item.status == "approved" && "bg-yellow-500",
            item.status == "pending" && "bg-blue-500"
          )}
        >
          {item.status}
        </Badge>
      </td>
      <td>
        {item.applicationData.parent.title}{" "}
        {item.applicationData.parent.firstName +
          " " +
          item.applicationData.parent.lastName}
      </td>
      <td>{item.applicationData.parent.phone}</td>
      <td>{item.applicationData.parent.email}</td>
      <td>{item.applicationData.parent.address}</td>
      <td>{item.academic.name}</td>
      <td className="text-center">
        {item.applicationData.participants.length}
      </td>
      <td className="text-center">
        {item.applicationData.participants
          .map((item) => item.tshirtSize)
          .join(", ")}
      </td>
      <td className="text-center">
        {item.academic.pricing === "free"
          ? "Free"
          : item.academic.amount * item.applicationData.participants.length +
            " OMR"}
      </td>
      <td>{formatDateTimeFromString(item.created)}</td>
      <td>{item.applicationData.message}</td>
      <td>{formatDateTimeFromString(item.updated)}</td>
      <td>
        {item.expand?.updateBy
          ? item?.expand?.updateBy.first_name +
            " " +
            item?.expand?.updateBy.last_name
          : "N/A"}
      </td>
      <td className="action">
        <div className="flex justify-between items-center gap-4">
          <Select
            onValueChange={updateStatus}
            defaultValue={item.status}
            value={item.status}
          >
            <SelectTrigger className="w-[120px] rounded-none border-none bg-gray-100">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem disabled value="new">
                New
              </SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="complete">Complete</SelectItem>
              <SelectItem value="cancel">Cancel</SelectItem>
            </SelectContent>
          </Select>
          <Link href={`/dashboard/academy/join-requests/view/${item.id}`}>
            <EyeIcon className="cursor-pointer text-gray-500" />
          </Link>
        </div>
      </td>
    </tr>
  );
}

export default AcademicsItem;
