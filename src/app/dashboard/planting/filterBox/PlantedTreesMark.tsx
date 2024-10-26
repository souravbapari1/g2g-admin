import { useMapContext } from "@/components/context/mapContext";
import { getAreaNameForCoordinates } from "@/helper/getAreaName";
import { setPlantingData, setWorkingTree } from "@/redux/Slices/plantingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { memo } from "react";
import TreeMarker from "../mapContent/TreeMarker";

function PlantedTreesMark() {
  const { map } = useMapContext();
  const plantingSlice = useAppSelector((state) => state.plantingSlice); // Corrected typo
  const dispatch = useAppDispatch();

  return (
    <>
      {plantingSlice.workingTrees.map((tree, index) => (
        <TreeMarker
          key={tree.id}
          tree={tree}
          coordinates={[tree.area.position.lng, tree.area.position.lat]}
          image="/assets/plant-tree.svg"
          map={map}
          onPopupClick={() => {
            dispatch(
              setPlantingData({
                selectedTree: tree,
              })
            );
          }}
          onDragEnd={(coordinates) => {
            const project = plantingSlice.ordersList.find(
              (proj) => proj.id === tree.project
            );
            if (project) {
              const getAreaInfo = getAreaNameForCoordinates(
                coordinates,
                project.workareas.areaInfo,
                project.workareas.workAreaData as any
              );

              dispatch(
                setWorkingTree({
                  index: index,
                  tree: {
                    ...tree,
                    location: `${coordinates[0]},${coordinates[1]}`,
                    area: {
                      position: { lng: coordinates[0], lat: coordinates[1] },
                      areaName: getAreaInfo.areaName,
                      areaId: getAreaInfo.areaId,
                    },
                  },
                })
              );
            }
          }}
        />
      ))}
    </>
  );
}

export default memo(PlantedTreesMark);
