"use client";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Input } from "@/components/ui/input";
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
  const [searchTerm, setSearchTerm] = useState("");

  // Construct filter query for search term
  const filterQuery = () => {
    return searchTerm ? `(name~'${searchTerm}')` : "";
  };

  const loadData = async (loadMore: boolean = false) => {
    setLoading(true);
    const nextPage = loadMore ? page + 1 : 1;

    try {
      const data = await getProjectType(nextPage, filterQuery());

      setProjectTypeData((prevData) =>
        loadMore && prevData
          ? { ...data, items: [...prevData.items, ...data.items] }
          : data
      );

      if (loadMore) setPage(nextPage);
      else setPage(1);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    loadData();
  }, [projectTypeTrigger]);

  // Trigger search on Enter key press
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setPage(1);
      loadData();
    }
  };

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search Project Type"
          className="w-60 rounded-none border-b-0"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyUp={handleSearch}
        />
        <p>Total Project Types : {projectTypeData?.totalItems || 0}</p>
      </div>

      <Table className="overflow-auto border">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="w-[100px] border-r text-center">
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
        {!loading &&
          projectTypeData &&
          projectTypeData.totalPages > projectTypeData.page && (
            <Button variant="secondary" onClick={() => loadData(true)}>
              Load More
            </Button>
          )}
      </div>
    </div>
  );
}
