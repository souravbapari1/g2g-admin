import React, { useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import mapboxgl from "mapbox-gl";
import { Tree } from "@/interfaces/treeOrders";
import { deadPlant, fruitPlat, plantIcon } from "@/helper/plantIcon";
import { TreeMarkerPopup } from "./TreeMarker";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import toast from "react-hot-toast";
import {
  replaceNewPlantedTree,
  setPlantingData,
} from "@/redux/Slices/plantingSlice";
import { getAreaNameForCoordinates } from "@/helper/getAreaName";
import { updateTree } from "@/request/worker/orders/treeorders/manageTree";
import { useSession } from "next-auth/react";

interface PlantedTreeMarkerProps {
  map: mapboxgl.Map;
  coordinates: [number, number];
  tree: Tree;
  color: string;
  onPopupClick?: () => void;
}

const PlantedTreeMarker: React.FC<PlantedTreeMarkerProps> = ({
  map,
  coordinates,
  color,
  tree,
  onPopupClick,
}) => {
  const { data } = useSession();
  const plantingSlice = useAppSelector((state) => state.plantingSlice); // Corrected typo
  const dispatch = useAppDispatch();

  const updateTreeState = async (newTree: Tree) => {
    console.log(newTree.area);

    dispatch(replaceNewPlantedTree(newTree));
    updateTree(newTree.id, newTree).then((res) => {
      toast.success("Tree updated successfully");
    });
  };

  useEffect(() => {
    // Create marker element
    const markerElement = document.createElement("div");
    markerElement.innerHTML = /* html */ `
    <div style="width: 30px; height: 30px; cursor:pointer; transform: rotate(-45deg); display: flex; justify-content: center; align-items: center;">
     <div style="transform: rotate(45deg); height: 100%; width: 100%; display: flex; justify-content: center; align-items: center;">
      ${
        tree.status === "producing"
          ? fruitPlat
          : tree.status === "dead"
          ? deadPlant
          : plantIcon(color)
      }
     </div>
    </div>`;

    // Render popup content to HTML string
    const popupContent = ReactDOMServer.renderToString(
      <TreeMarkerPopup tree={tree} />
    );

    // Create Popup
    const popup = new mapboxgl.Popup({ offset: 20 }).setHTML(popupContent);

    // Create Marker with popup (set draggable to false)
    const marker = new mapboxgl.Marker({
      element: markerElement,
      draggable: plantingSlice.moveTrees,
    })
      .setLngLat(coordinates)
      .addTo(map);

    // Show popup on hover (mouseenter)
    markerElement.addEventListener("mouseenter", () => {
      if (plantingSlice.moveTrees == false) {
        popup.addTo(map);
        popup.setLngLat(coordinates);
      }
    });

    // Hide popup when mouse leaves the marker (mouseleave)
    markerElement.addEventListener("mouseleave", () => {
      popup.remove();
    });

    // Trigger onPopupClick function if marker is clicked
    markerElement.addEventListener("click", () => {
      if (onPopupClick) {
        onPopupClick();
      }
    });

    marker.on("dragend", () => {
      const { lng, lat } = marker.getLngLat();

      if (tree) {
        const project = plantingSlice.ordersList.find(
          (proj) => proj.id === tree.project
        );
        if (project) {
          const getAreaInfo = getAreaNameForCoordinates(
            [lng, lat],

            project.workareas.areaInfo,
            project.workareas.workAreaData as any
          );

          if (!getAreaInfo.exist) {
            toast.dismiss();
            toast.error("Area not part of this project");
          }

          updateTreeState({
            ...tree,
            area: {
              ...tree.area,
              position: {
                lng,
                lat,
              },
              areaName: getAreaInfo.areaName,
              areaType: getAreaInfo.areaType,
              id: getAreaInfo.areaId || "",
            },
            location: `${lng}, ${lat}`,
            update_by: data?.user.id || "",
          });
        }
      }
    });

    // Cleanup when the component is unmounted
    return () => {
      marker.remove();
      popup.remove();
    };
  }, [map, coordinates, onPopupClick, plantingSlice.moveTrees]);

  return null;
};

export default PlantedTreeMarker;
