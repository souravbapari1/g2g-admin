"use client";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Collection } from "@/interfaces/collection";
import { OthersOrdersItem } from "@/interfaces/othersProjects";
import { getOthersOrdersList } from "@/request/worker/orders/othersorders/manageOthersOrders";
import React, { useEffect, useState } from "react";
import OtherOrdersView from "./OtherOrdersView";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGlobalDataSetContext } from "@/components/context/globalDataSetContext";

function OtherOrdersList() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Collection<OthersOrdersItem>>();
  const { employeeListGlobal, projectsListGlobal, projectTypeListGlobal } =
    useGlobalDataSetContext();

  const getOrders = async (loadMore: boolean) => {
    try {
      setLoading(true);
      if (loadMore) {
        const data = await getOthersOrdersList(page);
        const updatedData = {
          ...data,
          items: [...(orders?.items || []), ...data?.items],
        };
        setOrders(updatedData);
      } else {
        const data = await getOthersOrdersList(page);
        setOrders(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders(true);
  }, [page]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <Input placeholder="Search..." className="rounded-none h-8 w-72" />
        <div className="flex justify-end items-center">
          <Select>
            <SelectTrigger className="w-[140px] h-8 rounded-none">
              <SelectValue placeholder="Project" />
            </SelectTrigger>
            <SelectContent>
              {projectsListGlobal.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[140px] h-8 rounded-none">
              <SelectValue placeholder="Project Type" />
            </SelectTrigger>
            <SelectContent>
              {projectTypeListGlobal.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[140px] h-8 rounded-none">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="tableWrapper">
        <table className="tblView">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Email ID</th>
              <th>Phone Number</th>
              <th>Indv/Company</th>
              <th>Order Date</th>
              <th>Project Name</th>
              <th>Project Type</th>
              <th>Unit Amount</th>
              <th>Total Amount (OMR)</th>
              <th>Status</th>
              <th>Assigind to</th>
              <th>Last Update</th>
              <th>Updated By</th>
              <th>Support For</th>
            </tr>
          </thead>
          <tbody>
            {orders?.items.map((item) => (
              <OtherOrdersView key={item.id} order={item} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center my-10">
        {loading && <LoadingSpinner />}
      </div>
    </div>
  );
}

export default OtherOrdersList;
