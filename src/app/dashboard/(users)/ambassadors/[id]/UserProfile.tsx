"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { formatDateTimeFromString } from "@/helper/dateTime";
import { cn } from "@/lib/utils";
import { genPbFiles } from "@/request/actions";
import { getUser } from "@/request/worker/users/manageUsers";
import React from "react";
import { useQuery } from "react-query";

function UserProfile({ id }: { id: string }) {
  const userData = useQuery({
    queryKey: ["userData", id],
    queryFn: async () => {
      return await getUser(id);
    },
  });

  if (userData.isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <LoadingSpinner />
      </div>
    );
  }

  const user = userData.data;

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">User Profile</h1>
      <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <dt className="font-medium">User ID</dt>
          <dd>{user?.id || "N/A"}</dd>
        </div>
        <div>
          <dt className="font-medium">Avatar</dt>
          <dd>
            <Avatar>
              <AvatarImage
                className={cn(
                  "ring-2 ring-green-600 ring-offset-2",
                  user?.isBlocked && " ring-red-600 "
                )}
                src={genPbFiles(user, user?.avatar)}
              />
              <AvatarFallback>{user?.first_name[0]}</AvatarFallback>
            </Avatar>
          </dd>
        </div>
        <div>
          <dt className="font-medium">Full Name</dt>
          <dd>{user?.first_name + " " + user?.last_name || "N/A"}</dd>
        </div>
        <div>
          <dt className="font-medium">Gender</dt>
          <dd>{user?.gender || "N/A"}</dd>
        </div>
        <div>
          <dt className="font-medium">Country</dt>
          <dd>{user?.country || "N/A"}</dd>
        </div>
        <div>
          <dt className="font-medium">City</dt>
          <dd>{user?.city || "N/A"}</dd>
        </div>
        <div>
          <dt className="font-medium">Email</dt>
          <dd>{user?.email || "N/A"}</dd>
        </div>
        <div>
          <dt className="font-medium">Mobile Number</dt>
          <dd>{user?.mobile_no || "N/A"}</dd>
        </div>
        <div>
          <dt className="font-medium">Social Status</dt>
          <dd>{user?.socail_state?.replaceAll("_", " ") || "N/A"}</dd>
        </div>
        <div>
          <dt className="font-medium">User Type</dt>
          <dd className="capitalize">{user?.user_type || "N/A"}</dd>
        </div>
        <div>
          <dt className="font-medium">Tree Orders</dt>
          <dd>{user?.tree_orders?.length || 0}</dd>
        </div>
        <div>
          <dt className="font-medium">Account Created</dt>
          <dd>{formatDateTimeFromString(user?.created || "")}</dd>
        </div>
      </dl>
    </div>
  );
}

export default UserProfile;
