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

        <div className="flex justify-end items-end">
          {filterData() && (
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
              }}
            >
              <Badge
                variant="destructive"
                className="rounded-none cursor-pointer"
              >
                Clear Filter
              </Badge>
            </div>
          )}
        </div>
        <div className="flex justify-between flex-wrap items-center bg-gray-100">
          <Input
            className="w-full bg-gray-100 border-none rounded-none"
            placeholder="Search.."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex justify-between items-center w-full">
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger className="w-[120px] bg-gray-100 border-none rounded-none">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>

            <Select value={eduState} onValueChange={setEduState}>
              <SelectTrigger className="w-[160px] bg-gray-100 border-none rounded-none">
                <SelectValue placeholder="Eduicational State" />
              </SelectTrigger>
              <SelectContent>
                {educationalStatusArray.map((item) => (
                  <SelectItem value={item}>{item}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex justify-center items-center">
              <p className="text-xs">DOB:</p>{" "}
              <div className="flex justify-center items-center">
                <Select value={dob} onValueChange={setDob}>
                  <SelectTrigger className="w-20  bg-gray-100 border-none rounded-none">
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
            <div className="flex justify-center  items-center">
              <p className="text-xs">From:</p>{" "}
              <Input
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-36 block bg-gray-100 border-none rounded-none"
                type="date"
              />
            </div>
            <div className="flex justify-center items-center">
              <p className="text-xs">To:</p>{" "}
              <Input
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-36 block bg-gray-100 border-none rounded-none"
                type="date"
              />
            </div>

            <div className="flex justify-center items-center gap-4 mr-5">
              <p className="text-xs">Is Ambassadors</p>
              <Checkbox checked={isAmb} onClick={() => setIsAmb(!isAmb)} />
            </div>
          </div>
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
