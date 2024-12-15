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
import { Input } from "@/components/ui/input";
import { CountryDropdown } from "@/components/ui/custom/country-dropdown";
import { CityDropdown } from "@/components/ui/custom/city-dropdown";
import { useGlobalDataSetContext } from "@/components/context/globalDataSetContext";
import { selectIndustryItems } from "../(account)/user/[id]/components/profile/CompanyProfile";
import { UserItem } from "@/interfaces/user";

function PartnersListTabs() {
  const [activeState, setActiveState] = useState("all");
  const data = useQuery("partners", {
    queryFn: getAllPartners,
  });

  const [filtes, setFilter] = useState({
    search: "",
    industry: "",
    companySize: "",
    country: "",
    city: "",
    approvedRejectBy: "",
  });

  const applyFilter = (data: UserItem[] | undefined) => {
    console.log(data);

    if (data) {
      return data.filter((item) => {
        return (
          item.expand?.company?.company_name
            .toLowerCase()
            .includes(filtes.search.toLowerCase()) ||
          item.mobile_no.toLowerCase().includes(filtes.search.toLowerCase()) ||
          item.email.toLowerCase().includes(filtes.search.toLowerCase()) ||
          item.id.toLowerCase().includes(filtes.search.toLowerCase()) ||
          item.expand?.company?.id
            .toLowerCase()
            .includes(filtes.search.toLowerCase())
        );
      });
    }
  };

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
      pending: pending,
      approved: approved,
      rejected: rejected,
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
  const {} = useGlobalDataSetContext();
  return (
    <div className="">
      <div className="w-full flex justify-between items-center">
        <Input
          className="rounded-none border-none"
          placeholder="Search..."
          value={filtes.search}
          onChange={(e) => setFilter({ ...filtes, search: e.target.value })}
        />
        <Select
          value={filtes.industry}
          onValueChange={(e) => {
            setFilter({ ...filtes, industry: e });
          }}
        >
          <SelectTrigger className="w-[160px] rounded-none border-none">
            <SelectValue placeholder="Industry Type" />
          </SelectTrigger>
          <SelectContent>
            {selectIndustryItems.map((item, i) => (
              <SelectItem
                key={item.value + "-industry-" + i}
                value={item.value}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filtes.companySize}
          onValueChange={(e) => {
            setFilter({ ...filtes, companySize: e });
          }}
        >
          <SelectTrigger className="w-[160px] rounded-none border-none">
            <SelectValue placeholder="Company Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Start up Company">Start up Company</SelectItem>
            <SelectItem value="Small Facility (1-49 Employees)">
              Small Facility (1-49 Employees)
            </SelectItem>
            <SelectItem value="Medium Facility (50-249 Employees)">
              Medium Facility (50-249 Employees)
            </SelectItem>
            <SelectItem value="Large Facility (250 Employees and More)">
              Large Facility (250 Employees and More)
            </SelectItem>
          </SelectContent>
        </Select>
        <CountryDropdown
          className="w-[160px] rounded-none border-none"
          onChange={(e) => {
            setFilter({ ...filtes, country: e });
          }}
          value={filtes.country}
        />
        <CityDropdown
          className="w-[160px] rounded-none border-none"
          onChange={(e) => {
            setFilter({ ...filtes, city: e });
          }}
          value={filtes.city}
        />
        <Select
          value={filtes.approvedRejectBy}
          onValueChange={(e) => {
            setFilter({ ...filtes, approvedRejectBy: e });
          }}
        >
          <SelectTrigger className="w-[160px] rounded-none border-none">
            <SelectValue placeholder="Approved/Reject By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
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
          </Select>
        </div>
      </div>
      {
        [
          <PartnersView
            partners={applyFilter(pending)}
            onUpdate={data.refetch}
            status="Pending"
          />,
          <PartnersView
            partners={applyFilter(rejected)}
            onUpdate={data.refetch}
            status="Rejected"
          />,
          <PartnersView
            partners={applyFilter(approved)}
            onUpdate={data.refetch}
            status="Approved"
          />,
        ][tabIndex]
      }
    </div>
  );
}

export default PartnersListTabs;
