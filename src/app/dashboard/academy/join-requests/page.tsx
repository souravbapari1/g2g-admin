import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import React from "react";
import AcademicsList from "./AcademicsList";
import { getUpcomingAcademies } from "./manageRequests";
import ExportDataView from "@/components/export";
import { Button } from "@/components/ui/button";
import { FaFileExcel } from "react-icons/fa";
import { client } from "@/request/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const revalidate = 0;
async function page() {
  const academic = await getUpcomingAcademies();
  const statusData = await client.get("/academics/status").send<{
    approved: number;
    cancel: number;
    complete: number;
    names: number;
    new: number;
    total: number;
    totalAmount: number;
    totalCity: number;
  }>();

  return (
    <WorkSpace>
      <WorkHeader title="Join Requests">
        <ExportDataView base="academics_requests">
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
            <CardTitle className="text-sm">Amount</CardTitle>
          </CardHeader>
          <CardContent>{statusData?.totalAmount}</CardContent>
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
        <Card className="shadow-none bg-gray-50 border-none rounded-none">
          <CardHeader>
            <CardTitle className="text-sm">No. Planes</CardTitle>
          </CardHeader>
          <CardContent>{statusData?.names}</CardContent>
        </Card>
      </div>
      <AcademicsList academics={academic.data} />
    </WorkSpace>
  );
}

export default page;
