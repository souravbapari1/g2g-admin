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
import { Table, TableBody, TableRow } from "@/components/ui/table";
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
  const [projectType, setProjectType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedAssignedTo, setSelectedAssignedTo] = useState("");
  const session = useSession();
  const { employeeListGlobal, projectsListGlobal, projectTypeListGlobal } =
    useGlobalDataSetContext();

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
    const timer = setTimeout(() => {
      setPage(1);
      loadData();
    }, 300);

    return () => clearTimeout(timer);
  }, [
    session.data?.user.id,
    selectedIndividualCompany,
    selectedProjectName,
    selectedStatus,
    selectedAssignedTo,
    projectType,
  ]);

  return (
    <div className="">
      {session.data?.user.role === "ADMIN" && (
        <div className="flex justify-between items-center bg-gray-100 ">
          <div className="">
            <Input
              className="h-8 py-0 rounded-none border-none bg-gray-100"
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
          <div className="flex justify-end items-center ">
            <Select
              value={selectedIndividualCompany}
              onValueChange={setSelectedIndividualCompany}
            >
              <SelectTrigger className="w-[150px] py-0 h-8 rounded-none border-none bg-gray-100">
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
              <SelectTrigger className="w-[150px] py-0 h-8 rounded-none border-none bg-gray-100">
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
              <SelectTrigger className="w-[150px] py-0 h-8 rounded-none border-none bg-gray-100">
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
              <SelectTrigger className="w-[150px] py-0 h-8 rounded-none border-none bg-gray-100">
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

            <Select value={projectType} onValueChange={setProjectType}>
              <SelectTrigger className="w-[150px] py-0 h-8 rounded-none border-none bg-gray-100">
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
      <div className="tableWrapper">
        <table className="tblView">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Email ID</th>
              <th>Phone No</th>
              <th>Indv/Comp</th>
              <th>Date Of Project</th>
              <th>Project Name</th>
              <th>Project Type</th>
              <th>Last Update</th>
              <th>Updated By</th>
              <th>Trees</th>
              <th>Unit Amount</th>
              <th>Amount (OMR)</th>
              <th>Support</th>
              <th>Status</th>
              {session.data?.user.role === "ADMIN" && <th>Assigned To</th>}
              <th className="text-center">Mapping Status</th>
            </tr>
          </thead>
          <TableBody>
            {data?.items.map((order) => (
              <TreeOrderViewList key={order.id} order={order} />
            ))}
          </TableBody>
        </table>
      </div>

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
