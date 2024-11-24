import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import { StatusCountItem } from "@/interfaces/StatausCopunt";
import { client } from "@/request/actions";

export const revalidate = 0;

export default async function AdminDash() {
  const data = await client.get("/counting").send<StatusCountItem>();

  return (
    <WorkSpace>
      <WorkHeader title="Dashboard" />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mt-7 capitalize">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {/* Users Status */}
          {data.users_status.map((user) => (
            <Card
              key={user.id}
              className=" rounded-none bg-white border border-gray-200 shadow-none"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center space-x-2">
                  <CardTitle className="text-md font-medium">Users</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm">Type: {user.user_type}</div>
                <div className="text-lg font-bold">Total: {user.total}</div>
              </CardContent>
            </Card>
          ))}
          {/* Blogs Status */}
          {data.blogs_status.map((item) => (
            <Card
              key={item.id}
              className=" rounded-none bg-white border border-gray-200 shadow-none"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center space-x-2">
                  <CardTitle className="text-md font-medium">Blogs</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm">
                  Public:{" "}
                  <span
                    className={`${
                      item.public ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.public ? "Yes" : "No"}
                  </span>
                </div>
                <div className="text-lg font-bold">Total: {item.total}</div>
              </CardContent>
            </Card>
          ))}

          {/* researches_status Status */}
          {data.researches_status.map((item) => (
            <Card
              key={item.id}
              className=" rounded-none bg-white border border-gray-200 shadow-none"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center space-x-2">
                  <CardTitle className="text-md font-medium">
                    Researches
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm">{item.status}</div>
                <div className="text-lg font-bold">Total: {item.total}</div>
              </CardContent>
            </Card>
          ))}

          {/* Donate Status */}
          {data.donate_status.map((item) => (
            <Card
              key={item.id}
              className=" rounded-none bg-white border border-gray-200 shadow-none"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center space-x-2">
                  <CardTitle className="text-md font-medium">
                    Donations
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-lg font-bold">Total: ${item.total}</div>
                <div className="text-sm">Donates: {item.donates}</div>
              </CardContent>
            </Card>
          ))}

          {/* Trees Status */}
          {data.trees_status.map((item) => (
            <Card
              key={item.id}
              className=" rounded-none bg-white border border-gray-200 shadow-none"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center space-x-2">
                  <CardTitle className="text-md font-medium">Trees</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm">
                  Status:{" "}
                  <Badge
                    variant="outline"
                    className="text-[10px] p-0 px-3 ml-3"
                  >
                    {item.status}
                  </Badge>
                </div>
                <div className="text-lg font-bold">Total: {item.total}</div>
              </CardContent>
            </Card>
          ))}

          {/* Project Status */}
          {data.project_status.map((item) => (
            <Card
              key={item.id}
              className=" rounded-none bg-white border border-gray-200 shadow-none"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center space-x-2">
                  <CardTitle className="text-md font-medium">
                    Projects
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm">
                  Status:{" "}
                  <Badge
                    variant="outline"
                    className="text-[10px] p-0 px-3 ml-3"
                  >
                    {item.status}
                  </Badge>
                </div>
                <div className="text-lg font-bold">Total: {item.total}</div>
              </CardContent>
            </Card>
          ))}

          {/* Tree Orders Status */}
          {data.tree_orders_status.map((item) => (
            <Card
              key={item.id}
              className=" rounded-none bg-white border border-gray-200 shadow-none"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center space-x-2">
                  <CardTitle className="text-md font-medium">
                    Tree Orders
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm">
                  Status:{" "}
                  <Badge
                    variant="outline"
                    className="text-[10px] p-0 px-3 ml-3"
                  >
                    {item.status}
                  </Badge>
                </div>
                <div className="text-lg font-bold">Total: {item.total}</div>
              </CardContent>
            </Card>
          ))}

          {/* Unit Status */}
          {data.unit_status.map((item) => (
            <Card
              key={item.id}
              className=" rounded-none bg-white border border-gray-200 shadow-none"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center space-x-2">
                  <CardTitle className="text-md font-medium">
                    Unit Types
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-lg font-bold">Total: {item.total}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </WorkSpace>
  );
}
