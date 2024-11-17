import { useMapContext } from "@/components/context/mapContext";
import { getAreaNameForCoordinates } from "@/helper/getAreaName";
import { setPlantingData, setWorkingTree } from "@/redux/Slices/plantingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { memo, useCallback } from "react";
import TreeMarker from "../mapContent/TreeMarker";
import toast from "react-hot-toast";
import { getTreeStateColor } from "@/helper/plantIcon";
import { filterTypes } from "../filterBox/FilterOptions";
import PlantedTreeMarker from "./PlantedTreeMark";
import { Tree } from "@/interfaces/treeOrders";
import { get } from "http";

// tree_types: [],
// status: [],
// area_type: [],
// planting_date: [],

function FilterTreesPointer() {
  const plantingSlice = useAppSelector((state) => state.plantingSlice); // Corrected typo
  const renderItems = () => {
    return plantingSlice.filterOptions?.map((option) => {
      return plantingSlice.filterOrdersList?.map((order, index) => {
        return order.orders?.map((order) => {
          if (plantingSlice.filterType === filterTypes.treeType) {
            return order.filter_by_tree_type?.[option]?.map((tree) => {
              return (
                <FilterTreesPointerMarker
                  index={index}
                  option={option}
                  tree={tree}
                  type="tree_types"
                  key={tree.id + index}
                />
              );
            });
          } else if (plantingSlice.filterType === filterTypes.areaType) {
            return order.filter_by_area_type?.[option]?.map((tree) => {
              return (
                <FilterTreesPointerMarker
                  index={index}
                  option={option}
                  tree={tree}
                  type="area_type"
                  key={tree.id + index}
                />
              );
            });
          } else if (plantingSlice.filterType === filterTypes.conditions) {
            return order.filter_by_status?.[option]?.map((tree) => {
              return (
                <FilterTreesPointerMarker
                  index={index}
                  option={option}
                  tree={tree}
                  type="status"
                  key={tree.id + index}
                />
              );
            });
          } else if (plantingSlice.filterType === filterTypes.treeAge) {
            const getKey = plantingSlice.filterResults?.planting_date?.find(
              (e) => e.name == option
            );

            if (getKey && getKey?.object) {
              return order.filter_by_date?.[getKey?.object]?.map((tree) => {
                return (
                  <FilterTreesPointerMarker
                    index={index}
                    option={option}
                    tree={tree}
                    type="planting_date"
                    key={tree.id + index}
                  />
                );
              });
            }

            return <></>;
          } else {
            return <></>;
          }
        });
      });
    });
  };

  return <>{renderItems()}</>;
}

export default memo(FilterTreesPointer);

function FilterTreesPointerMarker({
  index,
  option,
  type,
  tree,
}: {
  tree: Tree;
  index: number;
  option: string;
  type: "tree_types" | "status" | "area_type" | "planting_date";
}) {
  const plantingSlice = useAppSelector((state) => state.plantingSlice); // Corrected typo
  const { map } = useMapContext();
  const dispatch = useAppDispatch();
  console.log(type);
  return (
    <PlantedTreeMarker
      key={tree.id + index}
      point={plantingSlice.showPoints}
      tree={tree}
      coordinates={[tree!.area!.position!.lng, tree!.area!.position!.lat]}
      color={
        plantingSlice.filterResults?.[type].find((e) => e.name == option)
          ?.color || "#000000"
      }
      map={map!}
      onPopupClick={() => {
        map?.flyTo({
          center: [tree!.area!.position!.lng, tree!.area!.position!.lat],
          zoom: 25,
        });
        dispatch(
          setPlantingData({
            reportTree: tree,
          })
        );
      }}
    />
  );
}
