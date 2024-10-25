"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import { Map } from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import { MAPBOX_ACCESS_TOKEN } from "@/components/mapbox/token";
import { Plus, Trees } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setPlantingData } from "@/redux/Slices/plantingSlice";
import PlantingOption from "./filterBox/PlantingOption";
import { cn } from "@/lib/utils";
import PolygonLayer from "./maoContent/PolygonLayer";
import TreeMarker from "./maoContent/TreeMarker";

function MapView() {
  const platingSlice = useAppSelector((state) => state.plantingSlice);
  const dispatch = useAppDispatch();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);

  const [location, setLocation] = useState<[number, number]>([59, 22]);

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current as HTMLElement,
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 0, // starting zoom
      style: "mapbox://styles/mapbox/satellite-v8",
    });
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      if (platingSlice.workingProject) {
        mapRef.current?.flyTo({
          center: {
            lat: platingSlice.workingProject.marker.position.lat,
            lng: platingSlice.workingProject.marker.position.lng,
          },
          zoom: 16,
        });
      } else {
        mapRef.current?.flyTo({
          center: {
            lat: 59.16210408109862,
            lng: 22.259248924825812,
          },
          zoom: 0,
        });
      }
    }
  }, [platingSlice.workingProject]);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text/plain", "tree"); // Set a meaningful value
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (!mapRef.current) return;

    const map = mapRef.current;
    const { left, top } = map.getContainer().getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;

    const { lng, lat } = map.unproject([x, y]);
    setLocation([lng, lat]); // Ensure the order is [lng, lat]
    console.log("Dropped at:", { latitude: lat, longitude: lng });
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Necessary to allow a drop
  };

  return (
    <div className="z-10">
      <div
        draggable
        onDragStart={handleDragStart}
        style={{
          width: "100px",
          zIndex: 1000,
          height: "50px",
          backgroundColor: "skyblue",
          margin: "10px",
          cursor: "grab",
          textAlign: "center",
          lineHeight: "50px",
        }}
      >
        Drag me
      </div>
      {platingSlice.openTreesPanel && <PlantingOption />}
      <div className="fixed top-0 right-0 p-4 shadow-lg flex justify-center items-center gap-4 bg-white z-10">
        <Button
          variant="outline"
          className="rounded-none"
          onClick={() => {
            dispatch(
              setPlantingData({
                openTreesPanel: !platingSlice.openTreesPanel,
              })
            );
          }}
        >
          <Trees />
          <p>{platingSlice.openTreesPanel ? "Close" : "Map New Tree"}</p>
        </Button>
      </div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        ref={mapContainerRef}
        className={cn("w-screen h-screen -z-10")}
      >
        {mapRef.current && (
          <TreeMarker
            map={mapRef.current}
            color="green"
            PopupContent={<Trees />}
            coordinates={location}
            onDragEnd={(coordinates) => setLocation(coordinates)}
            image="/assets/tree.png"
          />
        )}
        {mapRef.current &&
          platingSlice.workingProject?.workareas.workAreaData.features.map(
            (polygon, index) => (
              <PolygonLayer
                key={polygon.id}
                map={mapRef.current!}
                id={polygon.id}
                coordinates={polygon.geometry.coordinates[0]}
                fillColor={"green"}
                fillOpacity={0}
                lineColor={"white"}
                lineWidth={4}
              />
            )
          )}
      </div>
    </div>
  );
}

export default MapView;
