"use client";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import ProjectListView from "../ProjectLIstView";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setPlantingData } from "@/redux/Slices/plantingSlice";
import ProjectPreview from "./PreviewProject";

function PreviewList() {
  const platingSlice = useAppSelector((state) => state.plantingSlice);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className="flex justify-between items-center mt-2 mb-2">
        <h1 className="font-bold">Project & Areas</h1>
        <div className="">
          <Checkbox
            checked={platingSlice.showSelected}
            onClick={() => {
              if (platingSlice.showSelected) {
                dispatch(setPlantingData({ checkedProjectList: null }));
              }

              dispatch(
                setPlantingData({ showSelected: !platingSlice.showSelected })
              );
            }}
          />
        </div>
      </div>
      {platingSlice.ordersList.map((order, index) => (
        <ProjectPreview key={index} data={order} />
      ))}
    </div>
  );
}

export default PreviewList;
