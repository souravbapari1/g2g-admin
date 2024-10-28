import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import useApplyFilters from "@/hooks/useApplyFilter";
import { setPlantingData } from "@/redux/Slices/plantingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React, { useEffect, useState } from "react";

function FilterOptions({ type }: { type: string }) {
  const platingSlice = useAppSelector((state) => state.plantingSlice);
  const dispatch = useAppDispatch();
  const { applyFilters, data, filterResults } = useApplyFilters();

  useEffect(() => {
    if (type || type != "reset") {
      applyFilters(platingSlice.ordersList);
    } else {
      dispatch(
        setPlantingData({
          filterOrdersList: null,
        })
      );
    }
  }, [type, platingSlice.ordersList]);

  useEffect(() => {
    if (type || type != "reset") {
      dispatch(
        setPlantingData({
          filterOrdersList: data,
        })
      );
    }
  }, [data]);

  return (
    <div>
      {type == "tree-type" &&
        filterResults.tree_types.map((key) => {
          return (
            <label className="flex select-none justify-start items-center gap-3 border p-2 px-3 border-t-0 bg-white">
              <Checkbox />
              <p className="text-sm">
                {key.name} <small>({key.total} Tree)</small>{" "}
              </p>
            </label>
          );
        })}

      {type == "conditions" &&
        filterResults.status.map((key) => {
          return (
            <label className="flex select-none justify-start items-center gap-3 border p-2 px-3 border-t-0 bg-white">
              <Checkbox />
              <p className="text-sm capitalize">
                {key.name} <small>({key.total} Tree)</small>{" "}
              </p>
            </label>
          );
        })}

      {type == "area-type" &&
        filterResults.area_type.map((key) => {
          return (
            <label className="flex select-none justify-start items-center gap-3 border p-2 px-3 border-t-0 bg-white">
              <Checkbox />
              <p className="text-sm capitalize">
                {key.name} <small>({key.total} Tree)</small>{" "}
              </p>
            </label>
          );
        })}

      {type == "tree-age" &&
        filterResults.planting_date.map((key) => {
          return (
            <label className="flex select-none justify-start items-center gap-3 border p-2 px-3 border-t-0 bg-white">
              <Checkbox />
              <p className="text-sm capitalize">
                {key.name} <small>({key.total} Tree)</small>{" "}
              </p>
            </label>
          );
        })}
    </div>
  );
}

export default FilterOptions;
