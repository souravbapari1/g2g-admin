"use client";
import { useGlobalDataSetContext } from "@/components/context/globalDataSetContext";
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ageOfDays } from "@/helper/dateTime";
import { landTypes } from "@/helper/plantIcon";
import { Collection } from "@/interfaces/collection";
import { Tree } from "@/interfaces/treeOrders";
import { getTrees } from "@/request/worker/orders/treeorders/manageTree";
import { Eye } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ViewReport from "./ViewReport";

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

  const [project, setProject] = useState("");
  const { areaTypeListGlobal, projectsListGlobal } = useGlobalDataSetContext();
  const observerRef = useRef<HTMLDivElement | null>(null);

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
    if (selectedMapper) {
      filters.push(`update_by='${selectedMapper}'`);
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
    loadData();
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
  ]); // Reload data when filters change

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && data!.totalPages > page) {
          loadData(true);
        }
      },
      { threshold: 1.0 }
    );
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [loading, page, data]);

  const { unitTypeListGlobal, employeeListGlobal, usersListGlobal } =
    useGlobalDataSetContext();

  return (
    <div className="relative">
      <div className="flex relative justify-between items-center">
        <div className="flex justify-start items-center gap-3 text-nowrap">
          <Input
            className="h-7 py-0 rounded-none"
            placeholder="Order Id, Name, Email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          />
          <p>Total: {data?.totalItems}</p>
        </div>
        <div className="flex justify-end items-center ">
          <Select onValueChange={setSelectedArea}>
            <SelectTrigger className="w-[150px] py-0 h-7 rounded-none">
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
            <SelectTrigger className="w-[150px] py-0 h-7 rounded-none">
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
            <SelectTrigger className="w-[150px] py-0 h-7 rounded-none capitalize">
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
            <SelectTrigger className="w-[150px] py-0 h-7 rounded-none capitalize">
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

          <Select onValueChange={setCustomer}>
            <SelectTrigger className="w-[150px] py-0 h-7 rounded-none capitalize">
              <SelectValue placeholder="Customer" />
            </SelectTrigger>
            <SelectContent>
              {usersListGlobal?.map((employee) => (
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

          <Select onValueChange={setProject}>
            <SelectTrigger className="w-[150px] py-0 h-7 rounded-none capitalize">
              <SelectValue placeholder="Project" />
            </SelectTrigger>
            <SelectContent>
              {projectsListGlobal?.map((pro) => (
                <SelectItem className="capitalize" key={pro.id} value={pro.id}>
                  {pro.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex justify-end items-center  gap-2 ">
            <Input
              type="date"
              className="h-7 w-36 py-0 rounded-none"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <p className="text-sm">TO</p>
            <Input
              type="date"
              className="h-7 w-36 py-0 rounded-none"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>
      <Table className="overflow-auto relative border border-t-0 text-xs">
        <TableHeader className="sticky top-0 p-0 ">
          <TableRow className=" p-0 bg-gray-100 border-white">
            <TableHead className="border-r p-0 h-8 text-center">
              Tree Id
            </TableHead>
            <TableHead className="border-r p-0 h-8 text-center">
              Order Id
            </TableHead>
            <TableHead className="border-r p-0 h-8 text-center">Name</TableHead>
            <TableHead className="border-r p-0 h-8 text-center">
              Tree Type
            </TableHead>
            <TableHead className="border-r p-0 h-8 text-center">
              Project
            </TableHead>
            <TableHead className="border-r p-0 h-8 text-center">
              Pricing/OMR
            </TableHead>
            <TableHead className="border-r p-0 h-8 text-center">
              Area Name/Area Type
            </TableHead>
            <TableHead className="border-r p-0 h-8 text-center">
              Status
            </TableHead>
            <TableHead className="border-r p-0 h-8 text-center">
              Planted Date
            </TableHead>
            <TableHead className="border-r p-0 h-8 text-center">
              Mapped By
            </TableHead>
            <TableHead className="text-center h-8 p-0">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.items.map((tree) => (
            <TableRow key={tree.treeId}>
              <TableCell className="border-r p-0 text-center py-2">
                {tree.treeId}
              </TableCell>
              <TableCell className="border-r p-0 text-center py-2">
                {tree.orderIdNo}
              </TableCell>
              <TableCell className="border-r p-0 text-center py-2 capitalize">
                {tree.expand?.user?.first_name +
                  " " +
                  tree.expand?.user?.last_name}
              </TableCell>

              <TableCell className="capitalize border-r p-0 text-center py-2">
                {tree?.expand?.unit?.name || "N/A"}
              </TableCell>
              <TableCell className="capitalize border-r p-0 text-center py-2">
                {tree.expand?.project?.name || "N/A"}
              </TableCell>
              <TableCell className="capitalize border-r p-0 text-center py-2">
                Actual: {tree.expand?.unit?.orm_unit || "N/A"} & Project:{" "}
                {tree.expand?.project?.omr_unit || "N/A"}
              </TableCell>
              <TableCell className="capitalize border-r p-0 text-center py-2">
                {tree?.area?.areaName
                  ? tree?.area?.areaName + " - " + tree?.area?.areaType
                  : "N/A"}
              </TableCell>

              <TableCell className="capitalize border-r p-0 text-center py-2">
                {tree.status || "N/A"}
              </TableCell>
              <TableCell className="border-r p-0 text-center py-2">
                {tree?.plant_date ? ageOfDays(tree?.plant_date) : "N/A"}
              </TableCell>
              <TableCell className="capitalize border-r p-0 text-center py-2 ">
                {tree?.update_by
                  ? tree.expand?.update_by?.first_name +
                    " " +
                    tree.expand?.update_by?.last_name
                  : "N/A"}
              </TableCell>
              <TableCell className="capitalize border-r p-0 text-center py-2 text-center">
                {<ViewReport tree={tree} />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div ref={observerRef} className="flex justify-center items-center mt-10">
        {loading && <LoadingSpinner />}
      </div>
    </div>
  );
}

export default TreeActivityList;
