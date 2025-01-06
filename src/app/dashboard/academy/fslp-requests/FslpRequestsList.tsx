"use client";
import React, { useEffect, useState } from "react";
import { getFslpRequests } from "./fslpFunctions";
import { Collection } from "@/interfaces/collection";
import { FSLPItem } from "./fslp";
import { formatDateTimeFromString } from "@/helper/dateTime";
import { genPbFiles } from "@/request/actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FslpItem from "./FslpItem";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter } from "lucide-react";

function FslpRequestsList() {
  const [gender, setGender] = useState("");
  const [eduState, setEduState] = useState("");
  const [dob, setDob] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [search, setSearch] = useState("");
  const [Status, setStatus] = useState("pending");
  const [isAmb, setIsAmb] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Collection<FSLPItem>>();
  const [showFilter, setSetShowFilter] = useState(false);

  const loadData = async (data: { loadMore?: boolean }) => {
    setLoading(true);
    if (data.loadMore) {
      const response = await getFslpRequests(page + 1, filterData());
      setPage(page + 1);
      setData((prev) => {
        return {
          ...response,
          items: [...(prev?.items || []), ...response.items],
        };
      });
    } else {
      const response = await getFslpRequests(1, filterData());
      setData(response);
    }
    setLoading(false);
  };

  const filterData = () => {
    const filter: string[] = [];
    if (gender) {
      filter.push(`application.gender='${gender}'`);
    }
    if (eduState) {
      filter.push(`application.eduState='${eduState}'`);
    }
    if (from) {
      filter.push(`created>='${from}'`);
    }
    if (to) {
      filter.push(`created<='${to}'`);
    }
    if (dob) {
      filter.push(`application.dob~'${dob}'`);
    }
    if (Status) {
      filter.push(`status='${Status}'`);
    }
    if (isAmb) {
      filter.push(`user.user_type=${isAmb}`);
    }
    if (search) {
      filter.push(
        `application.firstName~'${search}' || application.mobileNo~'${search}' || application.emailID~'${search}' || id~'${search}' || application.universityName~'${search}' || application.universityName~'${search}' || application.nationality~'${search}' `
      );
    }
    return filter.length > 0 ? `(${filter.join(" && ")})` : "";
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData({ loadMore: false });
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [gender, eduState, from, to, search, dob, search, Status, isAmb]);

  const educationalStatusArray = [
    "High School",
    "Bachelors Degree",
    "Masters Degree",
    "PhD",
    "Diploma",
    "Certificate",
    "Other",
  ];

  function generateYearsList(startYear: number): number[] {
    const currentYear = new Date().getFullYear(); // Get the current year
    const yearsList: number[] = [];

    for (let year = startYear; year <= currentYear; year++) {
      yearsList.push(year); // Add each year to the array
    }

    return yearsList;
  }

  return (
    <div>
      <div className="w-full ">
        <div className="px-5">
          <Tabs value={Status} onValueChange={setStatus} className="w-full">
            <TabsList>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="complete">Complete</TabsTrigger>
              <TabsTrigger value="cancel">Cancel</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex justify-between flex-wrap items-center bg-white p-5">
          <div className="w-full flex justify-between items-center">
            <Input
              className="w-96 bg-gray-100 border-none rounded-md"
              placeholder="Search.."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="flex justify-center items-center gap-2 mr-5">
              <div className="flex justify-center items-center gap-3 mr-5 bg-gray-100 p-2 px-5  rounded-md">
                <p className="text-xs">Only Ambassadors</p>
                <Switch checked={isAmb} onClick={() => setIsAmb(!isAmb)} />
              </div>
              <div
                className="flex justify-end items-end"
                onClick={() => {
                  setGender("");
                  setEduState("");
                  setDob("");
                  setFrom("");
                  setTo("");
                  setStatus("");
                  setSearch("");
                  setIsAmb(false);
                  setSetShowFilter(!showFilter);
                }}
              >
                <Badge
                  variant={showFilter ? "destructive" : "secondary"}
                  className="rounded-md cursor-pointer h-8 px-5 flex gap-2  items-center justify-between"
                >
                  <Filter size={10} /> {showFilter ? "Hide Filter" : "Filter"}
                </Badge>
              </div>
            </div>
          </div>
          {showFilter && (
            <div className="flex justify-between items-center w-full gap-4 mt-4 bg-gray-200 p-5 rounded-md">
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="w-full bg-white border-none rounded-md">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>

              <Select value={eduState} onValueChange={setEduState}>
                <SelectTrigger className="w-full bg-white border-none rounded-md">
                  <SelectValue placeholder="Eduicational State" />
                </SelectTrigger>
                <SelectContent>
                  {educationalStatusArray.map((item) => (
                    <SelectItem value={item}>{item}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex justify-center items-center w-full bg-white px-5 rounded-md">
                <p className="text-xs">DOB:</p>{" "}
                <div className="flex justify-center w-full items-center">
                  <Select value={dob} onValueChange={setDob}>
                    <SelectTrigger className="w-full   bg-white border-none rounded-md">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {generateYearsList(1950).map((item) => (
                        <SelectItem value={item.toString()}>{item}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-center  items-center w-full bg-white px-5 rounded-md">
                <p className="text-xs">From:</p>{" "}
                <Input
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full block bg-white border-none rounded-md"
                  type="date"
                />
              </div>
              <div className="flex justify-center items-center bg-white px-5 rounded-md w-full">
                <p className="text-xs">To:</p>{" "}
                <Input
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full block bg-white border-none rounded-md"
                  type="date"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="tableWrapper">
        <table className="tblView ">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>User Name</th>
              <th>Gender</th>
              <th>User Type</th>
              <th>Phone No</th>
              <th>Email ID</th>
              <th>Eduicational State</th>
              <th>Nationality</th>
              <th>School/University</th>
              <th>DOB</th>
              <th>country</th>
              <th>City</th>
              <th>Status</th>
              <th>Short Breif</th>
              <th>Application Date</th>
              <th>CV</th>
              <th>Last Update</th>
              <th>Update By</th>
              <th>Review Note</th>
              <th className="action">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.items.map((item) => (
              <FslpItem
                item={item}
                key={item.id}
                onUpdate={(e) => {
                  if (data) {
                    setData({
                      ...data,
                      items: data?.items.map((item) => {
                        if (item.id === e.id) {
                          return e;
                        }
                        return item;
                      }),
                    });
                  }
                }}
              />
            ))}
          </tbody>
        </table>
      </div>
      <p>{loading && "Loading..."}</p>
      <div className="mx-auto w-full flex justify-center items-center my-5">
        {(data?.totalPages || 0) > (data?.page || 0) && (
          <Button
            size="sm"
            disabled={loading}
            onClick={() => loadData({ loadMore: true })}
          >
            {" "}
            Load More{" "}
          </Button>
        )}
      </div>
    </div>
  );
}

export default FslpRequestsList;
