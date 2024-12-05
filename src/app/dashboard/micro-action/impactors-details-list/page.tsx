import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import React from "react";
import ImpactList from "./ImpactList";
import { client } from "@/request/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MAStatus } from "./impact";

export const revalidate = 60;
async function page() {
  const status = await client.get("/maimpact/status").send<MAStatus>();
  return (
    <WorkSpace>
      <WorkHeader title="Impactors Details List" />
      <div className="grid grid-cols-4 gap-4 p-3">
        <Card className="border-none bg-gray-100 rounded-none shadow-none">
          <CardHeader>
            <CardTitle className="text-sm">Total Impact</CardTitle>
          </CardHeader>
          <CardContent>
            {status?.total.impact} <small> Co2</small>
          </CardContent>
        </Card>

        <Card className="border-none bg-gray-100 rounded-none shadow-none">
          <CardHeader>
            <CardTitle className="text-sm">Total City</CardTitle>
          </CardHeader>
          <CardContent>{status?.totalCity} </CardContent>
        </Card>

        <Card className="border-none bg-gray-100 rounded-none shadow-none">
          <CardHeader>
            <CardTitle className="text-sm">Total Users</CardTitle>
          </CardHeader>
          <CardContent>{status?.users.users}</CardContent>
        </Card>
        <Card className="border-none bg-gray-100 rounded-none shadow-none">
          <CardHeader>
            <CardTitle className="text-sm">Total Actions</CardTitle>
          </CardHeader>
          <CardContent>{status?.submits.submits}</CardContent>
        </Card>
      </div>
      <ImpactList />
    </WorkSpace>
  );
}

export default page;
