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

function FslpRequestsList() {
  const [gender, setGender] = useState("");
  const [eduState, setEduState] = useState("");
  const [dob, setDob] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [search, setSearch] = useState("");
  const [Status, setStatus] = useState("");

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
      filter.push(`application.dob='${dob}'`);
    }
    if (Status) {
      filter.push(`status='${Status}'`);
    }
    if (search) {
      filter.push(
        `application.firstName~'${search}' || application.mobileNo~'${search}' || application.emailID~'${search}' || id~'${search}' || application.universityName~'${search}' || application.universityName~'${search}'`
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
  }, [gender, eduState, from, to, search, dob, search, Status]);

  const educationalStatusArray = [
    "High School",
    "Bachelors Degree",
    "Masters Degree",
    "PhD",
    "Diploma",
    "Certificate",
    "Other",
  ];

  return (
    <div>
      <div className="flex justify-between items-center bg-gray-100">
        <Input
          className="w-72 bg-gray-100 border-none rounded-none"
          placeholder="Search.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex justify-end items-center">
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
            <Input
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-36 block bg-gray-100 border-none rounded-none"
              type="date"
            />
          </div>
          <div className="flex justify-center items-center">
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
          <Select value={Status} onValueChange={setStatus} disabled={loading}>
            <SelectTrigger className="w-[120px] font-normal h-8 border-none bg-gray-100">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="complete">Complete</SelectItem>
              <SelectItem value="cancel">Cancel</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="tableWrapper">
        <table className="tblView ">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>User Name</th>
              <th>Gender</th>
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
