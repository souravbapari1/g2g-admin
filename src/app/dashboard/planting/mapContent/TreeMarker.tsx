import React, { useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import mapboxgl from "mapbox-gl";
import { Tree } from "@/interfaces/treeOrders";
import { plantIcon } from "@/helper/plantIcon";
import { ageOfDays } from "@/helper/dateTime";

interface TreeMarkerProps {
  map: mapboxgl.Map;
  coordinates: [number, number];
  tree: Tree;
  color: string;
  point?: boolean;
  onPopupClick?: () => void;
  onDragEnd?: (newCoordinates: [number, number]) => void; // New prop for drag end
}

const TreeMarker: React.FC<TreeMarkerProps> = ({
  map,
  coordinates,
  color,
  tree,
  point,
  onPopupClick,
  onDragEnd,
}) => {
  useEffect(() => {
    // Create marker element
    const markerElement = document.createElement("div");
    markerElement.innerHTML = point
      ? /* html */ `<div style="width: 15px; height: 15px; cursor:pointer ; background: ${color}; border-radius: 100%; border: 2px solid #fff; display: flex; justify-content: center; align-items: center;"></div>`
      : /* html */ `
    <div style="width: 30px; height: 30px; cursor:pointer ;transform: rotate(-45deg); display: flex; justify-content: center; align-items: center;">
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

    // Create Marker with popup and enable dragging
    const marker = new mapboxgl.Marker({
      element: markerElement,
      draggable: true,
    })
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
      if (onPopupClick) {
        onPopupClick();
      }
    });

    // Listen for drag end and provide new coordinates
    marker.on("dragend", () => {
      const newLngLat = marker.getLngLat();
      onDragEnd && onDragEnd([newLngLat.lng, newLngLat.lat]); // Call onDragEnd with new position
    });

    // Cleanup when the component is unmounted
    return () => {
      marker.remove();
      popup.remove();
    };
  }, [map, coordinates, onPopupClick, onDragEnd]);

  return null;
};

export default TreeMarker;

export function TreeMarkerPopup({ tree }: { tree: Tree }) {
  return (
    <div className="bg-white p-3">
      <p>ID : {tree.treeId}</p>
      <p>Name : {tree.treeName}</p>
      <p>Area Name: {tree.area.areaName}</p>
      <p>Location: {tree.location}</p>
      <p>Type: {tree.expand?.type?.name}</p>

      <p>Planted Date: {ageOfDays(tree.plant_date)} </p>

      <p className="capitalize">Status: {tree.status}</p>
    </div>
  );
}
