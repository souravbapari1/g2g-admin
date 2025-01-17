"use client";

import { UserItem } from "@/interfaces/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { client, genPbFiles } from "@/request/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Collection } from "@/interfaces/collection";
import { getWeeklyReport } from "./function";
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import ReportView from "./ReportView";
import { MonthlyReportItem, Week } from "@/interfaces/monthlyReportItem";
import { Input } from "@/components/ui/input";
import { CountryDropdown } from "@/components/ui/custom/country-dropdown";
import { CityDropdown } from "@/components/ui/custom/city-dropdown";
import NoReport from "./NoReport";
function getCurrentDateData(): { year: string; month: number } {
  const currentDate = new Date(); // Get the current date
  const year = currentDate.getFullYear().toString(); // Extract year as string
  const month = currentDate.getMonth(); // Extract month (1-based)

  return {
    year,
    month,
  };
}
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
function ReportList({ users }: { users: UserItem[] }) {
  const [data, setData] = useState(users);

  const { month, year } = getCurrentDateData();
  const [selectUser, setUser] = useState("");
  const [selectMonth, setSelectMonth] = useState(month);
  const [selectYear, setYear] = useState(year);
  const [week, setWeek] = useState("week1");

  const reportData = useQuery(["report", selectUser, selectMonth, selectYear], {
    queryFn: () => getWeeklyReport(selectUser, selectYear, months[selectMonth]),
    onError(err) {
      console.log(err);
      toast.error("Something went wrong! Load failed ");
    },
  });

  const [filter, setFilter] = useState({
    search: "",
    country: "",
    city: "",
    gender: "",
    socialState: "",
  });

  const applyFilter = (data: UserItem[] | undefined) => {
    if (!data) return [];

    return data.filter(
      (item) =>
        (filter.search === "" ||
          item.mobile_no?.toLowerCase().includes(filter.search.toLowerCase()) ||
          item.email?.toLowerCase().includes(filter.search.toLowerCase()) ||
          item.first_name
            ?.toLowerCase()
            .includes(filter.search.toLowerCase()) ||
          item.last_name?.toLowerCase().includes(filter.search.toLowerCase()) ||
          item.id?.toLowerCase().includes(filter.search.toLowerCase())) &&
        (filter.country === "" ||
          item.country?.toLowerCase() === filter.country.toLowerCase()) &&
        (filter.city === "" ||
          item.city?.toLowerCase() === filter.city.toLowerCase()) &&
        (filter.gender === "" ||
          item.gender?.toLowerCase() === filter.gender.toLowerCase()) &&
        (filter.socialState === "" ||
          item.socail_state?.toLowerCase() === filter.socialState.toLowerCase())
    );
  };

  useEffect(() => {
    const second = setTimeout(() => {
      setData(applyFilter(users));
    }, 100);
    return () => clearTimeout(second);
  }, [filter]);

  return (
    <div className="">
      <div className="w-full bg-gray-100 flex justify-between items-center">
        <Input
          placeholder="Search by name, email, phone"
          className="rounded-none border-none bg-transparent"
          value={filter.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
        />
        <CountryDropdown
          value={filter.country}
          onChange={(e) => setFilter({ ...filter, country: e })}
          className="rounded-none border-none w-[200px] bg-transparent"
        />
        <CityDropdown
          value={filter.city}
          onChange={(e) => setFilter({ ...filter, city: e })}
          country={filter.country}
          className="rounded-none border-none w-[200px] bg-transparent"
        />
        <Select
          defaultValue={filter.gender}
          onValueChange={(e) => setFilter({ ...filter, gender: e })}
        >
          <SelectTrigger className="rounded-none border-none w-[200px] bg-transparent">
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
          <SelectTrigger className="rounded-none border-none w-[200px] bg-transparent ">
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
        {/* <Select
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
        </Select> */}
      </div>
      <div className="flex gap-3 p-5">
        <div className="w-80 h-full max-h-[88vh] border sticky top-20 hide-scroll overflow-auto flex flex-col gap-1 bg-gray-100 p-3 rounded-lg">
          {data.map((user) => (
            <div
              key={user.id}
              onClick={() => setUser(user.id)}
              className={cn(
                "w-full py-3  bg-gray-100  rounded-lg flex gap-3 justify-start px-2 cursor-pointer select-none items-center",
                user.id === selectUser ? "bg-white shadow-sm" : ""
              )}
            >
              <Avatar>
                <AvatarImage src={genPbFiles(user, user.avatar)} />
                <AvatarFallback>{user.first_name.split("")[0]}</AvatarFallback>
              </Avatar>
              <p className="font-bold">
                {user.first_name} {user.last_name}
              </p>
            </div>
          ))}
        </div>
        <div className="w-full">
          <div className="flex justify-start items-center gap-3">
            <Select onValueChange={setYear} value={selectYear}>
              <SelectTrigger className="w-[120px]  border bg-gray-100">
                <SelectValue placeholder={year} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2026">2026</SelectItem>
              </SelectContent>
            </Select>
            <Select
              onValueChange={(e) => setSelectMonth(Number(e))}
              value={selectMonth.toString()}
            >
              <SelectTrigger className="w-[120px] border bg-gray-100">
                <SelectValue placeholder={year} />
              </SelectTrigger>
              <SelectContent>
                {months.map((month, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Tabs
              defaultValue="week1"
              className="border rounded-md overflow-hidden"
              onValueChange={setWeek}
              value={week}
            >
              <TabsList>
                <TabsTrigger value="week1">Week 1</TabsTrigger>
                <TabsTrigger value="week2">Week 2</TabsTrigger>
                <TabsTrigger value="week3">Week 3</TabsTrigger>
                <TabsTrigger value="week4">Week 4</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="w-full py-5">
            {reportData.isLoading && <p>Loading Report...</p>}
            {reportData.data?.items.length == 0 && (
              <NoReport
                month={months[month]}
                week={week}
                year={year}
                user={selectUser}
              />
            )}
            {reportData.isLoading == false &&
              reportData.data?.items.length != 0 && (
                <ReportView
                  data={reportData.data!.items[0]}
                  week={
                    reportData.data!.items[0][
                      week as keyof MonthlyReportItem
                    ] as Week
                  }
                  name={week}
                />
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportList;
