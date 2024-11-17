"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ProjectItem } from "@/interfaces/project";
import { setPlantingData } from "@/redux/Slices/plantingSlice";
import { TreeOrderItem } from "@/interfaces/treeOrders";
import { useMapContext } from "@/components/context/mapContext";
import FilterTreeView from "./FilterTreeView";
import { filterTypes } from "../FilterOptions";
import { useCallback } from "react";
import { Checkbox } from "@/components/ui/checkbox";

function FilteredProjectList({ data }: { data: ProjectItem }) {
  const plantingSlice = useAppSelector((state) => state.plantingSlice);
  const dispatch = useAppDispatch();
  const { map } = useMapContext();

  const setWorkProject = () => {
    if (plantingSlice.workingProject?.id === data.id) {
      map?.flyTo({
        center: [59.1601407041004, 22.2635482528096],
        zoom: 5,
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

  const setWorkOrder = (order: TreeOrderItem) => {
    if (plantingSlice.workingOrder?.id === order.id) {
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

  const setCheckedProject = () => {
    if (plantingSlice.checkedProjectList?.includes(data)) {
      dispatch(
        setPlantingData({
          checkedProjectList: plantingSlice.checkedProjectList?.filter(
            (project) => project.id !== data.id
          ),
        })
      );
    } else {
      dispatch(
        setPlantingData({
          checkedProjectList: [
            ...(plantingSlice.checkedProjectList || []),
            data,
          ],
        })
      );
    }
  };

  const count = useCallback(
    (data: ProjectItem) => {
      let count = 0;

      // Determine count based on filter type
      switch (plantingSlice.filterType) {
        case filterTypes.treeType:
          // Count trees by type
          data.orders?.forEach((order) => {
            plantingSlice.filterOptions.forEach((option) => {
              count += order.filter_by_tree_type?.[option]?.length || 0;
            });
          });
          break;

        case filterTypes.conditions:
          // Count trees by status/condition
          data.orders?.forEach((order) => {
            plantingSlice.filterOptions.forEach((option) => {
              count += order.filter_by_status?.[option]?.length || 0;
            });
          });
          break;

        case filterTypes.treeAge:
          // Count trees by age categories
          data.orders?.forEach((order) => {
            plantingSlice.filterOptions.forEach((option) => {
              const getkey = plantingSlice.filterResults?.[
                "planting_date"
              ]?.find((e) => {
                return e.name === option;
              })?.object;

              if (getkey) {
                count += order.filter_by_date?.[getkey]?.length || 0;
              }
            });
          });
          break;

        case filterTypes.areaType:
          // Count trees by area type
          data.orders?.forEach((order) => {
            plantingSlice.filterOptions.forEach((option) => {
              count += order.filter_by_area_type?.[option]?.length || 0;
            });
          });
          break;
      }

      // Return the final count
      return count;
    },
    [data, plantingSlice.filterOrdersList, plantingSlice.filterOptions]
  );
  0;
  const countOrderTree = useCallback(
    (data: TreeOrderItem) => {
      let count = 0;

      // Determine the filter type and count accordingly
      switch (plantingSlice.filterType) {
        case filterTypes.treeType:
          // Count trees by type
          plantingSlice.filterOptions.forEach((option) => {
            count += data.filter_by_tree_type?.[option]?.length || 0;
          });
          break;

        case filterTypes.conditions:
          // Count trees by status/condition
          plantingSlice.filterOptions.forEach((option) => {
            count += data.filter_by_status?.[option]?.length || 0;
          });
          break;

        case filterTypes.treeAge:
          // Count trees by age categories
          plantingSlice.filterOptions.forEach((option) => {
            const getkey = plantingSlice.filterResults?.["planting_date"]?.find(
              (e) => {
                return e.name === option;
              }
            )?.object;

            if (getkey) {
              count += data.filter_by_date?.[getkey]?.length || 0;
            }
          });
          break;

        case filterTypes.areaType:
          // Count trees by area type
          plantingSlice.filterOptions.forEach((option) => {
            count += data.filter_by_area_type?.[option]?.length || 0;
          });
          break;
      }

      // Return the final count
      return count;
    },
    [data, plantingSlice.filterOrdersList, plantingSlice.filterOptions]
  );

  if (count(data) == 0) {
    return <></>;
  }

  return (
    <div className="border-b-gray-50 border-b select-none">
      <div className=" cursor-pointer w-full p-2 text-sm pl-3 gap-2 flex justify-between items-center bg-white ">
        {plantingSlice.showSelected && (
          <Checkbox
            className="rounded-none"
            onClick={setCheckedProject}
            checked={plantingSlice.checkedProjectList?.includes(data)}
          />
        )}
        <div
          className="flex justify-between items-center w-full"
          onClick={() => setWorkProject()}
        >
          <p>
            {data.name.slice(0, 22) + `${data.name.length > 22 ? "..." : ""}`} -{" "}
            <small className="font-bold"> ({count(data)} Trees)</small>
          </p>
          {plantingSlice.workingProject?.id === data.id ? (
            <ChevronDown size={18} />
          ) : (
            <ChevronRight size={18} />
          )}
        </div>
      </div>
      {plantingSlice.workingProject?.id === data.id && (
        <div>
          {data.orders?.map((order) => {
            const count = countOrderTree(order);
            if (count == 0) {
              return <></>;
            }
            return (
              <div
                className="w-full text-sm border-b-white border-b"
                key={order.id}
              >
                <div
                  onClick={() => setWorkOrder(order)}
                  className="bg-green-50 border-white cursor-pointer flex justify-between items-center border-t px-3 pr-2 py-2"
                >
                  <p className="font-bold">
                    Order Id - #{order.order_id} ({count} Trees)
                  </p>
                  {plantingSlice.workingOrder?.id === order.id ? (
                    <ChevronDown size={18} />
                  ) : (
                    <ChevronRight size={18} />
                  )}
                </div>
                {plantingSlice.workingOrder?.id === order.id && (
                  <div>
                    {plantingSlice.filterOptions.map((option, index) => (
                      <div key={index} className="w-full flex flex-col gap-2">
                        <div className="w-full flex justify-between items-start flex-col">
                          <FilterTreeView order={order} option={option} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FilteredProjectList;
