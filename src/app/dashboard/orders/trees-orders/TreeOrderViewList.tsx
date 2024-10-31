import { useGlobalDataSetContext } from "@/components/context/globalDataSetContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatTimestampCustom } from "@/helper/dateTime";
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

  const { employeeListGlobal } = useGlobalDataSetContext();

  const onAssignUser = async (userId: string) => {
    try {
      toast.loading("Assigning Order...");
      const res = await assignTreeOrder(order.id, {
        asigned_to: userId,
        status: "processing",
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

  return (
    <TableRow>
      <TableCell className="text-center border-r">
        {orderData.order_id}
      </TableCell>
      <TableCell className="text-center border-r">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {orderData.expand.user.first_name +
                " " +
                orderData.expand.user.last_name}
            </TooltipTrigger>
            <TooltipContent>
              <p>{orderData.expand.user.email}</p>
              <p>{orderData.expand.user.mobile_no}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>

      <TableCell className="text-center border-r">
        {orderData.expand.user.user_type}
      </TableCell>
      <TableCell className="text-center border-r">
        {formatTimestampCustom(orderData.created)}
      </TableCell>
      <TableCell className="text-center border-r">
        {orderData.expand?.project?.name}
      </TableCell>

      <TableCell className="text-center border-r">
        {orderData.tree_count}
      </TableCell>
      <TableCell className="text-center border-r">
        {orderData.amount} OMR
      </TableCell>
      <TableCell className="capitalize border-r text-center ">
        {orderData.status}
      </TableCell>
      {data?.user.role === "ADMIN" && (
        <TableCell className="text-center border-r">
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
        </TableCell>
      )}
      <TableCell className="capitalize text-center">
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
      </TableCell>
    </TableRow>
  );
}

export default TreeOrderViewList;
