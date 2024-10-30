"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import TreeListView from "./TreeListView";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ProjectItem } from "@/interfaces/project";
import { setPlantingData } from "@/redux/Slices/plantingSlice";
import { TreeOrderItem } from "@/interfaces/treeOrders";
import { useMapContext } from "@/components/context/mapContext";
import { Checkbox } from "@/components/ui/checkbox";

function ProjectListView({ data }: { data: ProjectItem }) {
  const platingSlice = useAppSelector((state) => state.plantingSlice);
  const dispatch = useAppDispatch();
  const { map } = useMapContext();

  const setWorkProject = () => {
    if (platingSlice.workingProject?.id === data.id) {
      map?.flyTo({
        center: [59.1601407041004, 22.2635482528096], // starting position [lng, lat]
        zoom: 5, // starting zoom
      });
      dispatch(
        setPlantingData({
          workingProject: null,
          workingOrder: null,
        })
      );
    } else {
      map?.flyTo({
        center: [data.marker.position.lng, data.marker.position.lat],
        zoom: 16,
      });

      dispatch(
        setPlantingData({
          workingProject: data,
        })
      );
    }
  };

  const setCheckedProject = () => {
    if (platingSlice.checkedProjectList?.includes(data)) {
      dispatch(
        setPlantingData({
          checkedProjectList: platingSlice.checkedProjectList?.filter(
            (project) => project.id !== data.id
          ),
        })
      );
    } else {
      dispatch(
        setPlantingData({
          checkedProjectList: [
            ...(platingSlice.checkedProjectList || []),
            data,
          ],
        })
      );
    }
  };

  const setWorkOrder = (order: TreeOrderItem) => {
    if (platingSlice.workingOrder?.id === order.id) {
      dispatch(
        setPlantingData({
          workingOrder: null,
        })
      );
    } else {
      dispatch(
        setPlantingData({
          workingOrder: order,
        })
      );
    }
  };

  return (
    <div className="border-b-gray-50 border-b select-none">
      <div className=" cursor-pointer w-full p-2 text-sm pl-3 gap-4 flex justify-between items-center bg-white ">
        {platingSlice.showSelected && (
          <Checkbox
            checked={platingSlice.checkedProjectList?.includes(data)}
            onClick={setCheckedProject}
          />
        )}
        <div
          className="flex justify-between items-center w-full"
          onClick={() => setWorkProject()}
        >
          <p>
            {data.name.slice(0, 22) + `${data.name.length > 22 ? "..." : ""}`} -{" "}
            {data.total_trees} Trees
          </p>
          {platingSlice.workingProject?.id === data.id ? (
            <ChevronDown size={18} />
          ) : (
            <ChevronRight size={18} />
          )}
        </div>
      </div>
      {platingSlice.workingProject?.id === data.id && (
        <div className="">
          {data.orders?.map((order, index) => (
            <div className="" key={order.id}>
              <div className="w-full  text-sm border-b-white border-b ">
                <div
                  onClick={() => setWorkOrder(order)}
                  className=" bg-green-50  border-white cursor-pointer flex justify-between items-center  border-t px-3 pr-2 text-sm py-2 "
                >
                  <p className="font-bold">
                    Order Id - #{order.order_id} (
                    {order.not_planted_trees?.length} Trees)
                  </p>
                  {platingSlice.workingOrder?.id === order.id ? (
                    <ChevronDown size={18} />
                  ) : (
                    <ChevronRight size={18} />
                  )}
                </div>
                {platingSlice.workingOrder?.id === order.id && (
                  <>
                    {order.not_planted_trees?.map((tree) => (
                      <TreeListView key={tree.id} tree={tree} />
                    ))}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectListView;
