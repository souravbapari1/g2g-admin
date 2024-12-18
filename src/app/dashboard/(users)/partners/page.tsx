import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import PartnersListTabs from "./PartnersListTabs";
import { getUserStatusCount } from "../users/action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export const revalidate = 0;
export default async function Page() {
  const statusticks = await getUserStatusCount("partner", "USER");
  return (
    <WorkSpace>
      <WorkHeader title="Partners" />

      <div className="grid grid-cols-5 gap-5 p-5">
        <Card className="shadow-none bg-gray-50 border-none rounded-none">
          <CardHeader>
            <CardTitle className="text-sm">Total Users</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {statusticks.totalUsers}
          </CardContent>
        </Card>

        <Card className="shadow-none bg-gray-50 border-none rounded-none">
          <CardHeader>
            <CardTitle className="text-sm">Total Active Users</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {statusticks.activeUsers}
          </CardContent>
        </Card>

        <Card className="shadow-none bg-gray-50 border-none rounded-none">
          <CardHeader>
            <CardTitle className="text-sm">Total InActive Users</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {statusticks.inActiveUsers}
          </CardContent>
        </Card>

        <Card className="shadow-none bg-gray-50 border-none rounded-none">
          <CardHeader>
            <CardTitle className="text-sm">Total Country</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {statusticks.totalCountry}
          </CardContent>
        </Card>

        <Card className="shadow-none bg-gray-50 border-none rounded-none">
          <CardHeader>
            <CardTitle className="text-sm">Total City</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {statusticks.totalCity}
          </CardContent>
        </Card>
      </div>
      {/* <PartnersList /> */}
      <PartnersListTabs />
    </WorkSpace>
  );
}
