"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Switch } from "@/components/ui/switch";
import { formatDateTimeFromString } from "@/helper/dateTime";
import { Collection } from "@/interfaces/collection";
import { UserItem } from "@/interfaces/user";
import { extractErrors, genPbFiles } from "@/request/actions";
import {
  deleteUser,
  getUsers,
  updateUser,
} from "@/request/worker/users/manageUsers";
import { Edit, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

export function ManagersList() {
  const session = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Collection<UserItem>>();
  const [page, setPage] = useState(1);

  const loadData = async (loadMore: boolean = false) => {
    setLoading(true);
    if (loadMore) {
      const users = await getUsers(page + 1, "(role='MANAGER')");
      setData({
        ...users,
        items: [...data!.items, ...users?.items],
      });
      setPage(page + 1);
    } else {
      const users = await getUsers(page, "(role='MANAGER')");
      setData(users);
    }
    setLoading(false);
  };

  useEffect(() => {
    setPage(1);
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="tableWrapper">
      <table className="tblView ">
        <thead>
          <tr className="bg-gray-100 ">
            <th className="w-5">Image</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Country</th>
            <th>Email Id</th>
            <th>Phone No</th>
            <th>Last Login</th>
            <th>Status</th>
            <th>Location</th>
            <th>Position</th>
            <th>Department</th>
            <th className="action">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.items.map((user) => (
            <ManagersListTr
              key={user.id}
              userData={user}
              onDelete={() => {
                setData({
                  ...data,
                  items: data?.items.filter((u) => u.id !== user.id),
                });
              }}
              onUpdate={(e) => {
                setData({
                  ...data,
                  items: data?.items.map((u) => {
                    if (u.id === e.id) {
                      return e;
                    }
                    return u;
                  }),
                });
              }}
            />
          ))}
        </tbody>
      </table>

      <div className="flex justify-center items-center mt-10">
        {loading && <LoadingSpinner />}
        {!loading && data && data?.totalPages > data?.page && (
          <Button variant="secondary" onClick={() => loadData(true)}>
            Load More
          </Button>
        )}
      </div>
    </div>
  );
}

function ManagersListTr({
  userData,
  onUpdate,
  onDelete,
}: {
  userData: UserItem;
  onUpdate?: (e: UserItem) => void;
  onDelete?: () => void;
}) {
  const [user, setUser] = useState(userData);
  const session = useSession();

  const deleteMutate = useMutation({
    mutationKey: ["deleteUser", "user", user.id],
    mutationFn: async (id: string) => {
      return await deleteUser(id);
    },
    onSuccess(data, variables, context) {
      toast.dismiss();
      toast.success("New User Delete successfully");
      onDelete?.();
    },
    onError(error: any, variables, context) {
      toast.dismiss();
      const errors = extractErrors(error?.response);
      toast.error("Error! " + errors[0]);
    },
  });

  const mutate = useMutation({
    mutationKey: ["updateStatus", user.id],
    mutationFn: async () => {
      return await updateUser(user.id, {
        isBlocked: !user?.isBlocked,
      });
    },
    onSuccess: (data) => {
      toast.dismiss();
      toast.success("Status updated successfully");
      setUser(data);
      onUpdate?.(data);
    },
    onError: () => {
      toast.dismiss();
      toast.error("Something went wrong! Status not updated");
    },
  });
  return (
    <tr key={user.id + user.email}>
      <td className="w-5">
        <Avatar>
          <AvatarImage src={genPbFiles(user, user.avatar)} />
          <AvatarFallback>{user.first_name[0]}</AvatarFallback>
        </Avatar>
      </td>
      <td>{user.first_name + " " + user.last_name}</td>
      <td>{user.gender || "N/A"}</td>
      <td>{user.country || "N/A"}</td>
      <td>{user.email || "N/A"}</td>
      <td>{user.mobile_no || "N/A"}</td>
      <td>
        {user.lastLogin ? formatDateTimeFromString(user.lastLogin) : "N/A"}
      </td>
      <td>
        <Switch onClick={() => mutate.mutate()} checked={!user.isBlocked} />
      </td>
      <td>
        <Link
          href={user.location || "#"}
          target={user.location ? "_blank" : "_self"}
          className="text-primary"
        >
          View Location
        </Link>
      </td>
      <td>{user.position || "N/A"}</td>
      <td>{user.dpartements?.join(", ") || "N/A"}</td>

      <td className="action">
        <Link href={`/dashboard/users/manager/update/${user.id}`}>
          <Button variant="secondary" size="sm">
            <Edit />
          </Button>
        </Link>
        {session.data?.user.id !== user.id && (
          <Button
            onClick={() => {
              const result = confirm(
                "Are you sure you want to delete this user?"
              );
              if (result) {
                deleteMutate.mutate(user.id);
              }
            }}
            className="ml-3"
            variant="destructive"
            size="sm"
          >
            <Trash />
          </Button>
        )}
      </td>
    </tr>
  );
}
