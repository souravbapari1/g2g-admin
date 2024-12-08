import { Button } from "@/components/ui/button";
import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import Link from "next/link";
import MicroActionList from "./MicroActionList";
import { MAStatus } from "./impactors-details-list/impact";
import { client } from "@/request/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export const revalidate = 60;
async function page() {
  const status = await client.get("/maimpact/status").send<MAStatus>();
  return (
    <WorkSpace>
      <WorkHeader title="Micro Actions">
        <Link href="/dashboard/micro-action/add">
          <Button size="sm" variant="outline">
            Add New
          </Button>
        </Link>
      </WorkHeader>
      <div className="grid lg:grid-cols-4 gap-4 p-3">
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
            <CardTitle className="text-sm">Micro Actions</CardTitle>
          </CardHeader>
          <CardContent>{status?.totalMc} </CardContent>
        </Card>

        <Card className="border-none bg-gray-100 rounded-none shadow-none">
          <CardHeader>
            <CardTitle className="text-sm">Total Country</CardTitle>
          </CardHeader>
          <CardContent>{status?.totalCountry} </CardContent>
        </Card>

        <Card className="border-none bg-gray-100 rounded-none shadow-none">
          <CardHeader>
            <CardTitle className="text-sm">Total City</CardTitle>
          </CardHeader>
          <CardContent>{status?.totalCity} </CardContent>
        </Card>

        <Card className="border-none bg-gray-100 rounded-none shadow-none">
          <CardHeader>
            <CardTitle className="text-sm">Total impactors</CardTitle>
          </CardHeader>
          <CardContent>{status?.users.users}</CardContent>
        </Card>
        <Card className="border-none bg-gray-100 rounded-none shadow-none">
          <CardHeader>
            <CardTitle className="text-sm">Total Submits</CardTitle>
          </CardHeader>
          <CardContent>{status?.submits.submits}</CardContent>
        </Card>

        <Card className="border-none bg-gray-100 rounded-none shadow-none">
          <CardHeader>
            <CardTitle className="text-sm">Total Sponsors</CardTitle>
          </CardHeader>
          <CardContent>{status?.sponsors}</CardContent>
        </Card>
      </div>
      <MicroActionList />
    </WorkSpace>
  );
}

export default page;
