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
import PolygonLayer from "./mapContent/PolygonLayer";
import TreeMarker from "./mapContent/TreeMarker";
import ProjectMarker from "./mapContent/ProjectMarker";
import { PopupContent } from "./mapContent/ProjectPopup";
import { useMapContext } from "@/components/context/mapContext";
import { getAreaNameForCoordinates } from "@/helper/getAreaName";
import PlantedTreesMark from "./filterBox/PlantedTreesMark";
import { ManagePlantBox } from "./filterBox/ManagePlantBox";

function MapView() {
  const { setMap } = useMapContext();
  const platingSlice = useAppSelector((state) => state.plantingSlice);
  const dispatch = useAppDispatch();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);

  const [location, setLocation] = useState<[number, number]>([59, 22]);

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current as HTMLElement,
      center: [59.1601407041004, 22.2635482528096], // starting position [lng, lat]
      zoom: 5, // starting zoom
      style: "mapbox://styles/mapbox/satellite-v8",
    });
    setMap(mapRef.current);
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      const targetLocation = platingSlice.workingProject
        ? [
            platingSlice.workingProject.marker.position.lng,
            platingSlice.workingProject.marker.position.lat,
          ]
        : [59.1601407041004, 22.2635482528096];

      mapRef.current.flyTo({
        center: targetLocation as any,
        zoom: platingSlice.workingProject ? 16 : 5,
      });
    }
  }, [platingSlice.workingProject]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const treeId = event.dataTransfer.getData("text/plain");

    if (!mapRef.current) return;

    const map = mapRef.current;
    const { left, top } = map.getContainer().getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;

    const { lng, lat } = map.unproject([x, y]);
    setLocation([lng, lat]); // Ensure the order is [lng, lat]

    // Optionally fly to the dropped location

    const tree = platingSlice.workingOrder?.expand.trees.find((tree) => {
      return tree.id === treeId;
    });

    if (tree) {
      const project = platingSlice.ordersList.find(
        (proj) => proj.id === tree.project
      );
      if (project) {
        const getAreaInfo = getAreaNameForCoordinates(
          [lng, lat],

          project.workareas.areaInfo,
          project.workareas.workAreaData as any
        );
        dispatch(
          setPlantingData({
            workingTrees: [
              ...platingSlice?.workingTrees,
              {
                ...tree,
                location: `${lng}, ${lat}`,
                area: {
                  areaName: getAreaInfo.areaName,
                  areaId: getAreaInfo.areaId,

                  position: {
                    lng,
                    lat,
                  },
                },
              },
            ],
          })
        );
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Necessary to allow a drop
  };

  return (
    <div className="z-10">
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
        {mapRef.current &&
          !platingSlice.workingProject &&
          platingSlice.ordersList.map((order, index) => (
            <ProjectMarker
              map={mapRef.current!}
              color={order.marker.values.color}
              PopupContent={<PopupContent data={order} />}
              coordinates={[
                order.marker.position.lng,
                order.marker.position.lat,
              ]}
              onPopupClick={() => {
                dispatch(
                  setPlantingData({
                    workingProject: order,
                  })
                );
              }}
              image={order.marker.values.image}
            />
          ))}
        <PlantedTreesMark />
        {mapRef.current &&
          platingSlice.workingProject?.workareas.workAreaData.features.map(
            (polygon) => (
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
      <ManagePlantBox />
    </div>
  );
}

export default MapView;
