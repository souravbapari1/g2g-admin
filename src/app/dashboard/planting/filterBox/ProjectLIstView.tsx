"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import TreeListView from "./TreeListView";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ProjectItem } from "@/interfaces/project";
import { setPlantingData } from "@/redux/Slices/plantingSlice";
import { TreeOrderItem } from "@/interfaces/treeOrders";

function ProjectListView({ data }: { data: ProjectItem }) {
  const platingSlice = useAppSelector((state) => state.plantingSlice);
  const dispatch = useAppDispatch();

  const setWorkProject = () => {
    if (platingSlice.workingProject?.id === data.id) {
      dispatch(
        setPlantingData({
          workingProject: null,
          workingOrder: null,
        })
      );
    } else {
      dispatch(
        setPlantingData({
          workingProject: data,
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
      <div
        onClick={() => setWorkProject()}
        className=" cursor-pointer w-full p-2 text-sm pl-3  flex justify-between items-center bg-white "
      >
        <p>
          {data.name} - {data.total_trees} Trees
        </p>
        {platingSlice.workingProject?.id === data.id ? (
          <ChevronDown size={18} />
        ) : (
          <ChevronRight size={18} />
        )}
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
