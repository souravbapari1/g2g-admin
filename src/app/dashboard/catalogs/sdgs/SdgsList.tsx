"use client";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Collection } from "@/interfaces/collection";
import { SDGITEM } from "@/interfaces/sdg";
import { getSdgs } from "@/request/worker/catalogs/sdgs";
import { useEffect, useState } from "react";
import ViewSdgs from "./manage/ViewSdgs";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";
import { useTriggerContext } from "@/components/context/triggerContecxt";

export function SdgsList() {
  const [loading, setLoading] = useState(true);
  const [sdgsData, setSdgsData] = useState<Collection<SDGITEM>>();
  const [page, setPage] = useState(1);
  const { sdgTrigger } = useTriggerContext();

  const loadData = async (loadMore: boolean = false) => {
    setLoading(true);
    if (loadMore) {
      const data = await getSdgs(page + 1);
      setSdgsData({
        ...data,
        items: [...sdgsData!.items, ...data?.items],
      });
      setPage(page + 1);
    } else {
      const data = await getSdgs(page);
      setSdgsData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setPage(1);
    loadData();
  }, [sdgTrigger]);

  return (
    <>
      <Table className=" overflow-auto border ">
        <TableHeader>
          <TableRow className="bg-gray-100 ">
            <TableHead className="w-[100px] border-r text-center">
              S No.
            </TableHead>
            <TableHead className=" border-r text-center">Image</TableHead>
            <TableHead className=" border-r text-center">SDG</TableHead>
            <TableHead className=" border-r text-center">Parameters</TableHead>
            <TableHead className="text-center border-r">Colors</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sdgsData?.items.map((sdg, i) => (
            <ViewSdgs index={i + 1} sdg={sdg} key={sdg.id} />
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center items-center mt-10">
        {loading && <LoadingSpinner />}
        {loading === false &&
          sdgsData &&
          sdgsData?.totalPages > sdgsData?.page && (
            <Button variant="secondary" onClick={() => loadData(true)}>
              Load More
            </Button>
          )}
      </div>
    </>
  );
}
