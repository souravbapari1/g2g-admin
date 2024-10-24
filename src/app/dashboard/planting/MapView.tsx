"use client";

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
function MapView() {
  const platingSlice = useAppSelector((state) => state.plantingSlice);
  const dispatch = useAppDispatch();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    // TO MAKE THE MAP APPEAR YOU MUST
    // ADD YOUR ACCESS TOKEN FROM
    // https://account.mapbox.com
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current as HTMLElement,
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 0, // starting zoom
    });
  }, []);

  return (
    <div className="z-10">
      {platingSlice.openTreesPanel && <PlantingOption />}
      <div className="fixed top-0 right-0 p-4 shadow-lg  flex justify-center items-center gap-4 bg-white z-10">
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
        ref={mapContainerRef}
        className={cn("w-screen h-screen -z-10")}
      ></div>
    </div>
  );
}

export default MapView;
