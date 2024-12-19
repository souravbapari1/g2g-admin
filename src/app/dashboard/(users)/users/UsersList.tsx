"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDateTimeFromString } from "@/helper/dateTime";
import { Collection } from "@/interfaces/collection";
import { UserItem } from "@/interfaces/user";
import { cn } from "@/lib/utils";
import { genPbFiles } from "@/request/actions";
import { getUsers } from "@/request/worker/users/manageUsers";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function UsersList() {
  const [filter, setFilter] = useState({
    country: "",
    city: "",
    gender: "",
    socialState: "",
    level: "",
    search: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Collection<UserItem>>();
  const [page, setPage] = useState(1);
  const [userState, setUserState] = useState("all");

  const filterQuery = () => {
    let query = [];
    if (userState === "active") {
      query.push(`isBlocked=false`);
    } else if (userState === "inactive") {
      query.push(`isBlocked=true`);
    }
    if (filter.search) {
      query.push(
        `first_name~'${filter.search}' || last_name~'${filter.search}' || email~'${filter.search}' || mobile_no~'${filter.search}'`
      );
    }
    if (filter.country) {
      query.push(`country='${filter.country}'`);
    }
    if (filter.city) {
      query.push(`city='${filter.city}'`);
    }
    if (filter.gender) {
      query.push(`gender='${filter.gender}'`);
    }
    if (filter.socialState) {
      query.push(`social_state='${filter.socialState}'`);
    }
    if (filter.level) {
      query.push(`level='${filter.level}'`);
    }
    query.push(`role='USER' && user_type='individual'`);
    return query.join(" && ");
  };

  const loadData = async (loadMore: boolean = false) => {
    setLoading(true);
    if (loadMore) {
      const users = await getUsers(page + 1, filterQuery());

      setData({
        ...users,
        items: [
          ...data!.items,
          ...users?.items.filter(
            (item) => item.user_type === "individual" && item.role === "USER"
          ),
        ],
      });
      setPage(page + 1);
    } else {
      const users = await getUsers(page, filterQuery());
      setData({
        ...users,
        items: users?.items.filter(
          (item) => item.user_type === "individual" && item.role === "USER"
        ),
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    setPage(1);
    loadData();
  }, [userState, filter]);

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
      <div className="w-full bg-gray-100 flex justify-between items-center">
        <Input
          placeholder="Search by name, email, phone"
          className="rounded-none border-none"
          value={filter.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
        />
        <CountryDropdown
          value={filter.country}
          onChange={(e) => setFilter({ ...filter, country: e })}
          className="rounded-none border-none w-[200px]"
        />
        <CityDropdown
          value={filter.city}
          onChange={(e) => setFilter({ ...filter, city: e })}
          country={filter.country}
          className="rounded-none border-none w-[200px]"
        />
        <Select
          defaultValue={filter.gender}
          onValueChange={(e) => setFilter({ ...filter, gender: e })}
        >
          <SelectTrigger className="rounded-none border-none w-[200px]">
            <SelectValue placeholder="Select Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectContent>
        </Select>
        <Select
          defaultValue={filter.socialState}
          onValueChange={(e) => setFilter({ ...filter, socialState: e })}
        >
          <SelectTrigger className="rounded-none border-none w-[200px]">
            <SelectValue placeholder="Social State" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="student">Student</SelectItem>
            <SelectItem value="graduated">Graduated</SelectItem>
            <SelectItem value="job seeker">Job Seeker</SelectItem>
            <SelectItem value="private sector employee">
              Privet sector emolpyee
            </SelectItem>
            <SelectItem value="gov">gov</SelectItem>
          </SelectContent>
        </Select>
        <Select
          defaultValue={filter.level}
          onValueChange={(e) => setFilter({ ...filter, level: e })}
        >
          <SelectTrigger className="rounded-none border-none w-[200px]">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="positive 1">Positive 1</SelectItem>
            <SelectItem value="positive 2">Positive 2</SelectItem>
            <SelectItem value="positive 3">Positive 3</SelectItem>
            <SelectItem value="positive 4">Positive 4</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="tableWrapper">
        <table className="tblView">
          <thead>
            <tr>
              <th>User Id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Country</th>
              <th>City</th>
              <th>Email Id</th>
              <th>Phone No</th>
              <th>Social State</th>
              <th>User Type</th>
              <th>No. of Trees</th>
              <th>No. of orders</th>
              <th>Total Amount</th>
              <th>Level</th>
              <th>Location</th>
              <th>Registered Date</th>
              <th>Last Login</th>
              <th className="action">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.items.map((user) => (
              <UsersListTr user={user} key={user.id} />
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

import { CountryDropdown } from "@/components/ui/custom/country-dropdown";
import { Input } from "@/components/ui/input";
import { useQuery } from "react-query";
import { getUserStatus } from "../partners/view/[id]/actions";
import { CityDropdown } from "@/components/ui/custom/city-dropdown";

function UsersListTr({ user }: { user: UserItem }) {
  const data = useQuery({
    queryKey: [user.id],
    queryFn: async () => {
      return await getUserStatus(user.id);
    },
  });
  return (
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
      <td className="text-center">{data.data?.totalTrees || 0}</td>
      <td className="text-center">
        {(user.tree_orders?.length || 0) + (data.data?.totalOthers || 0)}
      </td>
      <td className="text-center">{data.data?.totalAmount || "--"}</td>
      <td className="capitalize text-center">{user.level || "N/A"}</td>
      <td className="capitalize text-center">
        {user.location ? (
          <Link href={user.location}>View Location</Link>
        ) : (
          "N/A"
        )}
      </td>

      <td>{formatDateTimeFromString(user.created)}</td>
      <td>
        {user.lastLogin
          ? formatDateTimeFromString(user.lastLogin || "")
          : "N/A"}
      </td>

      <td className="action">
        <Link href={`/dashboard/user/${user.id}`}>
          <Button size="sm">View</Button>
        </Link>
      </td>
    </tr>
  );
}
