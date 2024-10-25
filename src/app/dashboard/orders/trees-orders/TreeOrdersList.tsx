"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Collection } from "@/interfaces/collection";
import { TreeOrderItem } from "@/interfaces/treeOrders";
import { getTreeOrders } from "@/request/worker/orders/treeorders/manageTreeOrders";
import { useEffect, useState } from "react";
import TreeOrderViewList from "./TreeOrderViewList";

export function TreeOrdersTable() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Collection<TreeOrderItem>>();
  const [page, setPage] = useState(1);

  const loadData = async (loadMore: boolean = false) => {
    setLoading(true);
    if (loadMore) {
      const orders = await getTreeOrders(page + 1, {});
      setData({
        ...orders,
        items: [...data!.items, ...orders?.items],
      });
      setPage(page + 1);
    } else {
      const orders = await getTreeOrders(page, {});
      setData(orders);
    }
    setLoading(false);
  };

  useEffect(() => {
    setPage(1);
    loadData();
  }, []);

  return (
    <div className="">
      <div className="flex justify-between items-center mb-3">
        <div className="">
          <Input
            className="h-7 py-0 rounded-none"
            placeholder="Order Id,Name,Email"
          />
        </div>
        <div className="flex justify-end items-center gap-3">
          <Select>
            <SelectTrigger className="w-[150px] py-0 h-7 rounded-none">
              <SelectValue placeholder="Individual/company" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Individual</SelectItem>
              <SelectItem value="dark">Company</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[150px] py-0 h-7 rounded-none">
              <SelectValue placeholder="Project Name" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Name 1</SelectItem>
              <SelectItem value="dark">Name 2</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[150px] py-0 h-7 rounded-none">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Active</SelectItem>
              <SelectItem value="dark">Pending</SelectItem>
              <SelectItem value="dark">Cancel</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[150px] py-0 h-7 rounded-none">
              <SelectValue placeholder="Assigned To" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">User 1</SelectItem>
              <SelectItem value="dark">User 2</SelectItem>
              <SelectItem value="dark">User 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table className="overflow-auto">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead>Order ID</TableHead>
            <TableHead>Customer Name</TableHead>

            <TableHead>Indv/Comp</TableHead>
            <TableHead>Date Of Project</TableHead>
            <TableHead>Project Name</TableHead>

            <TableHead>Trees</TableHead>
            <TableHead>Amount (OMR)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Assigned To</TableHead>
            <TableHead>Mapping Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.items.map((order) => (
            <TreeOrderViewList key={order.id} order={order} />
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center items-center mt-10">
        {loading && <LoadingSpinner />}
        {loading === false && data && data?.totalPages > data?.page && (
          <Button variant="secondary" onClick={() => loadData(true)}>
            Load More
          </Button>
        )}
      </div>
    </div>
  );
}
