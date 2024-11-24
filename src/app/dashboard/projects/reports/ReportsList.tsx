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
import { useTriggerContext } from "@/components/context/triggerContecxt";
import { Collection } from "@/interfaces/collection";
import { ReportingItem } from "@/interfaces/reporting";

import { getReports } from "@/request/worker/catalogs/reports";
import React, { useEffect, useState } from "react";
import ReportsView from "../new/components/ReportsView";

function ReportsList() {
  const [loading, setLoading] = useState(true);
  const [reportsData, setReportsData] = useState<Collection<ReportingItem>>();
  const [page, setPage] = useState(1);

  const loadData = async (loadMore: boolean = false) => {
    setLoading(true);
    if (loadMore) {
      const data = await getReports(page + 1);
      setReportsData({
        ...data,
        items: [...reportsData!.items, ...data?.items],
      });
      setPage(page + 1);
    } else {
      const data = await getReports(page);
      setReportsData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Table className=" overflow-auto border">
        <TableHeader>
          <TableRow className="bg-gray-100 ">
            <TableHead className="w-[100px]">S No.</TableHead>
            <TableHead>File</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Desc</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reportsData?.items.map((report, i) => (
            <ReportsView index={i + 1} report={report} key={report.id} />
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center items-center mt-10">
        {loading && <LoadingSpinner />}
        {loading === false &&
          reportsData &&
          reportsData?.totalPages > reportsData?.page && (
            <Button variant="secondary" onClick={() => loadData(true)}>
              Load More
            </Button>
          )}
      </div>
    </>
  );
}

export default ReportsList;
