import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import useApplyFilters from "@/hooks/useApplyFilter";
import { setPlantingData } from "@/redux/Slices/plantingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React, { useEffect } from "react";

export const filterTypes = {
  treeType: "tree-type",
  conditions: "conditions",
  areaType: "area-type",
  treeAge: "tree-age",
};

function FilterOptions({ type }: { type: string }) {
  const plantingSlice = useAppSelector((state) => state.plantingSlice);
  const dispatch = useAppDispatch();
  const { applyFilters, data, filterResults } = useApplyFilters();

  useEffect(() => {
    if (type !== "reset") {
      dispatch(
        setPlantingData({
          filterType: type,
          filterOptions: [],
          selectedTree: null,
          workingOrder: null,
          workingTrees: [],
          workingProject: null,
          reportTree: null,
          checkedProjectList: null,
        })
      );
    } else {
      dispatch(
        setPlantingData({
          filterOrdersList: null,
          filterType: null,
          filterOptions: [],
          selectedTree: null,
          workingOrder: null,
          workingTrees: [],
          workingProject: null,
          reportTree: null,
          checkedProjectList: null,
        })
      );
    }
  }, [type]);

  useEffect(() => {
    if (type !== "reset") {
      applyFilters(plantingSlice.ordersList);
    }
  }, [plantingSlice.filterType, plantingSlice.ordersList]);

  useEffect(() => {
    if (type !== "reset") {
      dispatch(
        setPlantingData({
          filterOrdersList: data,
        })
      );
    }
  }, [data]);

  const handleCheckboxChange = (keyName: string) => {
    if (plantingSlice.filterOptions.includes(keyName)) {
      dispatch(
        setPlantingData({
          filterOptions: plantingSlice.filterOptions.filter(
            (i) => i !== keyName
          ),
        })
      );
    } else {
      dispatch(
        setPlantingData({
          filterOptions: [...plantingSlice.filterOptions, keyName],
        })
      );
    }
  };

  return (
    <div>
      {type === "tree-type" &&
        filterResults.tree_types.map((key) => (
          <label
            key={key.name}
            className="flex select-none justify-start items-center gap-3 border p-2 px-3 border-t-0 bg-white"
          >
            <Checkbox
              checked={plantingSlice.filterOptions.includes(key.name)}
              onCheckedChange={() => handleCheckboxChange(key.name)}
            />
            <p className="text-sm">
              {key.name} <small>({key.total} Tree)</small>{" "}
            </p>
          </label>
        ))}

      {type === "conditions" &&
        filterResults.status.map((key) => (
          <label
            key={key.name}
            className="flex select-none justify-start items-center gap-3 border p-2 px-3 border-t-0 bg-white"
          >
            <Checkbox
              checked={plantingSlice.filterOptions.includes(key.name)}
              onCheckedChange={() => handleCheckboxChange(key.name)}
            />
            <p className="text-sm capitalize">
              {key.name} <small>({key.total} Tree)</small>{" "}
            </p>
          </label>
        ))}

      {type === "area-type" &&
        filterResults.area_type.map((key) => (
          <label
            key={key.name}
            className="flex select-none justify-start items-center gap-3 border p-2 px-3 border-t-0 bg-white"
          >
            <Checkbox
              checked={plantingSlice.filterOptions.includes(key.name)}
              onCheckedChange={() => handleCheckboxChange(key.name)}
            />
            <p className="text-sm capitalize">
              {key.name} <small>({key.total} Tree)</small>{" "}
            </p>
          </label>
        ))}

      {type === "tree-age" &&
        filterResults.planting_date.map((key) => (
          <label
            key={key.name}
            className="flex select-none justify-start items-center gap-3 border p-2 px-3 border-t-0 bg-white"
          >
            <Checkbox
              checked={plantingSlice.filterOptions.includes(key.name)}
              onCheckedChange={() => handleCheckboxChange(key.name)}
            />
            <p className="text-sm capitalize">
              {key.name} <small>({key.total} Tree)</small>{" "}
            </p>
          </label>
        ))}
    </div>
  );
}

export default FilterOptions;
