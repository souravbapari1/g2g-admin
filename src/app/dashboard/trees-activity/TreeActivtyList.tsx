"use client";
import { useGlobalDataSetContext } from "@/components/context/globalDataSetContext";
import { ComboboxUser } from "@/components/ui/custom/comb-box-users";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ageOfDays } from "@/helper/dateTime";
import { Collection } from "@/interfaces/collection";
import { Tree } from "@/interfaces/treeOrders";
import { getTrees } from "@/request/worker/orders/treeorders/manageTree";
import { useEffect, useRef, useState } from "react";
import ViewReport from "./ViewReport";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

function TreeActivityList() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Collection<Tree>>();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // For search input
  const [selectedArea, setSelectedArea] = useState(""); // For area filter
  const [selectedTreeUnit, setSelectedTreeUnit] = useState(""); // For tree type filter
  const [selectedStatus, setSelectedStatus] = useState(""); // For status filter
  const [selectedMapper, setSelectedMapper] = useState(""); // For mapper filter
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [customer, setCustomer] = useState<string>();
  const [planted_by, setPlanted_by] = useState<string>();

  const [project, setProject] = useState("");
  const { areaTypeListGlobal, projectsListGlobal } = useGlobalDataSetContext();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const [showFilter, setShowFilter] = useState(false);

  const loadData = async (loadMore: boolean = false) => {
    setLoading(true);
    const filters = [];

    // Construct filters based on selected values
    if (searchTerm) {
      filters.push(
        `treeId~'${searchTerm}' || treeName~'${searchTerm}' || user.email~'${searchTerm}' || orderIdNo~'${searchTerm}'`
      );
    }
    if (selectedArea) {
      filters.push(`area.areaType~'${selectedArea}'`);
    }
    if (selectedTreeUnit) {
      filters.push(`unit='${selectedTreeUnit}'`);
    }
    if (selectedStatus) {
      filters.push(`status='${selectedStatus}'`);
    }
    // if (selectedMapper) {
    //   filters.push(`update_by='${selectedMapper}'`);
    // }
    if (selectedMapper) {
      filters.push(`maped_by='${selectedMapper}'`);
    }
    if (project) {
      filters.push(`project='${project}'`);
    }

    if (startDate) {
      filters.push(`plant_date>'${startDate}'`);
    }

    if (endDate) {
      filters.push(`plant_date<'${endDate}'`);
    }
    if (customer) {
      filters.push(`user='${customer}'`);
    }
    if (planted_by) {
      filters.push(`planted_by='${planted_by}'`);
    }
    // Join filters with AND operator
    const filterQuery = filters.length > 0 ? filters.join(" && ") : "";

    if (loadMore) {
      const orders = await getTrees(
        page + 1,
        filterQuery ? `(${filterQuery})` : ""
      );
      setData((prevData) => ({
        ...orders,
        items: [...(prevData?.items || []), ...orders?.items],
      }));
      setPage(page + 1);
    } else {
      const orders = await getTrees(
        page,
        filterQuery ? `(${filterQuery})` : ""
      );
      setData(orders);
    }
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData();
    }, 300);
    return () => clearTimeout(timer);
  }, [
    searchTerm,
    selectedArea,
    selectedTreeUnit,
    selectedStatus,
    selectedMapper,
    project,
    startDate,
    endDate,
    customer,
    planted_by,
  ]); // Reload data when filters change

  const { unitTypeListGlobal, employeeListGlobal } = useGlobalDataSetContext();

  const renderLoadMoreButton = () => {
    if (!loading && (data?.totalPages || 0) > page) {
      return (
        <Button variant="secondary" onClick={() => loadData(true)}>
          Load More
        </Button>
      );
    }
  };

  return (
    <div className="relative capitalize">
      <div className="flex relative justify-between gap-3 flex-wrap items-center mb-2  mt-4  p-4">
        <div className="flex w-full justify-between items-center gap-3 text-nowrap">
          <Input
            className="h-7 border-none bg-gray-100 py-0 rounded w-80"
            placeholder="Order Id, Name, Email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          />
          <div className="flex justify-center items-center   gap-3">
            <Badge
              className="text-xs rounded px-2 cursor-pointer"
              variant="secondary"
            >
              Total: {data?.totalItems || 0}
            </Badge>
            <Badge
              className="text-xs rounded px-2 cursor-pointer"
              onClick={() => {
                setSearchTerm("");
                setSelectedArea("");
                setSelectedTreeUnit("");
                setSelectedStatus("");
                setSelectedMapper("");
                setStartDate("");
                setEndDate("");
                setCustomer("");
                setProject("");
                setPlanted_by("");
                setShowFilter(!showFilter);
              }}
              variant={!showFilter ? "secondary" : "destructive"}
            >
              <Filter size={8} className="mr-2" />
              {showFilter ? "Hide Filter" : "Filter"}
            </Badge>
          </div>
        </div>
        {showFilter && (
          <div className="grid grid-cols-5 gap-3 bg-gray-400 p-4 rounded w-full ">
            <Select onValueChange={setSelectedArea}>
              <SelectTrigger className="w-full py-0 h-7 border-none bg-gray-100 rounded">
                <SelectValue placeholder="Area" />
              </SelectTrigger>
              <SelectContent>
                {areaTypeListGlobal.map((type) => (
                  <SelectItem key={type.id} value={type.name}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={setSelectedTreeUnit}>
              <SelectTrigger className="w-full py-0 h-7 border-none bg-gray-100 rounded">
                <SelectValue placeholder="Unit Type" />
              </SelectTrigger>
              <SelectContent>
                {unitTypeListGlobal?.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full py-0 h-7 border-none bg-gray-100 rounded capitalize">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "new planted",
                  "good",
                  "poor",
                  "dead",
                  "producing",
                  "not planted",
                  "pending",
                ].map((type) => (
                  <SelectItem className="capitalize" key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={setSelectedMapper}>
              <SelectTrigger className="w-full py-0 h-7 border-none bg-gray-100 rounded capitalize">
                <SelectValue placeholder="Mapper" />
              </SelectTrigger>
              <SelectContent>
                {employeeListGlobal?.map((employee) => (
                  <SelectItem
                    className="capitalize"
                    key={employee.id}
                    value={employee.id}
                  >
                    {employee.first_name + " " + employee.last_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ComboboxUser
              onSelect={(e) => setCustomer(e)}
              defaultValue={customer}
              className="w-full rounded bg-gray-100 border-none   h-7  "
              placeholder="Assigned By"
            />
            <ComboboxUser
              onSelect={(e) => setPlanted_by(e)}
              defaultValue={planted_by}
              className="w-full rounded bg-gray-100 border-none   h-7  "
              placeholder="Planted By"
            />
            <Select onValueChange={setProject}>
              <SelectTrigger className="w-full py-0 h-7 border-none bg-gray-100 rounded capitalize">
                <SelectValue placeholder="Project" />
              </SelectTrigger>
              <SelectContent>
                {projectsListGlobal?.map((pro) => (
                  <SelectItem
                    className="capitalize"
                    key={pro.id}
                    value={pro.id}
                  >
                    {pro.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex justify-between items-center rounded pl-3 gap-2 bg-gray-100 ">
              <p className="text-xs">From:</p>
              <Input
                type="date"
                className="h-7  border-none bg-gray-100 w-full block py-0 rounded"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center rounded pl-3 gap-2 bg-gray-100 ">
              <p className="text-xs">TO:</p>
              <Input
                type="date"
                className="h-7 border-none bg-gray-100 block w-full py-0 rounded"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
      <div className="tableWrapper w-full">
        <table className="tblView">
          <thead>
            <th>Tree Id</th>
            <th>Order Id</th>
            <th>Name</th>
            <th>Tree Type</th>
            <th>Project</th>
            <th>Actual Pricing/OMR</th>
            <th>Project Pricing/OMR</th>
            <th>Area Name/Area Type</th>
            <th>Planted By</th>
            <th>Status</th>
            <th>Planted Date</th>
            <th>Mapped By</th>
            <th className="text-center action">Action</th>
          </thead>

          <tbody>
            {data?.items.map((tree) => (
              <tr key={tree.treeId}>
                <td className="">{tree.treeId}</td>
                <td className="text-center">{tree.orderIdNo}</td>
                <td>
                  {tree.expand?.user?.first_name +
                    " " +
                    tree.expand?.user?.last_name}
                </td>

                <td>{tree?.expand?.unit?.name || "N/A"}</td>
                <td>{tree.expand?.project?.name || "N/A"}</td>
                <td className="text-center">
                  {tree.expand?.unit?.orm_unit || "N/A"} OMR
                </td>

                <td className="text-center">
                  {tree.expand?.project?.omr_unit || "N/A"} OMR
                </td>
                <td>
                  {tree?.area?.areaName
                    ? tree?.area?.areaName + " - " + tree?.area?.areaType
                    : "N/A"}
                </td>

                <td>
                  {tree.expand?.planted_by
                    ? tree.expand?.planted_by?.first_name +
                      " " +
                      tree.expand?.planted_by?.last_name
                    : "N/A"}
                </td>

                <td>{tree.status || "N/A"}</td>
                <td>
                  {tree?.plant_date ? ageOfDays(tree?.plant_date) : "N/A"}
                </td>
                <td>
                  {tree?.maped_by
                    ? tree.expand?.maped_by?.first_name +
                      " " +
                      tree.expand?.maped_by?.last_name
                    : "N/A"}
                </td>
                <td className="capitalize action text-center">
                  {
                    <ViewReport
                      tree={tree}
                      onUpdate={(e) => {
                        const index = data.items.findIndex(
                          (item) => item.treeId === e.treeId
                        );
                        if (index !== -1) {
                          data.items[index] = e;
                        }
                      }}
                    />
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          ref={observerRef}
          className="flex justify-center items-center  w-full h-24"
        >
          {loading && <LoadingSpinner />}
          {renderLoadMoreButton()}
        </div>
      </div>
    </div>
  );
}

export default TreeActivityList;
