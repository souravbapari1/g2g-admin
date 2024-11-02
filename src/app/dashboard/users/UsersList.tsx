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
import { Collection } from "@/interfaces/collection";
import { UserItem } from "@/interfaces/user";
import { genPbFiles } from "@/request/actions";
import { getUsers } from "@/request/worker/users/manageUsers";
import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";

export function UsersList() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Collection<UserItem>>();
  const [page, setPage] = useState(1);

  const loadData = async (loadMore: boolean = false) => {
    setLoading(true);
    if (loadMore) {
      const users = await getUsers(page + 1, "(role='USER')");
      setData({
        ...users,
        items: [...data!.items, ...users?.items],
      });
      setPage(page + 1);
    } else {
      const users = await getUsers(page, "(role='USER')");
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
    <div className="">
      <Table className=" overflow-auto capitalize border">
        <TableHeader>
          <TableRow className="bg-gray-100 ">
            <TableHead className="border-r text-center w-[100px]">
              Image
            </TableHead>
            <TableHead className="border-r text-center">Name</TableHead>
            <TableHead className="border-r text-center">Gender</TableHead>
            <TableHead className="border-r text-center">Country</TableHead>
            <TableHead className="border-r text-center">City</TableHead>
            <TableHead className="border-r text-center">Email Id</TableHead>
            <TableHead className="border-r text-center">Phone No</TableHead>
            <TableHead className="border-r text-center">
              Number of orders
            </TableHead>
            <TableHead className="text-center">Type of user</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.items.map((user) => (
            <TableRow key={user.email}>
              <TableCell className="w-[100px] border-r">
                <Avatar>
                  <AvatarImage src={genPbFiles(user, user.avatar)} />
                  <AvatarFallback>{user.first_name[0]}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="text-center border-r">
                {user.first_name + " " + user.last_name}
              </TableCell>
              <TableCell className="text-center border-r">
                {user.gender || "N/A"}
              </TableCell>
              <TableCell className="text-center border-r">
                {user.country || "N/A"}
              </TableCell>
              <TableCell className="text-center border-r">
                {user.city || "N/A"}
              </TableCell>
              <TableCell className="text-center border-r">
                {user.email || "N/A"}
              </TableCell>
              <TableCell className="text-center border-r">
                {user.mobile_no || "N/A"}
              </TableCell>
              <TableCell className="text-center border-r">
                {user.tree_orders?.length || 0}
              </TableCell>
              <TableCell className="text-center">{user.user_type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
