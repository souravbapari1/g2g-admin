import React, { useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import mapboxgl from "mapbox-gl";
import { Tree } from "@/interfaces/treeOrders";
import { plantIcon } from "@/helper/plantIcon";
import { TreeMarkerPopup } from "./TreeMarker";

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
  useEffect(() => {
    // Create marker element
    const markerElement = document.createElement("div");
    markerElement.innerHTML = /* html */ `
    <div style="width: 30px; height: 30px; cursor:pointer; transform: rotate(-45deg); display: flex; justify-content: center; align-items: center;">
     <div style="transform: rotate(45deg); height: 100%; width: 100%; display: flex; justify-content: center; align-items: center;">
      ${plantIcon(color)}
     </div>
    </div>`;

    // Render popup content to HTML string
    const popupContent = ReactDOMServer.renderToString(
      <TreeMarkerPopup tree={tree} />
    );

    // Create Popup
    const popup = new mapboxgl.Popup({ offset: 20 }).setHTML(popupContent);

    // Create Marker with popup (set draggable to false)
    const marker = new mapboxgl.Marker({ element: markerElement })
      .setLngLat(coordinates)
      .addTo(map);

    // Show popup on hover (mouseenter)
    markerElement.addEventListener("mouseenter", () => {
      popup.addTo(map);
      popup.setLngLat(coordinates);
    });

    // Hide popup when mouse leaves the marker (mouseleave)
    markerElement.addEventListener("mouseleave", () => {
      popup.remove();
    });

    // Trigger onPopupClick function if marker is clicked
    markerElement.addEventListener("click", () => {
      console.log(onPopupClick);

      if (onPopupClick) {
        onPopupClick();
      }
    });

    // Cleanup when the component is unmounted
    return () => {
      marker.remove();
      popup.remove();
    };
  }, [map, coordinates, onPopupClick]);

  return null;
};

export default PlantedTreeMarker;
