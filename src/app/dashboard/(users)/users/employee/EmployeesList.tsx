"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { extractErrors, genPbFiles } from "@/request/actions";
import {
  deleteUser,
  getUsers,
  updateUser,
} from "@/request/worker/users/manageUsers";
import { Edit, Filter, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { dipartements } from "../manager/new/NewManagerForm";
import { Badge } from "@/components/ui/badge";

export function EmployeeList() {
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
    dpartements: string;
  }>({
    country: "",
    city: "",
    gender: "",
    socialState: "",
    status: null,
    search: "",
    dpartements: "",
  });
  const filterQuery = () => {
    let query = [];
    if (filter.search) {
      query.push(
        `first_name~'${filter.search}' || last_name~'${filter.search}' || email~'${filter.search}' || mobile_no~'${filter.search}' || position~'${filter.search}' `
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
    if (filter.dpartements) {
      query.push(`dpartements~'${filter.dpartements}'`);
    }
    query.push(`role='EMPLOYEE' && user_type='individual'`);
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
            (item) =>
              item.user_type === "individual" && item.role === "EMPLOYEE"
          ),
        ],
      });
      setPage(page + 1);
    } else {
      const users = await getUsers(page, filterQuery());
      setData({
        ...users,
        items: users?.items.filter(
          (item) => item.user_type === "individual" && item.role === "EMPLOYEE"
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
      <div className="w-full bg-white p-5 flex flex-col justify-between items-center">
        <div className="w-full flex justify-between items-center">
          <Input
            placeholder="Search by name, email, phone"
            className="rounded-md border-none bg-gray-100 w-96"
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
                dpartements: "",
              });
              setShowFilter(!showFilter);
            }}
          >
            <Filter size={10} className="mr-2" />
            {showFilter ? "Hide Filter" : "Filter"}
          </Badge>
        </div>
        {showFilter && (
          <div className="flex justify-between items-center bg-gray-200 p-5 rounded-md gap-5 w-full mt-4">
            <CountryDropdown
              value={filter.country}
              onChange={(e) => setFilter({ ...filter, country: e })}
              className="rounded-md border-none w-full bg-white "
            />
            <CityDropdown
              value={filter.city}
              onChange={(e) => setFilter({ ...filter, city: e })}
              country={filter.country}
              className="rounded-md border-none w-full  bg-white"
            />
            <Select
              defaultValue={filter.gender}
              onValueChange={(e) => setFilter({ ...filter, gender: e })}
            >
              <SelectTrigger className="rounded-md border-none w-full ">
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
              <SelectTrigger className="rounded-md border-none w-full ">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Active </SelectItem>
                <SelectItem value="false">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Select
              defaultValue={`${filter.dpartements}`}
              onValueChange={(e) => setFilter({ ...filter, dpartements: e })}
            >
              <SelectTrigger className="rounded-md border-none w-full ">
                <SelectValue placeholder="Departments" />
              </SelectTrigger>
              <SelectContent>
                {dipartements?.map((dpartement) => (
                  <SelectItem value={dpartement.value}>
                    {dpartement.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      <div className="tableWrapper">
        <table className="tblView table-fixed">
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
              <EmployeeListTr
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
    </div>
  );
}

function EmployeeListTr({
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
        <Link href={`/dashboard/users/employee/update/${user.id}`}>
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
