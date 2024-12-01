"use client";

import { useMapContext } from "@/components/context/mapContext";
import { MAPBOX_ACCESS_TOKEN } from "@/components/mapbox/token";
import { getAreaNameForCoordinates } from "@/helper/getAreaName";
import { Tree } from "@/interfaces/treeOrders";
import { cn } from "@/lib/utils";
import { setPlantingData } from "@/redux/Slices/plantingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl, { Map } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ManagePlantBox } from "./filterBox/ManagePlantBox";
import PlantingOption from "./filterBox/PlantingOption";
import MapActionBtns from "./mapContent/MapActionBtns";
import PlacedTreesMarks from "./mapContent/PlacedTreesMarks";
import PlantedFixedTreesMark from "./mapContent/PlantedFixedTreesMark";
import PointedTrees from "./mapContent/PointedTrees";
import PolygonLayer from "./mapContent/PolygonLayer";
import { ProjectMarkerView } from "./mapContent/ProjectMarker";
import TreeReport from "./TreeReport/TreeReport";
import FilterTreesPointer from "./mapContent/FilterTreesPointer";

function MapView() {
  const searchParams = useSearchParams();
  const { setMap } = useMapContext();
  const platingSlice = useAppSelector((state) => state.plantingSlice);
  const dispatch = useAppDispatch();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);

  const [style, setStyle] = useState(true);

  // MapBox view
  const projectId = searchParams.get("projectId");
  const orderId = searchParams.get("orderId");
  const treeId = searchParams.get("treeId");

  // for url redirect tree
  useEffect(() => {
    // Set working project, order and tree when given by url
    // This is used when someone shares a link to a specific tree
    if (!(projectId && orderId && treeId)) return;

    // Avoid setting the working project, order and tree too quickly
    // When the user navigates to a new page, the app will re-render
    // and the map will be loaded again. This will cause the map to fly
    // to the new position too quickly, which is annoying for the user.
    // This is why we use a timer to delay the action.
    const timer = setTimeout(() => {
      // Find the project, order and tree that was given by the url
      const workingProject = platingSlice.ordersList?.find(
        (proj) => proj.id === projectId
      );

      if (!workingProject) return;

      const workingOrder = workingProject.orders?.find(
        (order) => order.id === orderId
      );

      if (!workingOrder) return;

      const workingTree = workingOrder.expand?.trees?.find(
        (tree) => tree.id === treeId
      );

      if (!workingTree) return;

      // Fly to the position of the tree
      mapRef.current?.flyTo({
        center: [
          workingTree.area.position!.lng,
          workingTree.area.position!.lat,
        ],
        zoom: 22,
      });

      // Set the working project and order
      dispatch(
        setPlantingData({
          workingProject,
          workingOrder,
        })
      );
    }, 2000);

    // Clear the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, [projectId, orderId, treeId]);

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
    const newGl = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl as any,
      marker: false,
      collapsed: true,
      placeholder: "Search for trees",
    });

    mapRef.current.addControl(newGl as any);
    mapRef.current.dragRotate.disable();
    mapRef.current.touchZoomRotate.disableRotation();

    setMap(mapRef.current);
  }, []);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const treeId: Tree = JSON.parse(
      event.dataTransfer.getData("application/json")
    );

    if (!mapRef.current) return;

    const map = mapRef.current;
    const { left, top } = map.getContainer().getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;

    const { lng, lat } = map.unproject([x, y]);

    // Optionally fly to the dropped location

    const tree = platingSlice.workingOrder?.expand.trees.find((tree) => {
      return tree.id === treeId.id;
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
                  areaId: getAreaInfo.areaId as string,
                  color: getAreaInfo.color,
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
      {/* // markers for projects */}
      <ProjectMarkerView />
      {/* // onl plated tress  */}
      <PlantedFixedTreesMark />
      {/* // new placed trees marker  */}
      <PlacedTreesMarks />
      {/* actions Panels  */}
      <PointedTrees />
      <ManagePlantBox />
      <TreeReport />
      {/* actions button  */}
      <MapActionBtns />
      <FilterTreesPointer />

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        ref={mapContainerRef}
        className={cn("w-screen h-screen -z-10")}
      >
        {mapRef.current &&
          !platingSlice.showSelected &&
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

        {mapRef.current &&
          platingSlice.showSelected &&
          platingSlice.checkedProjectList?.map((project) =>
            project.workareas.workAreaData.features.map((polygon) => (
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
            ))
          )}
      </div>
    </div>
  );
}

export default MapView;
