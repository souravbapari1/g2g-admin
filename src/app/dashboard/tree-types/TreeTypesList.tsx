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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TreesManagement() {
  const [loading, setLoading] = useState(true);
  const [treeTypeData, setTreeTypeData] = useState<Collection<TreeTypesItem>>();
  const { treeTypeTrigger } = useTriggerContext();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>("");
  const [state, setState] = useState<string>("");

  const abortController = new AbortController();
  const filterData = () => {
    let filter = [];
    if (state === "active") {
      filter.push(`state=true`);
    } else if (state === "inactive") {
      filter.push(`state=false`);
    }
    if (search) {
      filter.push(`name~'${search}'`);
    }
    return filter.length > 0 ? `(${filter.join(" && ")})` : "";
  };

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
      const data = await getTreeTypes(
        page,
        filterData(),
        abortController.signal
      );
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
  }, [treeTypeTrigger, search, state]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center">
          <Input
            className="rounded-none w-60"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select value={state} onValueChange={(e) => setState(e)}>
            <SelectTrigger className=" rounded-none">
              <SelectValue placeholder="State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">active</SelectItem>
              <SelectItem value="inactive">inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <p>Total: {treeTypeData?.totalItems}</p>
      </div>
      <Table className="overflow-auto border">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="border-r text-center">Tree Type</TableHead>
            <TableHead className="border-r text-center">Price</TableHead>
            <TableHead className="border-r text-center">
              Hectare Restored{" "}
            </TableHead>
            <TableHead className="border-r text-center">CO2 Removal </TableHead>
            <TableHead className="border-r text-center">CO2 Storage </TableHead>
            <TableHead className="border-r text-center">Air Quality</TableHead>
            <TableHead className="border-r text-center">
              Rain Observed{" "}
            </TableHead>
            <TableHead className="border-r text-center">
              Energy Saved{" "}
            </TableHead>
            <TableHead className="border-r text-center">State</TableHead>
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
    </div>
  );
}
