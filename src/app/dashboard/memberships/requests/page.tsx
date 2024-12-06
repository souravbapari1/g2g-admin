import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import RequestList from "./RequestList";
import { client } from "@/request/actions";
import { RequestState } from "./request";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ExportDataView from "@/components/export";
import { Button } from "@/components/ui/button";
import { FaFileExcel } from "react-icons/fa";

export const revalidate = 0;
async function page() {
  const status = await client.get("/membership/status").send<RequestState>();

  return (
    <WorkSpace>
      <WorkHeader title="Membership Requests">
        <ExportDataView base="membership_payments">
          <Button size="sm" variant="outline">
            <FaFileExcel /> Export Files
          </Button>
        </ExportDataView>
      </WorkHeader>
      <div className="p-5">
        <div className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 gap-5">
          {status.requestStatus.map((item) => (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center space-x-2">
                  <CardTitle className="text-md font-xl capitalize font-bold ">
                    {item.status} Memberships
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm">Total: {item.total}</div>
              </CardContent>
            </Card>
          ))}

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center space-x-2">
                <CardTitle className="text-md font-xl capitalize font-bold ">
                  Total Orders
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm">Total: {status.totalOrders}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center space-x-2">
                <CardTitle className="text-md font-xl capitalize font-bold ">
                  Total City
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm">Total: {status.cityCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center space-x-2">
                <CardTitle className="text-md font-xl capitalize font-bold ">
                  Total Quantity
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm">Total: {status.quantity}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center space-x-2">
                <CardTitle className="text-md font-xl capitalize font-bold ">
                  Total Amount
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm">Total: {status.amount} OMR</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <RequestList />
    </WorkSpace>
  );
}

export default page;
