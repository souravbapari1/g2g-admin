"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTriggerContext } from "@/components/context/triggerContecxt";
import { Collection } from "@/interfaces/collection";
import { UnitItem } from "@/interfaces/units";
import { getUnitTypes } from "@/request/worker/catalogs/unitTypes";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import UnitItemView from "./manage/UnitItemView";

export function UnitTypesList() {
  const [loading, setLoading] = useState(true);
  const [unitTypeData, setUnitTypeData] = useState<Collection<UnitItem>>();
  const [page, setPage] = useState(1);
  const { unitTypeTrigger } = useTriggerContext();

  const loadData = async (loadMore: boolean = false) => {
    setLoading(true);
    if (loadMore) {
      const data = await getUnitTypes(page + 1);
      setUnitTypeData({
        ...data,
        items: [...unitTypeData!.items, ...data?.items],
      });
      setPage(page + 1);
    } else {
      const data = await getUnitTypes(page);
      setUnitTypeData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setPage(1);
    loadData();
  }, [unitTypeTrigger]);

  return (
    <>
      <Table className=" overflow-auto border">
        <TableHeader>
          <TableRow className="bg-gray-100 ">
            <TableHead className="w-[100px] text-center border">
              S No.
            </TableHead>
            <TableHead className="border-r text-center ">Unit Type</TableHead>
            <TableHead className="border-r text-center ">
              Project Type
            </TableHead>
            <TableHead className="border-r text-center ">Parameters</TableHead>
            <TableHead className="text-center border-r">Unit</TableHead>
            <TableHead className="text-center border-r ">ORM/Unit</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {unitTypeData?.items.map((unit, i) => (
            <UnitItemView index={i + 1} unit={unit} key={unit.id} />
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center items-center mt-10">
        {loading && <LoadingSpinner />}
        {loading === false &&
          unitTypeData &&
          unitTypeData?.totalPages > unitTypeData?.page && (
            <Button variant="secondary" onClick={() => loadData(true)}>
              Load More
            </Button>
          )}
      </div>
    </>
  );
}
