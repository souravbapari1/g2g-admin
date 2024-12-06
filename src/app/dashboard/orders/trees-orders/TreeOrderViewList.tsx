import { useGlobalDataSetContext } from "@/components/context/globalDataSetContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  formatDateTimeFromString,
  formatTimestampCustom,
} from "@/helper/dateTime";
import { TreeOrderItem } from "@/interfaces/treeOrders";
import { extractErrors } from "@/request/actions";
import {
  assignTreeOrder,
  setMappingTreeStatus,
} from "@/request/worker/orders/treeorders/manageTreeOrders";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

function TreeOrderViewList({ order }: { order: TreeOrderItem }) {
  const { data } = useSession();
  const [orderData, setOrderData] = useState(order);
  const session = useSession();

  const { employeeListGlobal, projectsListGlobal, projectTypeListGlobal } =
    useGlobalDataSetContext();

  const onAssignUser = async (userId: string) => {
    try {
      toast.loading("Assigning Order...");
      const res = await assignTreeOrder(order.id, {
        asigned_to: userId,
        status: "processing",
        updatedBy: session.data?.user.id,
      });
      setOrderData(res);
      toast.dismiss();
      toast.success("Order assigned successfully");
    } catch (error: any) {
      toast.dismiss();
      const errors = extractErrors(error?.response);
      toast.error(errors[0]);
      console.log(error);
    }
  };

  const onUpdateMappingStatus = async (status: string) => {
    try {
      toast.loading("Update Mapping...");
      const res = await setMappingTreeStatus(order.id, {
        maping_status: status,
        updatedBy: session.data?.user.id,
      });
      setOrderData(res);
      toast.dismiss();
      toast.success("Mapping updated successfully");
    } catch (error: any) {
      toast.dismiss();
      const errors = extractErrors(error?.response);
      toast.error(errors[0]);
      console.log(error);
    }
  };

  const assignedEmployee = employeeListGlobal.find(
    (user) => user.id === orderData.asigned_to
  );

  const placeholder = `${assignedEmployee?.first_name || ""} ${
    assignedEmployee?.last_name || ""
  }`;

  const project = projectsListGlobal.find(
    (project) => project.id === orderData.project
  );

  return (
    <tr>
      <td>{orderData.order_id}</td>
      <td>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {orderData.expand.user.first_name +
                " " +
                orderData.expand.user.last_name}
            </TooltipTrigger>
            <TooltipContent>
              <p>Email: {orderData.expand.user.email}</p>
              <p>Mobile: {orderData.expand.user.mobile_no}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </td>
      <td>{orderData.expand.user.email}</td>
      <td>{orderData.expand.user.mobile_no}</td>

      <td className="capitalize">{orderData.expand.user.user_type}</td>

      <td>{formatDateTimeFromString(orderData.created)}</td>
      <td>{project?.name}</td>
      <td>
        {projectTypeListGlobal.find((unit) => unit.id === project?.type)?.name}
      </td>
      <td>{formatDateTimeFromString(orderData.updated)}</td>
      <td>
        {orderData.updatedBy
          ? orderData.expand.updatedBy?.first_name +
            " " +
            orderData.expand.updatedBy?.last_name
          : "N/A"}
      </td>
      <td>{orderData.tree_count}</td>
      <td>
        {project?.omr_unit} OMR/{project?.unit_measurement}
      </td>
      <td>{orderData.amount} OMR</td>
      <td>
        {orderData.support
          ? orderData.expand.support?.first_name +
            " " +
            orderData.expand.support?.last_name
          : "N/A"}
      </td>

      <td className="capitalize">{orderData.status}</td>
      {data?.user.role === "ADMIN" && (
        <td>
          <Select
            defaultValue={orderData.asigned_to}
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
      <td className="capitalize text-center">
        {data?.user.role === "ADMIN" ? (
          orderData.maping_status
        ) : (
          <Select
            defaultValue={orderData.maping_status}
            onValueChange={(status) => {
              onUpdateMappingStatus(status);
            }}
          >
            <SelectTrigger className="w-[130px] mx-auto h-6 px-1 text-xs rounded-none capitalize pl-2 pr-0  ">
              <SelectValue placeholder={orderData.maping_status} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">pending</SelectItem>
              <SelectItem value="complete">complete</SelectItem>
              <SelectItem value="active">active</SelectItem>
              <SelectItem value="cancel">cancel</SelectItem>
            </SelectContent>
          </Select>
        )}
      </td>
    </tr>
  );
}

export default TreeOrderViewList;
