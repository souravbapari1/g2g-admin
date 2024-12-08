"use client";
import React, { useState } from "react";
import { AcademicRequestsItem } from "./AcademicRequests";
import { formatDateTimeFromString } from "@/helper/dateTime";
import { Button } from "@/components/ui/button";
import { updateAcademicsStatus } from "./manageRequests";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { EyeIcon, Printer } from "lucide-react";
import Link from "next/link";

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
          <div className="">
            {item.status === "pending" && (
              <div className="">
                <Button
                  size="sm"
                  disabled={loading}
                  onClick={() => updateStatus("approved")}
                >
                  Accept
                </Button>
                <Button
                  disabled={loading}
                  variant="destructive"
                  className="ml-3"
                  size="sm"
                  onClick={() => updateStatus("cancel")}
                >
                  Reject
                </Button>
              </div>
            )}
            {item.status === "approved" && (
              <Button
                size="sm"
                disabled={loading}
                onClick={() => updateStatus("complete")}
              >
                Make Complete
              </Button>
            )}
            {item.status === "cancel" && (
              <Badge variant="destructive">Rejected</Badge>
            )}
            {item.status === "complete" && (
              <Badge variant="default">Completed</Badge>
            )}
          </div>
          <Link href={`/dashboard/academy/join-requests/view/${item.id}`}>
            <EyeIcon className="cursor-pointer text-gray-500" />
          </Link>
        </div>
      </td>
    </tr>
  );
}

export default AcademicsItem;
