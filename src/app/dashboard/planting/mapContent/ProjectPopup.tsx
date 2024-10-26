"use client";

import { ProjectItem } from "@/interfaces/project";
import { cn } from "@/lib/utils";
import { client, genPbFiles } from "@/request/actions";
import React from "react";
import { FaStar } from "react-icons/fa";

export const PopupContent = ({
  className,
  data,
  onClick,
}: {
  className?: string | undefined;
  data?: ProjectItem | undefined;
  onClick?: () => void;
}) => {
  function getPriceLabel(type?: string): string {
    return type === "Plastic Offset" ? "OMR/kg" : "OMR/Trees";
  }

  function getProjectColor(type?: string, status?: string): string {
    if (type?.toLowerCase() === "carbon offset") {
      switch (status?.toLowerCase()) {
        case "active":
          return "bg-gray-300 "; // Gray for active Carbon Project
        case "completed":
          return "bg-green-200"; // Green for completed Carbon Project
        case "top":
          return "bg-orange-200"; // Orange for top Carbon Project
        default:
          return "bg-gray-300"; // Default color (if status is unknown)
      }
    } else if (type?.toLowerCase() === "plastic offset") {
      switch (status?.toLowerCase()) {
        case "active":
          return "bg-blue-300"; // Blue for active Plastic Project
        case "completed":
          return "bg-green-300"; // Green for completed Plastic Project
        case "top":
          return "bg-orange-300"; // Orange for top Plastic Project
        default:
          return "bg-gray-300"; // Default color (if status is unknown)
      }
    }
    return "bg-gray-300"; // Default color for unknown types
  }

  function getTypeLabel(type?: string): string | undefined {
    return type === "Tree Project" ? "Trees" : type;
  }

  return (
    <div
      className={cn("w-72 h-auto bg-white rounded-2xl p-2 shadow", className)}
    >
      <div
        onClick={onClick}
        className="rounded-xl relative  md:h-44 h-40 cursor-pointer  overflow-hidden"
      >
        <img
          src={genPbFiles(data, data?.preview_image!)}
          className="w-full h-full object-cover"
        />
        <div
          className={cn(
            "w-full h-24  absolute bottom-0 bg-gradient-to-t from-black to-transparent",
            `${data?.top_project ? "from-yellow-800" : ""}`
          )}
        ></div>
        {data?.top_project && (
          <div className="absolute top-3 flex justify-start px-0.5 items-center right-4 w-16 rounded-full h-6 bg-yellow-600">
            <div className="h-5 w-5 bg-white rounded-full flex justify-center items-center">
              <FaStar className="text-yellow-600" />
            </div>
            <p className="font-bold text-white text-center ml-1.5">TOP</p>
          </div>
        )}
        <div className="flex justify-start absolute text-white left-4 bottom-4 items-center gap-x-2">
          <div className="text-xs ">
            <div className="flex  justify-start items-start gap-2">
              <img
                src={data?.marker?.values.image}
                className="w-3 h-3 cursor-pointer"
              />
              <p className="font-semibold text-[10px]">
                {data?.name || "NO NME"}
              </p>
            </div>
            <p className="text-[12px] ">{data?.sort_title}</p>
          </div>
        </div>
      </div>
      <div className="p-2 py-3 flex justify-between items-center gap-3">
        <div className="flex flex-col gap-1">
          <p>
            <span className="font-bold">
              Target {data?.total_trees} {data?.unit_measurement}
            </span>
          </p>
          <p className="text-xs">
            {data?.country} - {data?.city}
          </p>
          <p>
            <span className="font-bold">﷼{data?.omr_unit || "123.00"}</span>{" "}
            {data?.unit_measurement}
          </p>
        </div>
      </div>
      <div
        className={cn(
          "h-7 text-[9px] rounded-xl w-full  flex justify-center items-center",
          getProjectColor(data?.expand?.type?.name, data?.status)
        )}
      >
        <p>By Mama Saves The Planet</p>
      </div>
    </div>
  );
};
