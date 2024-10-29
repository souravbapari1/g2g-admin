import React, { useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import mapboxgl from "mapbox-gl";
import { useMapContext } from "@/components/context/mapContext";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { PopupContent } from "./ProjectPopup";
import { setPlantingData } from "@/redux/Slices/plantingSlice";

interface ProjectMarkerProps {
  map: mapboxgl.Map;
  coordinates: [number, number];
  PopupContent: React.ReactElement;
  color: string;
  image: string;
  onPopupClick?: () => void; // Function to handle popup click
}

const ProjectMarker: React.FC<ProjectMarkerProps> = ({
  map,
  coordinates,
  PopupContent,
  color,
  image,
  onPopupClick,
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

    // Render popup content to HTML string and add a clickable button
    const popupContent = ReactDOMServer.renderToString(<>{PopupContent}</>);

    // Create Popup
    const popup = new mapboxgl.Popup({ offset: 20 }).setHTML(popupContent);

    // Create Marker with popup
    const marker = new mapboxgl.Marker({ element: markerElement })
      .setLngLat(coordinates)
      .addTo(map);

    // Show popup on hover (mouseenter)
    markerElement.addEventListener("mouseenter", () => {
      popup.addTo(map);
      popup.setLngLat(coordinates);
    });

    // Hide popup when the mouse leaves the marker (mouseleave)
    markerElement.addEventListener("mouseleave", () => {
      popup.remove();
    });

    markerElement.addEventListener("click", () => {
      if (onPopupClick) {
        onPopupClick();
      }
    });

    // Cleanup when the component is unmounted
    return () => {
      markerElement.remove();
      popup.remove();
    };
  }, [map, coordinates, image, PopupContent, onPopupClick]);

  return null;
};

export default ProjectMarker;

export function ProjectMarkerView() {
  const { map } = useMapContext();
  const platingSlice = useAppSelector((state) => state.plantingSlice);
  const dispatch = useAppDispatch();
  if (platingSlice.checkedProjectList?.length) {
    return (
      <div>
        {map &&
          platingSlice.checkedProjectList.map((order, index) => (
            <ProjectMarker
              key={index + order.id}
              map={map!}
              color={order.marker.values.color}
              PopupContent={<PopupContent data={order} />}
              coordinates={[
                order.marker.position.lng,
                order.marker.position.lat,
              ]}
              onPopupClick={() => {
                map?.flyTo({
                  center: [
                    order.marker.position.lng,
                    order.marker.position.lat,
                  ],
                  zoom: 16,
                });
                dispatch(
                  setPlantingData({
                    workingProject: order,
                  })
                );
              }}
              image={order.marker.values.image}
            />
          ))}
      </div>
    );
  }
  return (
    <div>
      {map &&
        !platingSlice.workingProject &&
        platingSlice.ordersList.map((order, index) => (
          <ProjectMarker
            key={index + order.id}
            map={map!}
            color={order.marker.values.color}
            PopupContent={<PopupContent data={order} />}
            coordinates={[order.marker.position.lng, order.marker.position.lat]}
            onPopupClick={() => {
              map?.flyTo({
                center: [order.marker.position.lng, order.marker.position.lat],
                zoom: 16,
              });
              dispatch(
                setPlantingData({
                  workingProject: order,
                })
              );
            }}
            image={order.marker.values.image}
          />
        ))}
    </div>
  );
}
