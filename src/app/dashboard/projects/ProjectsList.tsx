"use client";
import { Button } from "@/components/ui/button";
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
import { useEffect, useState } from "react";

import { useGlobalDataSetContext } from "@/components/context/globalDataSetContext";
import { ComboboxUser } from "@/components/ui/custom/comb-box-users";
import { Input } from "@/components/ui/input";
import { ProjectItem } from "@/interfaces/project";
import { getProjects } from "@/request/worker/project/manageProject";
import { Filter } from "lucide-react";
import ProjectViewItem from "./ProjectViewItem";
import StatisticsView from "./StaisticsView";

export function ProjectsList() {
  const {
    projectTypeListGlobal,
    unitTypeListGlobal,
    employeeListGlobal,
    usersListGlobal,
    countryCityListGlobal,
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
  const [Country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");

  const [showFilter, setShowFilter] = useState(false);

  const abortController = new AbortController();
  const loadData = async (loadMore: boolean = false) => {
    setLoading(true);
    if (loadMore) {
      const data = await getProjects(
        page + 1,
        filterData(),
        "*",
        "about_project,challenges_and_impact_details,workareas",
        "operated_by,reports,sdgs,unit_types,type,created_by,assigned_by,accredation_standars",
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
        "operated_by,reports,sdgs,unit_types,type,created_by,assigned_by,accredation_standars",
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
  }, [
    page,
    projectType,
    unitType,
    assignedBy,
    operatedBy,
    search,
    Country,
    city,
    status,
  ]);

  const filterData = () => {
    let filters: string[] = [];
    if (search) filters.push(`name~'${search}' || id='${search}'`);
    if (projectType) filters.push(`type~'${projectType}'`);
    if (unitType) filters.push(`unit_types~'${unitType}'`);
    if (assignedBy) filters.push(`assigned_by~'${assignedBy}'`);
    if (operatedBy) filters.push(`operated_by~'${operatedBy}'`);
    if (Country) filters.push(`country~'${Country}'`);
    if (city) filters.push(`city~'${city}'`);
    if (status) {
      if (status == "tree") {
        filters.push(`project_prefix='${status}'`);
      } else if (status == "others" || status == "plastic") {
        filters.push(`project_prefix='${status}'`);
      } else {
        filters.push(`status~'${status}'`);
      }
    }
    return filters.length > 0 ? `(${filters.join(" && ")})` : "";
  };

  return (
    <div className="relative">
      <div className="p-5">
        <StatisticsView />
      </div>
      <div className="">
        {!showFilter && (
          <div
            className="bg-gray-100 mx-4 w-8 h-8 flex items-center justify-center rounded-full mb-2 cursor-pointer border"
            onClick={() => setShowFilter(!showFilter)}
          >
            <Filter size={13} />
          </div>
        )}
      </div>
      {showFilter && (
        <div className="flex justify-between text-xs">
          <div className="flex">
            <Input
              className="rounded-none w-64 border-b-0 px-5 h-8 border-r-0"
              placeholder="Search Projects"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  loadData();
                }
              }}
            />
            <Select
              value={projectType}
              onValueChange={(e) => setProjectType(e)}
            >
              <SelectTrigger className="w-[200px] rounded-none border-b-0 px-5 h-8  border-r-0">
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
              <SelectTrigger className="w-[200px] rounded-none border-b-0 px-5 h-8  border-r-0">
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

            <ComboboxUser
              onSelect={(e) => setAssignedBy(e)}
              defaultValue={assignedBy}
              className="w-[190px] rounded-none border-b-0 px-3 h-8  border-r-0"
            />
            <ComboboxUser
              onSelect={(e) => setOperatedBy(e)}
              defaultValue={operatedBy}
              className="w-[190px] rounded-none border-b-0 px-3 h-8  border-r-0"
            />
            <Select value={Country} onValueChange={(e) => setCountry(e)}>
              <SelectTrigger className="w-[150px] rounded-none border-b-0 px-5 h-8  border-r-0">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                {countryCityListGlobal.map((data) => (
                  <SelectItem key={data.country} value={data.country}>
                    {data.country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={city} onValueChange={(e) => setCity(e)}>
              <SelectTrigger className="w-[150px] rounded-none border-b-0 px-5 h-8  border-r-0 ">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                {countryCityListGlobal
                  .find((users) => users.country === Country)
                  ?.cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={(e) => setStatus(e)}>
              <SelectTrigger className="w-[150px] rounded-none border-b-0 px-5 h-8  border-r-0">
                <SelectValue placeholder="status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key="active" value="active">
                  active
                </SelectItem>
                <SelectItem key="inactive" value="inactive">
                  inactive
                </SelectItem>
                <SelectItem key="tree" value="tree">
                  Tree Projects
                </SelectItem>
                <SelectItem key="others" value="others">
                  Others Projects
                </SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={() => {
                setAssignedBy("");
                setOperatedBy("");
                setCountry("");
                setCity("");
                setStatus("");
                setUnitType("");
                setProjectType("");
                setSearch("");
                setShowFilter(false);
                loadData();
              }}
              className="rounded-none border-b-0 px-5 h-8"
              variant="destructive"
              size="sm"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      )}
      <div className="tableWrapper">
        <table className="tblView">
          <thead>
            <tr>
              <th>S-No.</th>
              <th>Project Name</th>
              <th>Project Type</th>
              <th>Main Interventions</th>
              <th>No of Units</th>
              <th>Target Unit</th>
              <th>OMR/Unit</th>
              <th>Accredation Standards</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Location</th>
              <th>Operated By</th>
              <th>Assigned By</th>
              <th>Created By</th>
              <th>Status</th>
              <th className="action">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projectsData?.items.map((project, index) => (
              <ProjectViewItem
                project={project}
                index={index + 1}
                key={project.id + index}
              />
            ))}
          </tbody>
        </table>
      </div>

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
