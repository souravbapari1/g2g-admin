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

function MicroActionList() {
  const [data, setData] = useState<Collection<MicroActionDataItem>>();
  const [loading, setLoading] = useState(false);
  const { partnerListGlobal } = useGlobalDataSetContext();
  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getMicroActions();
      setData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="">
      <div className="flex justify-between items-center bg-gray-100">
        <Input className="bg-gray-100 border-none" placeholder="Search" />
        <div className="flex justify-end items-end">
          <Select>
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
          <Select>
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
            <Input type="date" className="block bg-gray-100 border-none" />
          </div>
          <div className="flex justify-center items-center ">
            <p className="text-xs">To: </p>
            <Input type="date" className="block bg-gray-100 border-none" />
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
              <th>Published or drafted</th>

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
      </div>
    </div>
  );
}

export default MicroActionList;
