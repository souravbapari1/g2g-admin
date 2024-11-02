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
import {
  getEmployeFilter,
  getTreeOrders,
} from "@/request/worker/orders/treeorders/manageTreeOrders";
import { useEffect, useState } from "react";
import TreeOrderViewList from "./TreeOrderViewList";
import { useSession } from "next-auth/react";
import { useGlobalDataSetContext } from "@/components/context/globalDataSetContext";

export function TreeOrdersTable() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Collection<TreeOrderItem>>();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndividualCompany, setSelectedIndividualCompany] =
    useState("");
  const [selectedProjectName, setSelectedProjectName] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedAssignedTo, setSelectedAssignedTo] = useState("");
  const session = useSession();
  const { employeeListGlobal, projectsListGlobal } = useGlobalDataSetContext();

  const getFilters = () => {
    let filters = [];

    if (searchTerm) {
      filters.push(
        `order_id~'${searchTerm}' || user.first_name~'${searchTerm}'`
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
    return filters.length > 0 ? `(${filters.join(" && ")})` : "";
  };

  const loadData = async (loadMore: boolean = false) => {
    setLoading(true);
    if (loadMore) {
      const orders = await getTreeOrders(page + 1, {
        filter: getEmployeFilter(getFilters()),
      });
      setData({
        ...orders,
        items: [...data!.items, ...orders?.items],
      });
      setPage(page + 1);
    } else {
      const orders = await getTreeOrders(page, {
        filter: getEmployeFilter(getFilters()),
      });
      setData(orders);
    }
    setLoading(false);
  };

  useEffect(() => {
    setPage(1);
    loadData();
  }, [
    session.data?.user.id,
    selectedIndividualCompany,
    selectedProjectName,
    selectedStatus,
    selectedAssignedTo,
  ]);

  return (
    <div className="">
      {session.data?.user.role === "ADMIN" && (
        <div className="flex justify-between items-center mb-3">
          <div className="">
            <Input
              className="h-7 py-0 rounded-none"
              placeholder="Order Id,Name,Email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  loadData();
                }
              }}
            />
          </div>
          <div className="flex justify-end items-center gap-3">
            <Select
              value={selectedIndividualCompany}
              onValueChange={setSelectedIndividualCompany}
            >
              <SelectTrigger className="w-[150px] py-0 h-7 rounded-none">
                <SelectValue placeholder="Individual/company" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="company">Company</SelectItem>
                <SelectItem value="ambassador">Ambassador</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={selectedProjectName}
              onValueChange={setSelectedProjectName}
            >
              <SelectTrigger className="w-[150px] py-0 h-7 rounded-none">
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

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[150px] py-0 h-7 rounded-none">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="received">Received</SelectItem>
                <SelectItem value="cancel">Cancel</SelectItem>
                <SelectItem value="complete">complete</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={selectedAssignedTo}
              onValueChange={setSelectedAssignedTo}
            >
              <SelectTrigger className="w-[150px] py-0 h-7 rounded-none">
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
          </div>
        </div>
      )}
      <Table className="overflow-auto border">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="border-r text-center">Order ID</TableHead>
            <TableHead className="border-r text-center">
              Customer Name
            </TableHead>

            <TableHead className="border-r text-center">Indv/Comp</TableHead>
            <TableHead className="border-r text-center">
              Date Of Project
            </TableHead>
            <TableHead className="border-r text-center">Project Name</TableHead>

            <TableHead className="border-r text-center">Trees</TableHead>
            <TableHead className="border-r text-center">Amount (OMR)</TableHead>
            <TableHead className="border-r text-center">Status</TableHead>
            {session.data?.user.role === "ADMIN" && (
              <TableHead className="border-r text-center">
                Assigned To
              </TableHead>
            )}
            <TableHead className="text-center">Mapping Status</TableHead>
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
