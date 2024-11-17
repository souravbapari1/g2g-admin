import { useMapContext } from "@/components/context/mapContext";
import { getAreaNameForCoordinates } from "@/helper/getAreaName";
import { setPlantingData, setWorkingTree } from "@/redux/Slices/plantingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { memo } from "react";

import PlantedTreeMarker from "./PlantedTreeMark";
import { getTreeStateColor } from "@/helper/plantIcon";

function PlantedFixedTreesMark() {
  const { map } = useMapContext();
  const plantingSlice = useAppSelector((state) => state.plantingSlice); // Corrected typo
  const dispatch = useAppDispatch();

  if (plantingSlice.showPoints || plantingSlice.filterType) {
    return <></>;
  }

  return (
    <>
      {plantingSlice.workingProject?.orders?.map((order, index) =>
        order.expand.trees
          .filter((e) => e.area)
          .map((tree, index) => (
            <PlantedTreeMarker
              point={plantingSlice.showPoints}
              key={tree.id}
              tree={tree}
              coordinates={[
                tree!.area!.position!.lng,
                tree!.area!.position!.lat,
              ]}
              color={getTreeStateColor(tree.status)}
              map={map!}
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
          ))
      )}
    </>
  );
}

export default PlantedFixedTreesMark;
