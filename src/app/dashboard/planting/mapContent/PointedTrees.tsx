import { useAppDispatch, useAppSelector } from "@/redux/store";
import React from "react";
import PlantedTreeMarker from "./PlantedTreeMark";
import { getTreeStateColor } from "@/helper/plantIcon";
import { useMapContext } from "@/components/context/mapContext";
import { setPlantingData } from "@/redux/Slices/plantingSlice";

function PointedTrees() {
  const state = useAppSelector((state) => state.plantingSlice);
  const dispatch = useAppDispatch();
  const { map } = useMapContext();

  if (!map || !state.showPoints) {
    return <></>;
  }

  if (state.filterOptions.length != 0) {
    return <></>;
  }

  return (
    <>
      {state.ordersList.map((order, index) => {
        return order.orders?.map((order) => {
          return order.planted_trees?.map((tree) => {
            return (
              <PlantedTreeMarker
                key={tree.id + index}
                color={getTreeStateColor(tree.status)}
                coordinates={[
                  tree!.area!.position!.lng,
                  tree!.area!.position!.lat,
                ]}
                map={map!}
                tree={tree}
                point={state.showPoints}
                onPopupClick={() => {
                  map?.flyTo({
                    center: [
                      tree!.area!.position!.lng,
                      tree!.area!.position!.lat,
                    ],
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
          });
        });
      })}
    </>
  );
}

export default PointedTrees;
