"use client";

import { ChevronDown, ChevronRight, Plus, TreePalm } from "lucide-react";
import { useState } from "react";
import TreeListView from "./TreeListView";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function ProjectListView({ showArea }: { showArea?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b-gray-50 border-b select-none">
      <div
        onClick={() => setOpen(!open)}
        className=" cursor-pointer w-full p-2 text-sm pl-3  flex justify-between items-center bg-white "
      >
        <p>Project XYZ - 2022 Trees</p>
        {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </div>
      {open &&
        (showArea ? (
          <div className="">
            <div className="w-full bg-gray-50 p-2 text-sm border-b-white border-b pl-3">
              <div className="">
                <p>Area 1 (288 Trees)</p>
              </div>
            </div>
            <div className="w-full bg-gray-50 p-2 text-sm pl-3">
              <div className="">
                <p>Area 2 (288 Trees)</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="">
            <div className="w-full bg-gray-50 text-sm border-b-white border-b ">
              <div className=" border-white  border-t px-3 text-sm py-2 ">
                <p className="font-bold">Order Id - #123 (4 Trees) </p>
              </div>
              {Array.from({ length: 4 }).map((_, index) => (
                <TreeListView key={index} />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

export default ProjectListView;
