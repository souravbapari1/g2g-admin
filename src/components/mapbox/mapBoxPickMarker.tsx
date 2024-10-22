"use client";

import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl, { Map, Marker } from "mapbox-gl";
import Image from "next/image";
import { memo, useEffect, useRef, useState } from "react";
import { MAPBOX_ACCESS_TOKEN } from "./token";

export const MarkerImages: string[] = [
  "/assets/tree.svg",
  "/assets/bilding.svg",
  "/assets/bird.svg",
  "/assets/fence.svg",
  "/assets/plants.svg",
  "/assets/roots.svg",
  "/assets/work.svg",
  "/assets/plastic.svg",
];

const colorCodes = [
  "#FF5733", // Red
  "#33FF57", // Green
  "#3357FF", // Blue
  "#FF33B5", // Pink
  "#33FFF5", // Cyan
  "#FF8333", // Orange
  "#D033FF", // Purple
  "#000000", // Black
];

const initialPosition = {
  lng: 57.08931566976014,
  lat: 21.526009097893223,
};

const createMarkerHtml = ({
  color,
  image,
}: {
  color: string;
  image: string;
}) => `
      <div style="width: 30px; height: 30px; background-color: ${color}; border-radius: 50%; border-bottom-left-radius: 2px;  transform: rotate(-45deg); display: flex; justify-content: center; align-items: center; box-shadow: -2px 2px 8px rgba(0, 0, 0, 0.16);">
        <div style="transform: rotate(45deg); width: 100%; display: flex; justify-content: center; align-items: center;">
          <img src="${image}" style="width: 16px; height: 16px;" />
        </div>
      </div>
    `;

export type MapBoxPickMarkerProps = {
  position: { lat: number; lng: number };
  colorIndex: number;
  markerTypeIndex: number;
  values: {
    color: string;
    image: string;
  };
};

function MapBoxPickMarker({
  markerData,
  onPick,
}: {
  markerData?: MapBoxPickMarkerProps;
  onPick: (data: MapBoxPickMarkerProps) => void;
}) {
  const [color, setColor] = useState<number>(markerData?.colorIndex || 0);
  const [markerType, setMarkerType] = useState<number>(
    markerData?.markerTypeIndex || 0
  );

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const markerRef = useRef<Marker | null>(null);
  const [position, setPosition] = useState(
    markerData?.position || initialPosition
  );

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    const initializeMap = new mapboxgl.Map({
      container: mapContainerRef.current as HTMLElement,
      style: "mapbox://styles/mapbox/streets-v8",
      center: [initialPosition.lng, initialPosition.lat],
      zoom: 8,
    });
    initializeMap.dragRotate.disable();
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl as any,
      marker: false,
      placeholder: "Search for a location",
    });
    initializeMap.addControl(geocoder);

    mapRef.current = initializeMap;

    return () => initializeMap.remove();
  }, []);

  useEffect(() => {
    mapRef.current?.on("click", (event) => {
      const { lng, lat } = event.lngLat;
      setPosition({ lng, lat });
      updateMarker(lng, lat, colorCodes[color], MarkerImages[markerType]);
    });

    mapRef.current?.on("load", () => {
      updateMarker(
        position.lng,
        position.lat,
        colorCodes[color],
        MarkerImages[markerType]
      );
    });

    updateMarker(
      position.lng,
      position.lat,
      colorCodes[color],
      MarkerImages[markerType]
    );
    onPick({
      position,
      colorIndex: color,
      markerTypeIndex: markerType,
      values: {
        color: colorCodes[color],
        image: MarkerImages[markerType],
      },
    });
  }, [color, markerType, position]);

  useEffect(() => {
    mapRef.current?.flyTo({
      center: [position.lng, position.lat],
      zoom: 10,
      curve: 1,
      easing(t) {
        return t;
      },
    });
  }, []);

  useEffect(() => {
    if (markerData?.position) {
      setColor(markerData.colorIndex);
      setMarkerType(markerData.markerTypeIndex);
      setPosition(markerData.position);
      mapRef.current?.flyTo({
        center: [markerData.position.lng, markerData.position.lat],
        zoom: 10,
        curve: 1,
      });
    } else {
      mapRef.current?.flyTo({
        center: [position.lng, position.lat],
        zoom: 10,
        curve: 1,
      });

      setPosition(initialPosition);
      setColor(0);
      setMarkerType(0);
    }
  }, [markerData]);

  const updateMarker = (
    lng: number,
    lat: number,
    color: string,
    image: string
  ) => {
    if (markerRef.current) markerRef.current.remove();

    const customMarkerElement = document.createElement("div");
    customMarkerElement.innerHTML = createMarkerHtml({ color, image });

    const marker = new Marker({
      element: customMarkerElement,
      draggable: true,
    })
      .setLngLat([lng, lat])
      .addTo(mapRef.current!);

    markerRef.current = marker;
    marker.on("dragend", () => setPosition(marker.getLngLat()));
  };

  return (
    <div>
      <div className="">
        <div className="flex w-full justify-between items-center">
          <div className=" flex  flex-row justify-center w-full items-center pl-14  gap-3">
            {MarkerImages.map((e, i) => {
              return (
                <div
                  key={i}
                  style={{
                    backgroundColor: colorCodes[color],
                  }}
                  onClick={() => {
                    setMarkerType(i);
                  }}
                  className="w-8 h-8 rounded-full flex justify-center items-center shadow-md rounded-br-md rotate-45   cursor-pointer"
                >
                  <Image
                    src={e}
                    alt=""
                    width={100}
                    height={100}
                    className="w-3 h-3 -rotate-45"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mr-5">
        <div className="w-20 h-full flex  justify-center items-center flex-col gap-5 mr-2">
          {colorCodes.map((e, i) => {
            return (
              <div
                key={i}
                style={{
                  backgroundColor: e,
                }}
                className="w-10 h-10 rounded-full shadow-md border-2 border-white cursor-pointer"
                onClick={() => {
                  setColor(i);
                }}
              />
            );
          })}
        </div>
        <div
          ref={mapContainerRef}
          className="w-full h-[70vh] mt-5 overflow-hidden rounded-2xl shadow-lg"
        ></div>
      </div>
      <p className="text-center mt-5">
        lat: {position.lat} , lng: {position.lng}
      </p>
    </div>
  );
}

export default MapBoxPickMarker;
