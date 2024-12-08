"use client";
import { Collection } from "@/interfaces/collection";
import React, { useEffect, useState } from "react";
import { AcademicRequestsItem } from "./AcademicRequests";
import { AcademicNameData, getRequests } from "./manageRequests";
import { formatDateTimeFromString } from "@/helper/dateTime";
import { Button } from "@/components/ui/button";
import AcademicsItem from "./AcademicsItem";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGlobalDataSetContext } from "@/components/context/globalDataSetContext";
import { useCallback } from "react";
import { ComboboxUser } from "@/components/ui/custom/comb-box-users";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

function AcademicsList({ academics }: { academics: AcademicNameData }) {
  const { countryCityListGlobal } = useGlobalDataSetContext();
  const [data, setData] = useState<Collection<AcademicRequestsItem>>();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [plan, setPlan] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [reviewBy, setReviewBy] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const filterData = () => {
    let filters: string[] = [];
    if (plan) filters.push(`academic.name~'${plan}'`);
    if (country) filters.push(`applicationData.country~'${country}'`);
    if (city) filters.push(`applicationData.city~'${city}'`);
    if (status) filters.push(`status~'${status}'`);
    if (reviewBy) filters.push(`updateBy~'${reviewBy}'`);
    if (search) {
      filters.push(
        `applicationData.name~'${search}' || applicationData.phone~'${search}' || applicationData.email~'${search}' || id~'${search}'`
      );
    }
    return filters.length > 0 ? `(${filters.join(" && ")})` : "";
  };

  const loadData = async (data: { loadMore?: boolean }) => {
    setLoading(true);
    if (data.loadMore) {
      const response = await getRequests(page + 1, filterData());
      setPage(page + 1);
      setData((prev) => {
        return {
          ...response,
          items: [...(prev?.items || []), ...response.items],
        };
      });
    } else {
      const response = await getRequests(1, filterData());
      setData(response);
    }
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData({ loadMore: false });
    }, 300);
    return () => clearTimeout(timer);
  }, [city, country, plan, status, search, reviewBy]);

  const getCity = useCallback(() => {
    if (country) {
      return countryCityListGlobal.find((item) => item.country === country)
        ?.cities;
    }
    return [];
  }, [country]);

  return (
    <div className="">
      <div className="w-full">
        {filterData() && (
          <div
            className="flex justify-end items-end"
            onClick={() => {
              setPlan("");
              setCountry("");
              setCity("");
              setStatus("");
              setReviewBy("");
              setSearch("");
            }}
          >
            <Badge variant="destructive" className="rounded-none">
              Clear Filter
            </Badge>
          </div>
        )}
        <div className="flex justify-between items-center bg-gray-100">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="w-full rounded-none border-none bg-gray-100"
          />
          <div className="flex justify-between items-center">
            <Select onValueChange={setPlan} value={plan}>
              <SelectTrigger className="w-[150px] rounded-none border-none bg-gray-100">
                <SelectValue placeholder="Plan Name" />
              </SelectTrigger>
              <SelectContent>
                {academics.upcomingAcademies.map((item) => (
                  <SelectItem key={item.name} value={item.name}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={setCountry} value={country}>
              <SelectTrigger className="w-[150px] rounded-none border-none bg-gray-100">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                {countryCityListGlobal.map((item) => (
                  <SelectItem key={item.country} value={item.country}>
                    {item.country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={setCity} value={city}>
              <SelectTrigger className="w-[150px] rounded-none border-none bg-gray-100">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                {getCity()?.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={setStatus} value={status}>
              <SelectTrigger className="w-[150px] rounded-none border-none bg-gray-100">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="complete">Complete</SelectItem>
                <SelectItem value="cancel">Cancel</SelectItem>
              </SelectContent>
            </Select>

            <ComboboxUser
              onSelect={(e) => setReviewBy(e)}
              defaultValue={reviewBy}
              className="w-[160px] rounded-none border-none bg-transparent  h-8  "
              placeholder="Reviewed By"
            />
          </div>
        </div>
      </div>
      <div className="tableWrapper">
        <table className="tblView ">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Status</th>
              <th>User Name</th>
              <th>Gender</th>
              <th>Phone No</th>
              <th>Email ID</th>
              <th>Program Title</th>
              <th>Submission Date</th>
              <th>country</th>
              <th>City</th>
              <th>Tshart Size</th>
              <th>Notes</th>
              <th>Last Update</th>
              <th>Update By</th>
              <th className="action">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.items.map((item) => (
              <AcademicsItem
                key={item.id}
                item={item}
                onUpdate={(e) => {
                  setData({
                    ...data,
                    items: data?.items.map((item) => {
                      if (item.id === e.id) {
                        return e;
                      }
                      return item;
                    }),
                  });
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

export default AcademicsList;
