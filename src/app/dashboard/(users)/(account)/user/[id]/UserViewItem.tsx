"use client";
import MyBalance from "./components/MyBalance";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyProjectsList from "./components/my-projects/MyProjects";
import OrdersListView from "./components/orders/OrdersListView";
import { UserItem } from "@/interfaces/user";
import { MyBalanceItem } from "./actions/getUserPaymentData";
import UpdateUser from "./components/profile/UserUpdate";
import MyForest from "./components/my-forest/MyForest";
import WorkHeader from "@/components/ui/custom/WorkHeader";
import { Switch } from "@nextui-org/react";
import { useMutation, useQuery } from "react-query";
import { getUser, updateUser } from "@/request/worker/users/manageUsers";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import toast from "react-hot-toast";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import ClimateChengeImpact from "./components/CC-Impact/ClimateChengeImpact";
import MicroActionViewPage from "./components/micro-action/MicroActionViewPage";
import { MyProgramsList } from "./components/my-program/MyProgramsList";
import MyProgramsListView from "./components/my-program/myprogram";

function UserViewItem({ balance, id }: { balance: MyBalanceItem; id: string }) {
  const userData = useQuery({
    queryKey: [],
    queryFn: async () => {
      return await getUser(id || "");
    },
  });

  const update = useMutation({
    mutationFn: async (id: string) => {
      return await updateUser(id, {
        isBlocked: !user?.isBlocked,
      });
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Status updated successfully");
      userData.refetch();
    },
    onError: () => {
      toast.dismiss();
      toast.error("Something went wrong! Status not updated");
    },
  });

  if (userData.isLoading) {
    return (
      <div className="flex h-screen justify-center items-center ">
        <LoadingSpinner />
      </div>
    );
  }

  const user = userData.data;

  if (!user) {
    return (
      <div className="flex h-screen justify-center items-center ">
        <p>No User Found</p>
      </div>
    );
  }

  return (
    <div className="">
      <WorkHeader title={`${user?.user_type} Profile`}>
        <Link href={`/dashboard/user/${id}/print`} target="_blank">
          <Button size="sm">
            <Printer /> Print
          </Button>
        </Link>
        <div className="flex justify-end items-center gap-5">
          <p>Active/Inactive</p>
          <Switch
            isSelected={!user.isBlocked}
            onClick={(e) => {
              const confirm = window.confirm("Are You Sure?");
              if (confirm) {
                update.mutate(id);
              }
            }}
          />
        </div>
      </WorkHeader>
      <div className="w-full p-10">
        <Tabs defaultValue="wallet" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="wallet">
              My Balance
            </TabsTrigger>
            {user.user_type == "partner" && (
              <TabsTrigger className="w-full" value="project">
                Projects
              </TabsTrigger>
            )}

            <TabsTrigger className="w-full" value="forest">
              Forest
            </TabsTrigger>
            <TabsTrigger className="w-full" value="mica">
              Micro Action
            </TabsTrigger>
            <TabsTrigger className="w-full" value="programs">
              Programs
            </TabsTrigger>

            <TabsTrigger className="w-full" value="cci">
              Climate Change Impact
            </TabsTrigger>

            <TabsTrigger className="w-full" value="orders">
              Orders
            </TabsTrigger>
            <TabsTrigger className="w-full" value="profile">
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="wallet">
            <MyBalance
              balance={balance}
              user={user}
              onUpdate={userData.refetch}
            />
          </TabsContent>
          <TabsContent value="project">
            <MyProjectsList id={id || ""} />
          </TabsContent>
          <TabsContent value="forest">
            <MyForest user={user} />
          </TabsContent>
          <TabsContent value="orders">
            <OrdersListView user={user} />
          </TabsContent>
          <TabsContent value="mica">
            <MicroActionViewPage />
          </TabsContent>
          <TabsContent value="programs">
            <MyProgramsListView id={id || ""} />
          </TabsContent>
          <TabsContent value="cci">
            <ClimateChengeImpact />
          </TabsContent>
          <TabsContent value="profile">
            <UpdateUser profile={user as any} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default UserViewItem;
