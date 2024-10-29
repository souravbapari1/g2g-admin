"use client";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Collection } from "@/interfaces/collection";
import { ProjectType } from "@/interfaces/projectType";
import { getProjectType } from "@/request/worker/catalogs/projectType";
import { useEffect, useState } from "react";
import ViewProjectType from "./manage/ViewProjectType";
import { useTriggerContext } from "@/components/context/triggerContecxt";

export function ProjectTypesList() {
  const [loading, setLoading] = useState(true);
  const [projectTypeData, setProjectTypeData] =
    useState<Collection<ProjectType>>();
  const { projectTypeTrigger } = useTriggerContext();
  const [page, setPage] = useState(1);

  const loadData = async (loadMore: boolean = false) => {
    setLoading(true);
    if (loadMore) {
      const data = await getProjectType(page + 1);
      setProjectTypeData({
        ...data,
        items: [...projectTypeData!.items, ...data?.items],
      });
      setPage(page + 1);
    } else {
      const data = await getProjectType(page);
      setProjectTypeData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setPage(1);
    loadData();
  }, [projectTypeTrigger]);

  return (
    <div className="">
      <Table className=" overflow-auto border">
        <TableHeader>
          <TableRow className="bg-gray-100  ">
            <TableHead className="w-[100px] border-r text-center ">
              S No.
            </TableHead>
            <TableHead className="border-r text-center">Project Type</TableHead>
            <TableHead className="border-r text-center">Parameters</TableHead>
            <TableHead className="text-center border-r">
              Unit Of Measurement
            </TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projectTypeData?.items.map((type, i) => (
            <ViewProjectType data={type} index={i + 1} key={type.id} />
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center items-center mt-10">
        {loading && <LoadingSpinner />}
        {loading === false &&
          projectTypeData &&
          projectTypeData?.totalPages > projectTypeData?.page && (
            <Button variant="secondary" onClick={() => loadData(true)}>
              Load More
            </Button>
          )}
      </div>
    </div>
  );
}
