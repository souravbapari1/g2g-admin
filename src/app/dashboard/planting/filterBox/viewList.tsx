"use client";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import ProjectListView from "./ProjectLIstView";

function ViewList() {
  const [showArea, setShowArea] = useState(false);
  return (
    <div>
      <div className="flex justify-between items-center mt-2 mb-2">
        <h1 className="font-bold">Filter</h1>
        <div className=" flex justify-end items-center gap-2 text-sm ">
          <Checkbox onClick={() => setShowArea(!showArea)} checked={showArea} />
          <p>Show Area</p>
        </div>
      </div>
      {Array.from({ length: 10 }).map((_, index) => (
        <ProjectListView key={index} showArea={showArea} />
      ))}
    </div>
  );
}

export default ViewList;
