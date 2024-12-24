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
import { Collection } from "@/interfaces/collection";
import { useEffect, useState } from "react";

import { useGlobalDataSetContext } from "@/components/context/globalDataSetContext";
import { ComboboxUser } from "@/components/ui/custom/comb-box-users";
import { Input } from "@/components/ui/input";
import { ProjectItem } from "@/interfaces/project";
import { getProjects } from "@/request/worker/project/manageProject";
import { Filter, FilterIcon } from "lucide-react";
import ProjectViewItem from "./ProjectViewItem";
import StatisticsView from "./StaisticsView";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ProjectsList() {
  const {
    projectTypeListGlobal,
    unitTypeListGlobal,
    countryCityListGlobal,
    accStandardsListGlobal,
  } = useGlobalDataSetContext();
  const [loading, setLoading] = useState(true);
  const [projectsData, setProjectsData] =
    useState<Collection<ProjectItem> | null>(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<Error | null>(null);
  const [showFilter, setSetShowFilter] = useState(false);

  const [search, setSearch] = useState("");
  const [projectType, setProjectType] = useState("");
  const [unitType, setUnitType] = useState("");
  const [assignedBy, setAssignedBy] = useState("");
  const [operatedBy, setOperatedBy] = useState("");
  const [created_by, setCreated_by] = useState("");
  const [Country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");
  const [parameters, setParameters] = useState("");
  const [accStandards, setAccStandards] = useState("");

  const [top, setTop] = useState<boolean | null>(null);

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
    const timer = setTimeout(() => {
      loadData();
    }, 500);

    return () => {
      clearTimeout(timer);
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
    parameters,
    accStandards,
    created_by,
    top,
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
    if (parameters) filters.push(`main_interventions~'${parameters}'`);
    if (accStandards) filters.push(`accredation_standars~'${accStandards}'`);
    if (created_by) filters.push(`created_by~'${created_by}'`);

    if (top != null) {
      filters.push(`top_project=${top}`);
    }

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

      <div className="flex justify-between flex-col text-xs">
        <div className="flex p-2 mb-5 justify-start flex-col flex-wrap gap-4 items-start  w-full text-xs border-gray-50">
          <div className="flex justify-between text-nowrap w-full items-center gap-5  rounded-md px-2">
            <Input
              className=" w-96 border-none  bg-gray-100 rounded-md  h-8 "
              placeholder="Search Projects"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  loadData();
                }
              }}
            />

            <div className="flex justify-center items-center gap-4 bg-gray-100 h-8 px-2 rounded-md ">
              <div className="">
                <Badge
                  className={cn(
                    "rounded flex justify-center items-center gap-3 border-none cursor-pointer  font-light",
                    `${!showFilter ? "bg-white" : ""}`
                  )}
                  variant={!showFilter ? "secondary" : "destructive"}
                  onClick={() => {
                    setSearch("");
                    setProjectType("");
                    setUnitType("");
                    setAssignedBy("");
                    setOperatedBy("");
                    setCountry("");
                    setCity("");
                    setParameters("");
                    setAccStandards("");
                    setStatus("");
                    setCreated_by("");
                    setTop(null);
                    setSetShowFilter(!showFilter);
                  }}
                >
                  <FilterIcon size={8} />
                  {showFilter ? "Hide Filter" : "Filter"}
                </Badge>
              </div>
              <div className="flex justify-end items-center gap-5">
                <p>Top Projects: </p>{" "}
                <Switch
                  checked={top || false}
                  onCheckedChange={(e) => setTop(e)}
                />
              </div>
            </div>
          </div>

          {showFilter && (
            <div className="grid grid-cols-5 bg-gray-500 p-5  rounded-lg w-full text-xs gap-4 flex-wrap items-end">
              <Select
                value={projectType}
                onValueChange={(e) => setProjectType(e)}
              >
                <SelectTrigger className="w-full  border-none bg-gray-100 rounded-md  h-8  ">
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
                <SelectTrigger className="w-full  border-none bg-gray-100 rounded-md  h-8  ">
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
                className="w-full  border-none bg-gray-100 rounded-md  h-8  "
                placeholder="Assigned By"
              />
              <ComboboxUser
                onSelect={(e) => setOperatedBy(e)}
                defaultValue={operatedBy}
                className="w-full  border-none bg-gray-100 rounded-md  h-8  "
                placeholder="Operated By"
              />
              <ComboboxUser
                onSelect={(e) => setCreated_by(e)}
                defaultValue={operatedBy}
                className="w-full  border-none bg-gray-100 rounded-md  h-8  "
                placeholder="Created By"
              />
              <Select value={Country} onValueChange={(e) => setCountry(e)}>
                <SelectTrigger className="w-full  border-none bg-gray-100 rounded-md  h-8  ">
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
                <SelectTrigger className="w-full  border-none bg-gray-100 rounded-md  h-8   ">
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
                <SelectTrigger className="w-full  border-none bg-gray-100 rounded-md  h-8  ">
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

              <Select
                value={parameters}
                onValueChange={(e) => setParameters(e)}
              >
                <SelectTrigger className="w-full  border-none bg-gray-100 rounded-md  h-8  ">
                  <SelectValue placeholder="Main Intervention" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from(
                    new Set(
                      projectTypeListGlobal
                        .map((projectType) => projectType.parameters) // Extract parameters
                        .flat() // Flatten the arrays
                    )
                  ).map((parameter) => (
                    <SelectItem key={parameter} value={parameter}>
                      {parameter}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={accStandards}
                onValueChange={(e) => setAccStandards(e)}
              >
                <SelectTrigger className="w-full  border-none bg-gray-100 rounded-md  h-8  ">
                  <SelectValue placeholder="Accredation Standards" />
                </SelectTrigger>
                <SelectContent>
                  {accStandardsListGlobal.map((parameter) => (
                    <SelectItem key={parameter.id} value={parameter.id}>
                      {parameter.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>
      <div className="tableWrapper">
        <table className="tblView">
          <thead>
            <tr>
              <th>S-No.</th>
              <th>Project Name</th>
              <th>Project Type</th>
              <th>Main Interventions</th>
              <th>Compare</th>
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
