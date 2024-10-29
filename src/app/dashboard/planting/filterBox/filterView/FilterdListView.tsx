import { useAppDispatch, useAppSelector } from "@/redux/store";
import React from "react";
import ProjectListView from "../ProjectLIstView";
import FilterdProjectList from "./FilterdProjectList";

function FilterdListView() {
  const platingSlice = useAppSelector((state) => state.plantingSlice);
  const dispatch = useAppDispatch();
  return (
    <div>
      <div className="flex justify-between items-center mt-2 mb-2">
        <h1 className="font-bold">Filter Project & Orders</h1>
      </div>
      {platingSlice.filterOrdersList?.map((order, index) => (
        <FilterdProjectList key={index} data={order} />
      ))}
    </div>
  );
}

export default FilterdListView;
