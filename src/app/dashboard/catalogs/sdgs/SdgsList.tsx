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
import { useEffect, useState, useCallback } from "react";
import ViewSdgs from "./manage/ViewSdgs";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTriggerContext } from "@/components/context/triggerContecxt";

export function SdgsList() {
  const [loading, setLoading] = useState(true);
  const [sdgsData, setSdgsData] = useState<Collection<SDGITEM>>();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { sdgTrigger } = useTriggerContext();

  // Filter query based on the search term
  const filterQuery = useCallback(() => {
    return searchTerm ? `(name~'${searchTerm}')` : "";
  }, [searchTerm]);

  const loadData = async (loadMore: boolean = false) => {
    setLoading(true);
    try {
      const nextPage = loadMore ? page + 1 : 1;
      const data = await getSdgs(nextPage, filterQuery());

      setSdgsData((prevData) =>
        loadMore && prevData
          ? {
              ...data,
              items: [...prevData.items, ...data.items],
            }
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
    loadData();
  }, [sdgTrigger]);

  // Handles search when 'Enter' key is pressed
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setPage(1);
      loadData();
    }
  };

  return (
    <div>
      <div className="flex items-center  justify-between">
        <Input
          placeholder="Search SDG"
          className="w-60 rounded-none "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyUp={handleSearch}
        />
        <p>Total Sdgs : {sdgsData?.totalItems || 0}</p>
      </div>

      <Table className="overflow-auto border">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="w-[100px] border-r text-center">
              S No.
            </TableHead>
            <TableHead className="border-r text-center">Image</TableHead>
            <TableHead className="border-r text-center">SDG</TableHead>
            <TableHead className="border-r text-center">Parameters</TableHead>
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
        {!loading && sdgsData && sdgsData.totalPages > sdgsData.page && (
          <Button variant="secondary" onClick={() => loadData(true)}>
            Load More
          </Button>
        )}
      </div>
    </div>
  );
}
