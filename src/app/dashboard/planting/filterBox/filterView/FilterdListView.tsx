import { useAppDispatch, useAppSelector } from "@/redux/store";
import React from "react";
import ProjectListView from "../ProjectLIstView";
import FilterdProjectList from "./FilterdProjectList";
import { Checkbox } from "@/components/ui/checkbox";
import { setPlantingData } from "@/redux/Slices/plantingSlice";

function FilterdListView() {
  const platingSlice = useAppSelector((state) => state.plantingSlice);
  const dispatch = useAppDispatch();
  return (
    <div>
      <div className="flex justify-between items-center mt-2 mb-2">
        <h1 className="font-bold">Filter Project & Orders</h1>
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
      {platingSlice.filterOrdersList?.map((order, index) => (
        <FilterdProjectList key={index} data={order} />
      ))}
    </div>
  );
}

export default FilterdListView;
