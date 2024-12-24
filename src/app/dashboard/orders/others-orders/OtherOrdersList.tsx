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
import { getEmployeFilter } from "@/request/worker/orders/treeorders/manageTreeOrders";
import { ComboboxUser } from "@/components/ui/custom/comb-box-users";
import { useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";

function OtherOrdersList() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Collection<OthersOrdersItem>>();
  const session = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndividualCompany, setSelectedIndividualCompany] =
    useState("");
  const [selectedProjectName, setSelectedProjectName] = useState("");
  const [projectType, setProjectType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedAssignedTo, setSelectedAssignedTo] = useState("");
  const [support, setSupport] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showFilter, setSetShowFilter] = useState(false);
  const { employeeListGlobal, projectsListGlobal, projectTypeListGlobal } =
    useGlobalDataSetContext();

  const getOrders = async (loadMore: boolean) => {
    try {
      setLoading(true);
      if (loadMore) {
        const data = await getOthersOrdersList(
          page,
          getEmployeFilter(getFilters())
        );
        const updatedData = {
          ...data,
          items: [...(orders?.items || []), ...data?.items],
        };
        setOrders(updatedData);
      } else {
        const data = await getOthersOrdersList(
          page,
          getEmployeFilter(getFilters())
        );
        setOrders(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getFilters = () => {
    let filters = [];

    if (searchTerm) {
      filters.push(
        `order_id~'${searchTerm}' || user.first_name~'${searchTerm}' || user.last_name~'${searchTerm}' || user.email~'${searchTerm}' || user.mobile_no~'${searchTerm}'`
      );
    }
    if (selectedIndividualCompany) {
      filters.push(`user.user_type='${selectedIndividualCompany}'`);
    }
    if (selectedProjectName) {
      filters.push(`project='${selectedProjectName}'`);
    }
    if (selectedStatus) {
      filters.push(`status='${selectedStatus}'`);
    }
    if (selectedAssignedTo) {
      filters.push(`asigned_to='${selectedAssignedTo}'`);
    }
    if (projectType) {
      filters.push(`project.type='${projectType}'`);
    }
    if (support) {
      filters.push(`support='${support}'`);
    }
    // Handle date filters for specific day or range
    if (fromDate && toDate) {
      if (fromDate === toDate) {
        // For the same day, filter from 00:00:00 to 23:59:59
        filters.push(
          `created>='${fromDate} 00:00:00' && created<='${toDate} 23:59:59'`
        );
      } else {
        // For a date range
        filters.push(`created>='${fromDate}' && created<='${toDate}'`);
      }
    } else if (fromDate) {
      // Only start date specified
      filters.push(`created>='${fromDate}'`);
    } else if (toDate) {
      // Only end date specified
      filters.push(`created<='${toDate}'`);
    }
    console.log(filters);

    return filters.length > 0 ? `(${filters.join(" && ")})` : "";
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getOrders(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [page]);

  useEffect(() => {
    getOrders(false);
  }, [
    searchTerm,
    selectedIndividualCompany,
    selectedProjectName,
    selectedStatus,
    selectedAssignedTo,
    projectType,
    support,
    fromDate,
    toDate,
  ]);

  return (
    <div>
      <div className="flex w-full justify-start items-start p-5 flex-col">
        <div className="flex justify-between items-center w-full gap-3 text-nowrap">
          <Input
            className="h-8 py-0 w-80 border-none bg-gray-100 rounded"
            placeholder="Order Id,Name,Email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                setPage(1);
                getOrders(true);
              }
            }}
          />
          <div className="flex justify-end items-center gap-4">
            <Badge
              className="text-xs font-medium rounded px-2 cursor-pointer"
              variant="secondary"
            >
              Total: {orders?.totalItems || 0}
            </Badge>
            <Badge
              className="text-xs rounded px-2 cursor-pointer"
              variant={!showFilter ? "secondary" : "destructive"}
              onClick={() => {
                setSearchTerm("");
                setSelectedIndividualCompany("");
                setSelectedProjectName("");
                setSelectedStatus("");
                setSelectedAssignedTo("");
                setProjectType("");
                setSupport("");
                setFromDate("");
                setToDate("");
                setSetShowFilter(!showFilter);
              }}
            >
              <Filter size={8} className="mr-2" />
              {showFilter ? "Hide Filter" : "Filter"}
            </Badge>
          </div>
        </div>
        {showFilter && (
          <div className="grid grid-cols-4 w-full mt-4 items-center gap-4 bg-gray-400 p-5 rounded-md">
            <Select
              value={selectedIndividualCompany}
              onValueChange={setSelectedIndividualCompany}
            >
              <SelectTrigger className="w-full py-0 h-8  border-none bg-gray-100 rounded">
                <SelectValue placeholder="Individual/company" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="partner">Partner</SelectItem>
                <SelectItem value="ambassador">Ambassador</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={selectedProjectName}
              onValueChange={setSelectedProjectName}
            >
              <SelectTrigger className="w-full py-0 h-8  border-none bg-gray-100 rounded">
                <SelectValue placeholder="Project Name" />
              </SelectTrigger>
              <SelectContent>
                {projectsListGlobal?.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={projectType} onValueChange={setProjectType}>
              <SelectTrigger className="w-full py-0 h-8  border-none bg-gray-100 rounded">
                <SelectValue placeholder="Project Type" />
              </SelectTrigger>
              <SelectContent>
                {projectTypeListGlobal?.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full py-0 h-8  border-none bg-gray-100 rounded">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="received">Received</SelectItem>
                <SelectItem value="cancel">Cancel</SelectItem>
                <SelectItem value="complete">Complete</SelectItem>
              </SelectContent>
            </Select>
            <ComboboxUser
              onSelect={(e) => setSupport(e)}
              defaultValue={support}
              className="w-full  border-none bg-gray-100 rounded  h-8  "
              placeholder="Support By"
            />
            <Select
              value={selectedAssignedTo}
              onValueChange={setSelectedAssignedTo}
            >
              <SelectTrigger className="w-full py-0 h-8  border-none bg-gray-100 rounded">
                <SelectValue placeholder="Assigned To" />
              </SelectTrigger>
              <SelectContent>
                {employeeListGlobal?.map((emp) => (
                  <SelectItem key={emp.id} value={emp.id}>
                    {emp.first_name + " " + emp.last_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex justify-center items-center bg-gray-100 rounded pl-2">
              <p className="text-sm">From:</p>
              <Input
                className="h-8 block  py-0  border-none w-full bg-gray-100 rounded"
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="flex justify-center items-center bg-gray-100 rounded pl-2">
              <p className="text-sm">To:</p>
              <Input
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="h-8 block w-full py-0  border-none bg-gray-100 rounded"
                type="date"
              />
            </div>
          </div>
        )}
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
              <th>Measurement</th>
              <th>Unit Amount</th>
              <th>Total Amount (OMR)</th>
              <th>Status</th>
              {session?.data?.user.role === "ADMIN" && <th>Assigind to</th>}
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
