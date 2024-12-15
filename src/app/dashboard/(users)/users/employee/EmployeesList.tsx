"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Switch } from "@/components/ui/switch";
import { Collection } from "@/interfaces/collection";
import { UserItem } from "@/interfaces/user";
import { genPbFiles } from "@/request/actions";
import { getUsers } from "@/request/worker/users/manageUsers";
import { Edit, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function EmployeesList() {
  const session = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Collection<UserItem>>();
  const [page, setPage] = useState(1);

  const loadData = async (loadMore: boolean = false) => {
    setLoading(true);
    if (loadMore) {
      const users = await getUsers(page + 1, "(role='EMPLOYEE')");
      setData({
        ...users,
        items: [...data!.items, ...users?.items],
      });
      setPage(page + 1);
    } else {
      const users = await getUsers(page, "(role='EMPLOYEE')");
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
      <table className="tblView table-fixed">
        <thead>
          <tr className="bg-gray-100 ">
            <th>Image</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Country</th>

            <th>Email Id</th>
            <th>Phone No</th>
            <th>Last Login</th>
            <th>Status</th>
            <th className="action">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.items.map((user) => (
            <tr key={user.email}>
              <td>
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
              <td>{user.lastLogin || "N/A"}</td>
              <td>
                <Switch />
              </td>
              <td className="action">
                <Button variant="secondary" size="sm">
                  <Edit />
                </Button>
                {session.data?.user.id !== user.id && (
                  <Button className="ml-3" variant="destructive" size="sm">
                    <Trash />
                  </Button>
                )}
              </td>
            </tr>
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
