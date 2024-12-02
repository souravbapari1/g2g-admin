import { useGlobalDataSetContext } from "@/components/context/globalDataSetContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDateTimeFromString } from "@/helper/dateTime";
import { OthersOrdersItem } from "@/interfaces/othersProjects";
import { extractErrors } from "@/request/actions";
import { assignOthersProjectOrder } from "@/request/worker/orders/othersorders/manageOthersOrders";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

function OtherOrdersView({ order }: { order: OthersOrdersItem }) {
  const [data, setData] = useState(order);
  const session = useSession();
  const { employeeListGlobal, projectsListGlobal, projectTypeListGlobal } =
    useGlobalDataSetContext();
  const project = projectsListGlobal.find(
    (project) => project.id === data.project
  );

  const onAssignUser = async (userId: string) => {
    try {
      toast.loading("Assigning Order...");
      const res = await assignOthersProjectOrder(data.id, {
        asigned_to: userId,
        status: "processing",
        updatedBy: session.data?.user.id,
      });
      setData(res);
      toast.dismiss();
      toast.success("Order assigned successfully");
    } catch (error: any) {
      toast.dismiss();
      const errors = extractErrors(error?.response);
      toast.error(errors[0]);
      console.log(error);
    }
  };

  const assignedEmployee = employeeListGlobal.find(
    (user) => user.id === data.asigned_to
  );

  const placeholder = !data.asigned_to
    ? "N/A"
    : `${assignedEmployee?.first_name || ""} ${
        assignedEmployee?.last_name || ""
      }`;

  return (
    <tr>
      <td>{data.id}</td>
      <td>{data.expand.user.first_name + " " + data.expand.user.last_name}</td>
      <td>{data.expand.user.email}</td>
      <td>{data.expand.user.mobile_no}</td>
      <td className="capitalize">{data.expand.user.user_type}</td>
      <td>{formatDateTimeFromString(data.created)}</td>
      <td>{data.expand.user.mobile_no}</td>
      <td>{project?.name}</td>
      <td>{data.amount} OMR</td>
      <td className="capitalize">{data.status}</td>
      <td>
        {session?.data?.user.role === "ADMIN" && (
          <td>
            <Select
              defaultValue={data.asigned_to}
              onValueChange={(id) => {
                onAssignUser(id);
              }}
            >
              <SelectTrigger className="w-[130px] mx-auto h-6 px-1 text-xs rounded-none capitalize pl-2 pr-0  ">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {employeeListGlobal.map((user) => (
                  <SelectItem
                    key={user.id}
                    value={user.id}
                    onClick={() => onAssignUser(user.id)}
                  >
                    {user.first_name + " " + user.last_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </td>
        )}
      </td>

      <td>{formatDateTimeFromString(data.updated)}</td>
      <td>
        {data.updatedBy
          ? data.expand.updatedBy?.first_name +
            " " +
            data.expand.updatedBy?.last_name
          : "N/A"}
      </td>
      <td>
        {data.support
          ? data.expand.support?.first_name +
            " " +
            data.expand.support?.last_name
          : "N/A"}
      </td>
    </tr>
  );
}

export default OtherOrdersView;
