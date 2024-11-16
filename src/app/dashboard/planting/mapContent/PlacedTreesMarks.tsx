import { useMapContext } from "@/components/context/mapContext";
import { getAreaNameForCoordinates } from "@/helper/getAreaName";
import { setPlantingData, setWorkingTree } from "@/redux/Slices/plantingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { memo } from "react";
import TreeMarker from "../mapContent/TreeMarker";
import toast from "react-hot-toast";
import { getTreeStateColor } from "@/helper/plantIcon";

function PlacedTreesMarks() {
  const { map } = useMapContext();
  const plantingSlice = useAppSelector((state) => state.plantingSlice); // Corrected typo
  const dispatch = useAppDispatch();

  return (
    <>
      {plantingSlice.workingTrees.map((tree, index) => (
        <TreeMarker
          point={plantingSlice.showPoints}
          key={tree.id}
          tree={tree}
          coordinates={[tree!.area!.position!.lng, tree!.area!.position!.lat]}
          color={getTreeStateColor(tree.status)}
          map={map!}
          onPopupClick={() => {
            map?.flyTo({
              center: [tree!.area!.position!.lng, tree!.area!.position!.lat],
              zoom: 20,
            });
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
              toast.dismiss();
              if (!getAreaInfo.exist) {
                toast.error("Area not part of this project");
              }
              dispatch(
                setWorkingTree({
                  index: index,
                  tree: {
                    ...tree,
                    location: `${coordinates[0]},${coordinates[1]}`,
                    area: {
                      position: { lng: coordinates[0], lat: coordinates[1] },
                      areaName: getAreaInfo.areaName,
                      id: getAreaInfo.areaId as string,
                      areaType: getAreaInfo.areaType,
                      areaId: getAreaInfo.areaId as string,
                      area: 0,
                      color: getAreaInfo.color,
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

export default memo(PlacedTreesMarks);
