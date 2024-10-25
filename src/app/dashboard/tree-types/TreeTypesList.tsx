"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import ViewTreeType from "./manage/ViewTreeType";
import { useTriggerContext } from "@/components/context/triggerContecxt";
import { Collection } from "@/interfaces/collection";
import { TreeTypesItem } from "@/interfaces/treetypes";
import { getTreeTypes } from "@/request/worker/treetype/manageTreeTypes";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";

export function TreesManagement() {
  const [loading, setLoading] = useState(true);
  const [treeTypeData, setTreeTypeData] = useState<Collection<TreeTypesItem>>();
  const { treeTypeTrigger } = useTriggerContext();
  const [page, setPage] = useState(1);

  const loadData = async (loadMore: boolean = false) => {
    setLoading(true);
    if (loadMore) {
      const data = await getTreeTypes(page + 1);
      setTreeTypeData({
        ...data,
        items: [...treeTypeData!.items, ...data?.items],
      });
      setPage(page + 1);
    } else {
      const data = await getTreeTypes(page);
      setTreeTypeData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setPage(1);
    loadData();
  }, [treeTypeTrigger]);

  return (
    <>
      <Table className="overflow-auto">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead>Tree Type</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Hectare Restored </TableHead>
            <TableHead>CO2 Removal </TableHead>
            <TableHead>CO2 Storage </TableHead>
            <TableHead>Air Quality</TableHead>
            <TableHead>Rain Observed </TableHead>
            <TableHead>Energy Saved </TableHead>
            <TableHead>State</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {treeTypeData?.items.map((tree, index) => (
            <ViewTreeType index={index} tree={tree} key={index} />
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center items-center mt-10">
        {loading && <LoadingSpinner />}
        {loading === false &&
          treeTypeData &&
          treeTypeData?.totalPages > treeTypeData?.page && (
            <Button variant="secondary" onClick={() => loadData(true)}>
              Load More
            </Button>
          )}
      </div>
    </>
  );
}
