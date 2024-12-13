"use client";
import { cn } from "@/lib/utils";
import { getAllPartners } from "@/request/worker/partnors/managePartners";
import React, { useState } from "react";
import { useQuery } from "react-query";
import PartnersView from "./tabs/PartnersView";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function PartnersListTabs() {
  const [activeState, setActiveState] = useState("all");
  const data = useQuery("partners", {
    queryFn: getAllPartners,
  });

  const filterByStatus = () => {
    const pending = data.data?.filter(
      (item) => item.expand?.company?.approved_status == "pending"
    );
    const approved = data.data?.filter(
      (item) => item.expand?.company?.approved_status == "approved"
    );
    const rejected = data.data?.filter(
      (item) => item.expand?.company?.approved_status == "rejected"
    );

    if (activeState == "all") {
      return {
        pending,
        approved,
        rejected,
      };
    }

    if (activeState == "active") {
      return {
        pending: data.data?.filter(
          (item) =>
            item.expand?.company?.approved_status == "pending" &&
            item.isBlocked == false
        ),
        approved: data.data?.filter(
          (item) =>
            item.expand?.company?.approved_status == "approved" &&
            item.isBlocked == false
        ),
        rejected: data.data?.filter(
          (item) =>
            item.expand?.company?.approved_status == "rejected" &&
            item.isBlocked == false
        ),
      };
    }

    if (activeState == "inactive") {
      return {
        pending: data.data?.filter(
          (item) =>
            item.expand?.company?.approved_status == "pending" &&
            item.isBlocked == true
        ),
        approved: data.data?.filter(
          (item) =>
            item.expand?.company?.approved_status == "approved" &&
            item.isBlocked == true
        ),
        rejected: data.data?.filter(
          (item) =>
            item.expand?.company?.approved_status == "rejected" &&
            item.isBlocked == true
        ),
      };
    }

    return {
      pending,
      approved,
      rejected,
    };
  };

  const { pending, approved, rejected } = filterByStatus();

  const [tabIndex, setTabIndex] = useState(1);
  const activeClass = (active: boolean) => {
    if (!active) {
      return `border-white`;
    }
    return `border-green-600 text-green-600`;
  };
  return (
    <div className="">
      <div className="w-full mt-1 border-b flex justify-between   select-none">
        <div className="flex w-full">
          <div
            onClick={() => setTabIndex(0)}
            className={cn(
              "border-b-2 cursor-pointer max-w-36 w-full text-center py-2",
              activeClass(tabIndex === 0)
            )}
          >
            <p className="font-bold ">
              Pending <span className="test-xs">({pending?.length || 0})</span>
            </p>
          </div>
          <div
            onClick={() => setTabIndex(1)}
            className={cn(
              "border-b-2 cursor-pointer max-w-36 w-full text-center py-2",
              activeClass(tabIndex === 1)
            )}
          >
            <p className="font-bold ">
              Rejected{" "}
              <span className="test-xs">({rejected?.length || 0})</span>
            </p>
          </div>
          <div
            onClick={() => setTabIndex(2)}
            className={cn(
              "border-b-2 cursor-pointer max-w-36 w-full text-center py-2",
              activeClass(tabIndex === 2)
            )}
          >
            <p className="font-bold ">
              Approved{" "}
              <span className="test-xs">({approved?.length || 0})</span>
            </p>
          </div>
        </div>
        <div className="">
          <Select
            defaultValue={activeState}
            value={activeState}
            onValueChange={setActiveState}
          >
            <SelectTrigger className="w-[150px] border-none font-bold">
              <SelectValue placeholder="Account State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Partners</SelectItem>
              <SelectItem value="active">Active Partners</SelectItem>
              <SelectItem value="inactive">InActive Partners</SelectItem>
            </SelectContent>{" "}
            s
          </Select>
        </div>
      </div>
      {
        [
          <PartnersView
            partners={pending}
            onUpdate={data.refetch}
            status="Pending"
          />,
          <PartnersView
            partners={rejected}
            onUpdate={data.refetch}
            status="Rejected"
          />,
          <PartnersView
            partners={approved}
            onUpdate={data.refetch}
            status="Approved"
          />,
        ][tabIndex]
      }
    </div>
  );
}

export default PartnersListTabs;
