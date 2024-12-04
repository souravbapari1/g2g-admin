import React, { useState } from "react";
import { FSLPItem } from "./fslp";
import { formatDateTimeFromString } from "@/helper/dateTime";
import Link from "next/link";
import { genPbFiles } from "@/request/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateFslpStatus } from "./fslpFunctions";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

function FslpItem({
  item,
  onUpdate,
}: {
  item: FSLPItem;
  onUpdate: (data: FSLPItem) => void;
}) {
  const [data, setData] = useState(item);
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const updateStatus = async (status: string) => {
    try {
      toast.loading("Updating Status...");
      setLoading(true);
      const response = await updateFslpStatus(
        data.id,
        status as any,
        session?.data?.user.id || ""
      );
      setData(response);
      toast.dismiss();

      onUpdate(response);
      toast.success("Status updated successfully");
    } catch (error) {
      toast.dismiss();
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr>
      <td>{data.id}</td>
      <td>
        {data.application.firstName} {data.application.lastName}
      </td>
      <td>{data.application.gender}</td>
      <td>{data.application.mobileNo}</td>
      <td>{data.application.emailID}</td>
      <td>{data.application.eduState}</td>
      <td>{data.application.nationality}</td>
      <td>{data.application.universityName}</td>
      <td>{data.application.dob}</td>
      <td>{data.application.country}</td>
      <td>{data.application.city}</td>
      <td>{data.status}</td>
      <td>{data.application.sortBreif}</td>
      <td>{formatDateTimeFromString(data.created)}</td>
      <td>
        <Link
          target="_blank"
          className="text-primary mr-3"
          href={genPbFiles(item, data.cv)}
        >
          View CV
        </Link>
        -
        <Link
          target="_blank"
          className="text-primary ml-3"
          href={genPbFiles(item, data.pic)}
        >
          PIC
        </Link>
      </td>
      <td>{formatDateTimeFromString(data.updated)}</td>
      <td>
        {data.updateBy &&
          data.expand?.updateBy?.first_name +
            " " +
            data.expand?.updateBy?.last_name}
      </td>
      <td className="action">
        <Select
          value={data.status}
          onValueChange={updateStatus}
          disabled={loading}
        >
          <SelectTrigger className="w-[120px] font-normal h-8 border-none bg-gray-100">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="complete">Complete</SelectItem>
            <SelectItem value="cancel">Cancel</SelectItem>
          </SelectContent>
        </Select>
      </td>
    </tr>
  );
}

export default FslpItem;
