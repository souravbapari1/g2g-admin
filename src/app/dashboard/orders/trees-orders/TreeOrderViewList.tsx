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
import { assignTreeOrder } from "@/request/worker/orders/treeorders/manageTreeOrders";
import React, { useState } from "react";
import toast from "react-hot-toast";

function TreeOrderViewList({ order }: { order: TreeOrderItem }) {
  const [orderData, setOrderData] = useState(order);

  const { employeeListGlobal } = useGlobalDataSetContext();

  const onAssignUser = async (userId: string) => {
    try {
      toast.loading("Assigning Order...");
      const res = await assignTreeOrder(order.id, {
        asigned_to: userId,
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

  const assignedEmployee = employeeListGlobal.find(
    (user) => user.id === orderData.asigned_to
  );

  const placeholder = `${assignedEmployee?.first_name || ""} ${
    assignedEmployee?.last_name || ""
  }`;

  return (
    <TableRow>
      <TableCell>{orderData.order_id}</TableCell>
      <TableCell>
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

      <TableCell>{orderData.expand.user.user_type}</TableCell>
      <TableCell>{formatTimestampCustom(orderData.created)}</TableCell>
      <TableCell>{orderData.expand.project.name}</TableCell>

      <TableCell>{orderData.tree_count}</TableCell>
      <TableCell>{orderData.amount} OMR</TableCell>
      <TableCell className="capitalize">{orderData.status}</TableCell>
      <TableCell className="text-center">
        <Select
          defaultValue={orderData.asigned_to}
          onValueChange={(id) => {
            onAssignUser(id);
          }}
        >
          <SelectTrigger className="w-[100px] mx-auto h-6 px-1 text-xs  ">
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
      <TableCell className="capitalize">{orderData.maping_status}</TableCell>
    </TableRow>
  );
}

export default TreeOrderViewList;
