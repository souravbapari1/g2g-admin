import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import { UsersList } from "./UsersList";
import { getUserStatusCount } from "../users/action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export const revalidate = 0;
export default async function Page() {
  const statusticks = await getUserStatusCount("ambassador", "USER");
  return (
    <WorkSpace>
      <WorkHeader title="Ambassadors" />
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
      <div className="flex flex-1 flex-col gap-4 ">
        <UsersList />
      </div>
    </WorkSpace>
  );
}
