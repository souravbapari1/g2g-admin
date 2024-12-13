"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTimeFromString } from "@/helper/dateTime";
import { Collection } from "@/interfaces/collection";
import { UserItem } from "@/interfaces/user";
import { cn } from "@/lib/utils";
import { genPbFiles } from "@/request/actions";
import { getUsers } from "@/request/worker/users/manageUsers";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { use, useEffect, useState } from "react";

export function UsersList() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Collection<UserItem>>();
  const [page, setPage] = useState(1);
  const [userState, setUserState] = useState("all");

  const filterQuery = () => {
    let query = [`role='USER' && user_type='individual'`];
    if (userState === "active") {
      query.push(`isBlocked=false`);
    } else if (userState === "inactive") {
      query.push(`isBlocked=true`);
    }
    return query.join(" && ");
  };

  const loadData = async (loadMore: boolean = false) => {
    setLoading(true);
    if (loadMore) {
      const users = await getUsers(page + 1, filterQuery());
      setData({
        ...users,
        items: [...data!.items, ...users?.items],
      });
      setPage(page + 1);
    } else {
      const users = await getUsers(page, filterQuery());
      setData(users);
    }
    setLoading(false);
  };

  useEffect(() => {
    setPage(1);
    loadData();
  }, [userState]);

  if (!data && !loading) {
    return <p className="text-center text-gray-500 p-5">No data available</p>;
  }
  const activeClass = (active: boolean) => {
    if (!active) {
      return `border-white`;
    }
    return `border-green-600 text-green-600`;
  };
  return (
    <div className="">
      <div className="w-full mt-1 border-b flex justify-between   select-none">
        <div className="flex w-full">
          <div
            onClick={() => setUserState("all")}
            className={cn(
              "border-b-2 cursor-pointer max-w-36 w-full text-center py-2",
              activeClass(userState === "all")
            )}
          >
            <p className="font-bold ">All</p>
          </div>
          <div
            onClick={() => setUserState("active")}
            className={cn(
              "border-b-2 cursor-pointer max-w-36 w-full text-center py-2",
              activeClass(userState === "active")
            )}
          >
            <p className="font-bold ">Active</p>
          </div>
          <div
            onClick={() => setUserState("inactive")}
            className={cn(
              "border-b-2 cursor-pointer max-w-36 w-full text-center py-2",
              activeClass(userState === "inactive")
            )}
          >
            <p className="font-bold ">InActive</p>
          </div>
        </div>
      </div>

      <div className="tableWrapper">
        <table className="tblView">
          <thead>
            <tr>
              <th>User Id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Country</th>
              <th>City</th>
              <th>Gender</th>
              <th>Email Id</th>
              <th>Phone No</th>
              <th>Social State</th>
              <th>User Type</th>
              <th>Number of orders</th>
              <th>Registered Date </th>
              <th className="action">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.items.map((user) => (
              <tr key={user.email}>
                <td>{user.id || "N/A"}</td>
                <td>
                  <Avatar
                    className={cn(
                      "ring-2 ring-green-600 ring-offset-2",
                      user.isBlocked && " ring-red-600 "
                    )}
                  >
                    <AvatarImage src={genPbFiles(user, user.avatar)} />
                    <AvatarFallback>{user.first_name[0]}</AvatarFallback>
                  </Avatar>
                </td>
                <td>{user.first_name + " " + user.last_name}</td>
                <td>{user.gender || "N/A"}</td>
                <td>{user.country || "N/A"}</td>
                <td>{user.city || "N/A"}</td>
                <td>{user.email || "N/A"}</td>
                <td>{user.mobile_no || "N/A"}</td>
                <td>{user.socail_state.replaceAll("_", " ") || "N/A"}</td>
                <td className="capitalize">{user.user_type}</td>
                <td className="text-center">{user.tree_orders?.length || 0}</td>
                <td>{formatDateTimeFromString(user.created)}</td>
                <td className="action">
                  <Link href={`/dashboard/users/${user.id}`}>
                    <Button size="sm">View</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full text-center">
        {loading && <p className="text-center mt-32">Loading...</p>}
        {!loading && data && data?.totalPages > data?.page && (
          <button onClick={() => loadData(true)}>Load More</button>
        )}
      </div>
    </div>
  );
}
