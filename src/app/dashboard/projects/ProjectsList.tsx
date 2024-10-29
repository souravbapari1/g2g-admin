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

export function ProjectsList() {
  const [loading, setLoading] = useState(true);
  const [projectsData, setProjectsData] = useState<Collection<ProjectItem>>();

  const [page, setPage] = useState(1);

  const loadData = async (loadMore: boolean = false) => {
    setLoading(true);
    if (loadMore) {
      const data = await getProjects(page + 1);
      setProjectsData({
        ...data,
        items: [...projectsData!.items, ...data?.items],
      });
      setPage(page + 1);
    } else {
      const data = await getProjects(page);
      setProjectsData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="">
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
            <Button variant="secondary" onClick={() => loadData(true)}>
              Load More
            </Button>
          )}
      </div>
    </div>
  );
}
