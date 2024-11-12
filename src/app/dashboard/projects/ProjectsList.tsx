"use client";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Collection } from "@/interfaces/collection";
import { ProjectType } from "@/interfaces/projectType";
import { getProjectType } from "@/request/worker/catalogs/projectType";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useTriggerContext } from "@/components/context/triggerContecxt";
import { ProjectItem } from "@/interfaces/project";
import {
  getProject,
  getProjects,
} from "@/request/worker/project/manageProject";
import { Badge } from "@/components/ui/badge";
import { Edit, Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import ProjectViewItem from "./ProjectViewItem";
import { Input } from "@/components/ui/input";
import { useGlobalDataSetContext } from "@/components/context/globalDataSetContext";
import { FaFileExcel } from "react-icons/fa";
import StatisticsView from "./StaisticsView";
import ExportDataView from "@/components/export";

export function ProjectsList() {
  const {
    projectTypeListGlobal,
    unitTypeListGlobal,
    employeeListGlobal,
    usersListGlobal,
  } = useGlobalDataSetContext();
  const [loading, setLoading] = useState(true);
  const [projectsData, setProjectsData] =
    useState<Collection<ProjectItem> | null>(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<Error | null>(null);

  const [search, setSearch] = useState("");
  const [projectType, setProjectType] = useState("");
  const [unitType, setUnitType] = useState("");
  const [assignedBy, setAssignedBy] = useState("");
  const [operatedBy, setOperatedBy] = useState("");
  const abortController = new AbortController();
  const loadData = async (loadMore: boolean = false) => {
    setLoading(true);
    if (loadMore) {
      const data = await getProjects(
        page + 1,
        filterData(),
        "*",
        "about_project,challenges_and_impact_details,workareas",
        undefined,
        abortController.signal
      ).catch((err) => {
        setError(err);
      });
      if (data) {
        setProjectsData({
          ...data,
          items: [...(projectsData?.items || []), ...data.items],
        });
        setPage(page + 1);
      }
    } else {
      const data = await getProjects(
        page,
        filterData(),
        "*",
        "about_project,challenges_and_impact_details,workareas",
        undefined,
        abortController.signal
      ).catch((err) => {
        // setError(err);
        console.log(error);
      });
      setProjectsData(data || null);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    return () => {
      if (projectsData) {
        abortController.abort();
      }
    };
  }, [page, projectType, unitType, assignedBy, operatedBy, search]);

  const filterData = () => {
    let filters: string[] = [];
    if (search) filters.push(`name~'${search}' || id='${search}'`);
    if (projectType) filters.push(`type~'${projectType}'`);
    if (unitType) filters.push(`unit_types~'${unitType}'`);
    if (assignedBy) filters.push(`assigned_by~'${assignedBy}'`);
    if (operatedBy) filters.push(`operated_by~'${operatedBy}'`);
    return filters.length > 0 ? `(${filters.join(" && ")})` : "";
  };

  return (
    <div className="">
      <StatisticsView />
      <div className="flex justify-between">
        <div className="flex">
          <Input
            className="rounded-none w-64"
            placeholder="Search Projects"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                loadData();
              }
            }}
          />
          <Select value={projectType} onValueChange={(e) => setProjectType(e)}>
            <SelectTrigger className="w-[200px] rounded-none">
              <SelectValue placeholder="Project Type" />
            </SelectTrigger>
            <SelectContent>
              {projectTypeListGlobal.map((projectType) => (
                <SelectItem key={projectType.id} value={projectType.id}>
                  {projectType.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={unitType} onValueChange={(e) => setUnitType(e)}>
            <SelectTrigger className="w-[200px] rounded-none">
              <SelectValue placeholder="UNIT" />
            </SelectTrigger>
            <SelectContent>
              {unitTypeListGlobal.map((unitType) => (
                <SelectItem key={unitType.id} value={unitType.id}>
                  {unitType.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={assignedBy} onValueChange={(e) => setAssignedBy(e)}>
            <SelectTrigger className="w-[200px] rounded-none">
              <SelectValue placeholder="Assigned By" />
            </SelectTrigger>
            <SelectContent>
              {employeeListGlobal.map((employee) => (
                <SelectItem key={employee.id} value={employee.id}>
                  {employee.first_name + " " + employee.last_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={operatedBy} onValueChange={(e) => setOperatedBy(e)}>
            <SelectTrigger className="w-[200px] rounded-none">
              <SelectValue placeholder="Operated By" />
            </SelectTrigger>
            <SelectContent>
              {usersListGlobal.map((users) => (
                <SelectItem key={users.id} value={users.id}>
                  {users.first_name + " " + users.last_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table className=" overflow-auto border">
        <TableHeader>
          <TableRow className="bg-gray-100 ">
            <TableHead className="w-[100px] border-r text-center">
              S No.
            </TableHead>
            <TableHead className="border-r text-center">Project Name</TableHead>
            <TableHead className="border-r text-center">Project Type</TableHead>
            <TableHead className="border-r text-center">
              Main Interventions{" "}
            </TableHead>
            <TableHead className="border-r text-center">Target Unit</TableHead>
            <TableHead className="border-r text-center">OMR/Unit</TableHead>
            <TableHead className="border-r text-center">Location</TableHead>
            <TableHead className="border-r text-center">Operated By</TableHead>
            <TableHead className="border-r text-center">Assigned By</TableHead>
            <TableHead className="text-center border-r ">Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projectsData?.items.map((project, index) => (
            <ProjectViewItem project={project} index={index + 1} />
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center items-center mt-10">
        {loading && <LoadingSpinner />}
        {loading === false &&
          projectsData &&
          projectsData?.totalPages > projectsData?.page && (
            <Button
              variant="secondary"
              onClick={() => loadData(true)}
              disabled={filterData() !== ""}
            >
              Load More
            </Button>
          )}
        {error && (
          <div className="text-red-500 text-center">
            {error.message || "Something went wrong"}
          </div>
        )}
      </div>
    </div>
  );
}
