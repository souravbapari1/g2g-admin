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
import { useState } from "react";
import { Collection } from "@/interfaces/collection";
import { getWeeklyReport } from "./function";
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import ReportView from "./ReportView";
import { MonthlyReportItem, Week } from "@/interfaces/monthlyReportItem";
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
function ReportList({ data }: { data: UserItem[] }) {
  if (data.length == 0) {
    return (
      <div className="w-full flex justify-center items-center h-[70vh]">
        <h1 className="font-bold text-lg">No Ambassadors found</h1>
      </div>
    );
  }
  const { month, year } = getCurrentDateData();
  const [selectUser, setUser] = useState(data[0].id);
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

  return (
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
        <div className="w-full   p-5">
          {reportData.isLoading && <p>Loading Report...</p>}
          {reportData.data?.items.length == 0 && <p>No report found</p>}
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
  );
}

export default ReportList;
