import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import React from "react";
import FslpRequestsList from "./FslpRequestsList";
import ExportDataView from "@/components/export";
import { Button } from "@/components/ui/button";
import { FaFileExcel } from "react-icons/fa";
import { client } from "@/request/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const revalidate = 0;
async function page() {
  const statusData = await client.get("/fslp/status").send<{
    approved: number;
    cancel: number;
    complete: number;
    new: number;
    total: number;
    totalCity: number;
  }>();

  return (
    <WorkSpace>
      <WorkHeader title="FSLP Requests">
        <ExportDataView base="fslp">
          <Button size="sm" variant="secondary">
            <FaFileExcel /> Export Files
          </Button>
        </ExportDataView>
      </WorkHeader>

      <div className="grid grid-cols-4 gap-4 p-5">
        <Card className="shadow-none bg-gray-50 border-none rounded-none">
          <CardHeader>
            <CardTitle className="text-sm">Approved</CardTitle>
          </CardHeader>
          <CardContent>{statusData?.approved}</CardContent>
        </Card>
        <Card className="shadow-none bg-gray-50 border-none rounded-none">
          <CardHeader>
            <CardTitle className="text-sm">Cancel</CardTitle>
          </CardHeader>
          <CardContent>{statusData?.cancel}</CardContent>
        </Card>
        <Card className="shadow-none bg-gray-50 border-none rounded-none">
          <CardHeader>
            <CardTitle className="text-sm">Complete</CardTitle>
          </CardHeader>
          <CardContent>{statusData?.complete}</CardContent>
        </Card>
        <Card className="shadow-none bg-gray-50 border-none rounded-none">
          <CardHeader>
            <CardTitle className="text-sm">Total Requests</CardTitle>
          </CardHeader>
          <CardContent>{statusData?.total}</CardContent>
        </Card>

        <Card className="shadow-none bg-gray-50 border-none rounded-none">
          <CardHeader>
            <CardTitle className="text-sm">Cities</CardTitle>
          </CardHeader>
          <CardContent>{statusData?.totalCity}</CardContent>
        </Card>
        <Card className="shadow-none bg-gray-50 border-none rounded-none">
          <CardHeader>
            <CardTitle className="text-sm">New Requests</CardTitle>
          </CardHeader>
          <CardContent>{statusData?.new}</CardContent>
        </Card>
      </div>
      <FslpRequestsList />
    </WorkSpace>
  );
}

export default page;
