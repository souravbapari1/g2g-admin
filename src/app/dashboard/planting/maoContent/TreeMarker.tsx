import React, { useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import mapboxgl from "mapbox-gl";

interface TreeMarkerProps {
  map: mapboxgl.Map;
  coordinates: [number, number];
  PopupContent: React.ReactElement;
  color: string;
  image: string;
  onPopupClick?: () => void;
  onDragEnd?: (newCoordinates: [number, number]) => void; // New prop for drag end
}

const TreeMarker: React.FC<TreeMarkerProps> = ({
  map,
  coordinates,
  PopupContent,
  color,
  image,
  onPopupClick,
  onDragEnd,
}) => {
  useEffect(() => {
    // Create marker element
    const markerElement = document.createElement("div");
    markerElement.innerHTML = /* html */ `
    <div style="width: 30px; height: 30px; cursor:pointer; background-color: ${color}; border-radius: 50% 50% 50% 10%; transform: rotate(-45deg); display: flex; justify-content: center; align-items: center; box-shadow: -2px 2px 8px 0 rgba(0, 0, 0, 0.16);">
     <div style="transform: rotate(45deg); height: 100%; width: 100%; display: flex; justify-content: center; align-items: center;">
         <img src="${image}" style="width: 16px; height: 16px;" />
     </div>
    </div>`;

    // Render popup content to HTML string
    const popupContent = ReactDOMServer.renderToString(<>{PopupContent}</>);

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
  }, [map, coordinates, color, image, PopupContent, onPopupClick, onDragEnd]);

  return null;
};

export default TreeMarker;
