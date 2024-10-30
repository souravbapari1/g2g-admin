"use client";

import { useMapContext } from "@/components/context/mapContext";
import { MAPBOX_ACCESS_TOKEN } from "@/components/mapbox/token";
import { Button } from "@/components/ui/button";
import { getAreaNameForCoordinates } from "@/helper/getAreaName";
import { cn } from "@/lib/utils";
import { setPlantingData } from "@/redux/Slices/plantingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { Trees } from "lucide-react";
import mapboxgl, { Map } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import { ManagePlantBox } from "./filterBox/ManagePlantBox";
import PlantingOption from "./filterBox/PlantingOption";
import PlacedTreesMarks from "./mapContent/PlacedTreesMarks";
import PlantedFixedTreesMark from "./mapContent/PlantedFixedTreesMark";
import PolygonLayer from "./mapContent/PolygonLayer";
import ProjectMarker, { ProjectMarkerView } from "./mapContent/ProjectMarker";
import { PopupContent } from "./mapContent/ProjectPopup";
import TreeReport from "./TreeReport/TreeReport";
import toast from "react-hot-toast";

function MapView() {
  const { setMap } = useMapContext();
  const platingSlice = useAppSelector((state) => state.plantingSlice);
  const dispatch = useAppDispatch();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);

  const [style, setStyle] = useState(true);

  useEffect(() => {
    // Function to handle keypress
    const handleKeyDown = (event: any) => {
      // Check for Ctrl + S (or Command + S on Mac)
      if ((event.ctrlKey || event.metaKey) && event.key === "b") {
        event.preventDefault(); // Prevent the default save action
        dispatch(
          setPlantingData({ openTreesPanel: !platingSlice.openTreesPanel })
        );
      }

      if ((event.ctrlKey || event.metaKey) && event.key === "m") {
        event.preventDefault(); // Prevent default action if needed
        if (style) {
          mapRef.current?.setStyle("mapbox://styles/mapbox/standard-satellite");
        } else {
          mapRef.current?.setStyle("mapbox://styles/mapbox/satellite-v9");
        }
        setStyle(!style);
      }

      if (event.key === "Delete") {
        event.preventDefault(); // Prevent default action if needed
        confirm("Are you sure you want to clear all?") &&
          dispatch(
            setPlantingData({
              selectedTree: null,
              workingOrder: null,
              workingTrees: [],
              reportTree: null,
              filterOrdersList: null,
              workingProject: null,
              openOrderMenu: null,
            })
          );
      }
    };

    // Add the event listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [platingSlice.openTreesPanel, style, mapRef.current]);

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current as HTMLElement,
      center: [59.1601407041004, 22.2635482528096], // starting position [lng, lat]
      zoom: 5, // starting zoom
      style: "mapbox://styles/mapbox/satellite-v9",
      attributionControl: false,
    });
    const nav = new mapboxgl.NavigationControl();
    mapRef.current.addControl(nav, "bottom-right");
    mapRef.current.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl as any,
        marker: false,
        collapsed: true,
        placeholder: "Search for trees",
      })
    );
    mapRef.current.dragRotate.disable();
    mapRef.current.touchZoomRotate.disableRotation();

    setMap(mapRef.current);
  }, []);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const treeId = event.dataTransfer.getData("text/plain");

    if (!mapRef.current) return;

    const map = mapRef.current;
    const { left, top } = map.getContainer().getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;

    const { lng, lat } = map.unproject([x, y]);

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
        if (!getAreaInfo.exist) {
          toast.dismiss();
          toast.error("Area not part of this project");
        }
        dispatch(
          setPlantingData({
            workingTrees: [
              ...platingSlice?.workingTrees,
              {
                ...tree,
                location: `${lng}, ${lat}`,
                area: {
                  areaName: getAreaInfo.areaName,
                  id: getAreaInfo.areaId as string,
                  areaType: getAreaInfo.areaType,
                  area: 0,
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
      <PlantingOption />

      <div className="fixed top-2 left-2 shadow-lg flex justify-center items-center gap-4 z-10">
        <Button
          variant="secondary"
          className="rounded-md shadow-sm"
          onClick={() => {
            dispatch(
              setPlantingData({
                openTreesPanel: !platingSlice.openTreesPanel,
              })
            );
          }}
        >
          <Trees />
          <p>
            {platingSlice.openTreesPanel
              ? "Panel (CTRL + B)"
              : "Panel (CTRL + B)"}
          </p>
        </Button>
      </div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        ref={mapContainerRef}
        className={cn("w-screen h-screen -z-10")}
      >
        <ProjectMarkerView />
        <PlantedFixedTreesMark />
        <PlacedTreesMarks />
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
      <TreeReport />
    </div>
  );
}

export default MapView;
