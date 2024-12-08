"use client";

import { useEffect, useState } from "react";
import { getMicroActions, MicroActionDataItem } from "./actions";
import { Collection } from "@/interfaces/collection";
import MicroActionItem from "./MicroActionItem";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGlobalDataSetContext } from "@/components/context/globalDataSetContext";
import { IoClose } from "react-icons/io5";

function MicroActionList() {
  const [data, setData] = useState<Collection<MicroActionDataItem>>();
  const [loading, setLoading] = useState(false);
  const { partnerListGlobal } = useGlobalDataSetContext();

  const [search, setSearch] = useState("");
  const [sponsor, setSponsor] = useState("");
  const [Status, setStatus] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const genFilter = () => {
    const filters = [];
    if (search) {
      filters.push(
        `title~'${search}' || description~'${search}' || id~'${search}'`
      );
    }
    if (sponsor) {
      filters.push(`partners~'${sponsor}'`);
    }
    if (Status) {
      filters.push(`public=${Status == "public"}`);
    }
    if (from && to) {
      if (from === to) {
        // For the same day, filter from 00:00:00 to 23:59:59
        filters.push(
          `created>='${from} 00:00:00' && created<='${to} 23:59:59'`
        );
      } else {
        // For a date range
        filters.push(`created>='${from}' && created<='${to}'`);
      }
    } else if (from) {
      // Only start date specified
      filters.push(`created>='${from}'`);
    } else if (to) {
      // Only end date specified
      filters.push(`created<='${to}'`);
    }
    return filters.join(" && ");
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getMicroActions(1, genFilter());
      setData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData();
    }, 300);
    return () => clearTimeout(timer);
  }, [search, sponsor, Status, from, to]);

  return (
    <div className="">
      <div className="flex justify-between items-center bg-gray-100">
        <Input
          className="bg-gray-100 border-none"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex justify-end items-end">
          <Select
            defaultValue={sponsor}
            onValueChange={(e) => setSponsor(e)}
            value={sponsor}
          >
            <SelectTrigger className="w-[150px] bg-gray-100 border-none ">
              <SelectValue placeholder="Partner" />
            </SelectTrigger>
            <SelectContent>
              {partnerListGlobal.map((e) => {
                return (
                  <SelectItem value={e.id} key={e.id}>
                    {e.first_name + " " + e.last_name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Select
            defaultValue={Status}
            value={Status}
            onValueChange={(e) => setStatus(e)}
          >
            <SelectTrigger className="w-[150px] bg-gray-100 border-none ">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex justify-center items-center ">
            <p className="text-xs">From: </p>
            <Input
              type="date"
              className="block bg-gray-100 border-none"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div className="flex justify-center items-center ">
            <p className="text-xs">To: </p>
            <Input
              type="date"
              className="block bg-gray-100 border-none"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
            {genFilter() && (
              <div
                onClick={() => {
                  setFrom("");
                  setTo("");
                  setStatus("");
                  setSponsor("");
                  setSearch("");
                }}
                className="w-6 rounded-full mx-5 flex justify-center cursor-pointer items-center h-4 bg-red-500"
              >
                <IoClose color="white" size={14} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="tableWrapper">
        <table className="tblView">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Kg Per Unit</th>
              <th>Number of submitted Units</th>
              <th>Number Of impactors</th>
              <th>Total CO2e avoided</th>
              <th>Sponsor By</th>
              <th>Created Date and Time</th>
              <th>Published/Drafted</th>

              <th className="action">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.items.map((item) => (
              <MicroActionItem
                key={item.id}
                data={item}
                onDelete={(e) => {
                  if (data) {
                    setData({
                      ...data,
                      items: data?.items.filter((i) => i.id !== e.id),
                    });
                  }
                }}
              />
            ))}
          </tbody>
        </table>
        {loading && <p>Loading....</p>}
      </div>
    </div>
  );
}

export default MicroActionList;
