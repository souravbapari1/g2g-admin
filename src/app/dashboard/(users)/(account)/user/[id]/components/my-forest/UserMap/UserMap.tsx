"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { useMyDonation } from "../../orders/state/useMyDonations";
import { MAPBOX_ACCESS_TOKEN } from "@/components/mapbox/token";
import CustomMarker from "./marker";
import { PopupContent } from "@/app/dashboard/planting/mapContent/ProjectPopup";

function UserMap() {
  const { mydonation } = useMyDonation();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [center, setCenter] = useState<[number, number]>([
    57.22343956645474, 21.288218077111807,
  ]);
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.resize(); // Trigger a resize to fix rendering issues
    }
  }, []);
  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: center,
        zoom: 3,
      });
      mapRef.current.scrollZoom.disable();

      // Listen for the `load` event to know when the map is fully loaded
      mapRef.current.on("load", () => {
        setMapLoaded(true); // Set the state to true when the map is loaded
      });

      mapRef.current.on("click", (e) => {
        const { lng, lat } = e.lngLat;
        console.log(lng, lat);

        setCenter([lng, lat]);
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);
  return (
    <div>
      <div ref={mapContainerRef} style={{ height: " 20rem", width: "100%" }}>
        {mapLoaded &&
          mydonation.map((marker, index) => (
            <CustomMarker
              key={index}
              map={mapRef.current!}
              coordinates={[
                marker.expand.project.marker.position.lng,
                marker.expand.project.marker.position.lat,
              ]}
              image={"/icons" + marker.expand.project.marker.values.image}
              color={marker.expand.project.marker.values.color}
              PopupContent={<PopupContent data={marker.expand.project} />}
            />
          ))}
      </div>
    </div>
  );
}

export default UserMap;
