"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CityDropdown } from "@/components/ui/custom/city-dropdown";
import { CountryDropdown } from "@/components/ui/custom/country-dropdown";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { formatDateTimeFromString } from "@/helper/dateTime";
import { Collection } from "@/interfaces/collection";
import { UserItem } from "@/interfaces/user";
import { genPbFiles } from "@/request/actions";
import { getUsers, updateUser } from "@/request/worker/users/manageUsers";
import { Edit, Filter, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

export function AdminList() {
  const session = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Collection<UserItem>>();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<{
    country: string;
    city: string;
    gender: string;
    socialState: string;
    status: null | boolean;
    search: string;
  }>({
    country: "",
    city: "",
    gender: "",
    socialState: "",
    status: null,
    search: "",
  });

  const filterQuery = () => {
    let query = [];
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
    if (filter.status != null) {
      query.push(`isBlocked=${!filter.status}`);
    }
    query.push(`role='ADMIN' && user_type='individual'`);
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
            (item) => item.user_type === "individual" && item.role === "ADMIN"
          ),
        ],
      });
      setPage(page + 1);
    } else {
      const users = await getUsers(page, filterQuery());
      setData({
        ...users,
        items: users?.items.filter(
          (item) => item.user_type === "individual" && item.role === "ADMIN"
        ),
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    setPage(1);
    const timer = setTimeout(() => {
      loadData();
    }, 100);

    return () => clearTimeout(timer);
  }, [filter]);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  return (
    <div className="">
      <div className="w-full p-5 flex-col  flex justify-between items-center">
        <div className="w-full flex justify-between items-center mb-4">
          <Input
            placeholder="Search by name, email, phone"
            className="rounded-md border-none  bg-gray-100 w-96 "
            value={filter.search}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          />
          <Badge
            variant={!showFilter ? "secondary" : "destructive"}
            className="px-4 py-2.5 rounded cursor-pointer select-none"
            onClick={() => {
              // clear filter
              setFilter({
                search: "",
                country: "",
                city: "",
                gender: "",
                socialState: "",
                status: null,
              });

              setShowFilter(!showFilter);
            }}
          >
            <Filter size={10} className="mr-2" />
            {showFilter ? "Hide Filter" : "Filter"}
          </Badge>
        </div>
        {showFilter && (
          <div className="flex w-full  bg-gray-200 p-5 justify-center items-center gap-4">
            <CountryDropdown
              value={filter.country}
              onChange={(e) => setFilter({ ...filter, country: e })}
              className="rounded-md border-none  bg-white w-full "
            />
            <CityDropdown
              value={filter.city}
              onChange={(e) => setFilter({ ...filter, city: e })}
              country={filter.country}
              className="rounded-md border-none  bg-white w-full "
            />
            <Select
              defaultValue={filter.gender}
              onValueChange={(e) => setFilter({ ...filter, gender: e })}
            >
              <SelectTrigger className="rounded-md border-none  bg-white w-full">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
            <Select
              defaultValue={`${
                filter.status == null ? "" : filter.status ? "true" : "false"
              }`}
              onValueChange={(e) =>
                setFilter({ ...filter, status: e == "true" })
              }
            >
              <SelectTrigger className="rounded-md border-none  bg-white w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Active </SelectItem>
                <SelectItem value="false">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      <div className="tableWrapper">
        <table className="tblView ">
          <thead>
            <tr className="bg-gray-50 ">
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
              <th className="action">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.items.map((user) => (
              <AdminsListTr
                key={user.id}
                userData={user}
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
    </div>
  );
}

function AdminsListTr({
  userData,
  onUpdate,
}: {
  userData: UserItem;
  onUpdate?: (e: UserItem) => void;
}) {
  const [user, setUser] = useState(userData);
  const session = useSession();
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
        {user.id !== session.data?.user.id ? (
          <Switch onClick={() => mutate.mutate()} checked={!user.isBlocked} />
        ) : (
          "N/A"
        )}
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
      <td className="action">
        <Link href={`/dashboard/users/admins/update/${user.id}`}>
          <Button variant="secondary" size="sm">
            <Edit />
          </Button>
        </Link>
        {session.data?.user.id !== user.id && (
          <Button className="ml-3" variant="destructive" size="sm">
            <Trash />
          </Button>
        )}
      </td>
    </tr>
  );
}
