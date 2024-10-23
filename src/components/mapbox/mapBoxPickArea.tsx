"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as turf from "@turf/turf";
import { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import mapboxgl, { LngLatLike, Map } from "mapbox-gl";
import { memo, useEffect, useRef, useState } from "react";
import { MAPBOX_ACCESS_TOKEN } from "./token";

export type WorkAreaData = FeatureCollection<Geometry, GeoJsonProperties>;
export type AreaInfo = {
  id: string | number | undefined;
  area: number;
  areaName: string;
};

export type MapBoxPickAreaProps = {
  defaultAreaData: {
    workAreaData: WorkAreaData | null;
    areaInfo: AreaInfo[] | null;
  };
  flyTo?: LngLatLike;
  onDataChange: ({
    areaInfo,
    workAreaData,
  }: {
    workAreaData: WorkAreaData | null;
    areaInfo: AreaInfo[] | null;
  }) => void;
};

function MapBoxPickArea({
  defaultAreaData,
  onDataChange,
  flyTo,
}: MapBoxPickAreaProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const [draw, setDraw] = useState<MapboxDraw | null>(null);
  const [polygons, setPolygons] = useState<WorkAreaData | null>(
    defaultAreaData.workAreaData
  );
  const [areaInfo, setAreaInfo] = useState<AreaInfo[] | null>(
    defaultAreaData.areaInfo
  );

  useEffect(() => {
    // Set the Mapbox access token
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    // Initialize the map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current as HTMLElement,
      style: "mapbox://styles/mapbox/satellite-v9",
      center: [57.08931566976014, 21.526009097893223],
      zoom: 0,
    });

    mapRef.current.dragRotate.disable();

    // Initialize MapboxDraw
    const drawInstance = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
      defaultMode: "draw_polygon",
      styles: [
        {
          id: "gl-draw-polygon-fill-inactive",
          type: "fill",
          paint: {
            "fill-color": "#888",
            "fill-opacity": 0,
          },
        },
        {
          id: "gl-draw-polygon-stroke-inactive",
          type: "line",
          paint: {
            "line-color": "#fff",
            "line-width": 2,
          },
        },
        {
          id: "gl-draw-polygon-fill-active",
          type: "fill",
          paint: {
            "fill-color": "#fff",
            "fill-opacity": 0,
          },
        },
        {
          id: "gl-draw-polygon-stroke-active",
          type: "line",
          paint: {
            "line-color": "#fff",
            "line-width": 2,
          },
        },
      ],
    });
    // Set draw instance and add to map
    setDraw(drawInstance);
    mapRef.current.addControl(drawInstance);
    // Automatically switch to draw_polygon mode
    drawInstance.changeMode("draw_polygon");
    if (defaultAreaData.workAreaData) {
      drawInstance.add(defaultAreaData.workAreaData);
    }
    function updateArea() {
      const data = drawInstance.getAll();
      setPolygons(data);
    }

    mapRef?.current?.on("draw.create", updateArea);
    mapRef?.current?.on("draw.delete", updateArea);
    mapRef?.current?.on("draw.update", updateArea);

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.off("draw.create", updateArea);
        mapRef.current.off("draw.delete", updateArea);
        mapRef.current.off("draw.update", updateArea);
      }
    };
  }, []);

  useEffect(() => {
    if (polygons) {
      const areaData = polygons.features.map((polygon) => {
        const existingAreaName = areaInfo?.find(
          (area) => area.id === polygon.id
        );
        const area = turf.area(polygon);
        return {
          id: polygon.id,
          area: Math.round(area * 100) / 100, // m²
          areaName: existingAreaName?.areaName || "",
        };
      });

      const validAreaData = areaData.filter((area) => area.area > 0);

      setAreaInfo((prevAreaInfo) => {
        const updatedAreaInfo = validAreaData.map((newArea) => {
          const existing = prevAreaInfo?.find((a) => a.id === newArea.id);
          return existing
            ? { ...newArea, areaName: existing.areaName }
            : newArea;
        });
        return updatedAreaInfo;
      });
    }
  }, [polygons]);

  useEffect(() => {
    if (flyTo) {
      mapRef?.current?.flyTo({ center: flyTo, zoom: 15 });
    }
  }, [flyTo]);

  useEffect(() => {
    if (defaultAreaData.workAreaData) {
      draw?.add(defaultAreaData.workAreaData);
    }
    if (defaultAreaData.areaInfo && areaInfo == null) {
      setAreaInfo(defaultAreaData.areaInfo.filter((a) => a.area > 0));
    }
  }, [defaultAreaData]);

  useEffect(() => {
    if (areaInfo) {
      onDataChange({
        areaInfo: areaInfo.filter((a) => a.area > 0),
        workAreaData: polygons ? removeInvalidPolygons(polygons) : polygons,
      });
    }
  }, [areaInfo, polygons]);

  return (
    <>
      <div
        ref={mapContainerRef}
        className="w-full h-[70vh] rounded-2xl overflow-hidden shadow-lg"
      ></div>

      {areaInfo && (
        <div className="grid grid-cols-3 gap-4 mt-10">
          {areaInfo.map((area) => (
            <Card key={area.id}>
              <CardHeader>
                <div className="w-full">
                  <Label>Area Name</Label>
                  <Input
                    value={area.areaName}
                    onChange={(e) => {
                      const updatedAreaInfo = areaInfo.map((a) => {
                        if (a.id === area.id) {
                          return {
                            ...a,
                            areaName: e.target.value,
                          };
                        }
                        return a;
                      });
                      setAreaInfo(updatedAreaInfo.filter((a) => a.area != 0));
                      onDataChange({
                        areaInfo: updatedAreaInfo.filter((a) => a.area != 0),
                        workAreaData: polygons
                          ? removeInvalidPolygons(polygons)
                          : polygons,
                      });
                    }}
                    placeholder="Area Name"
                    className="mt-1"
                  />
                </div>
              </CardHeader>
              <CardContent className="">
                <p className="text-xs text-ellipsis line-clamp-1 mb-3">
                  Area ID: {area.id}
                </p>
                <div className="flex items-center justify-between gap-4">
                  <div className="">
                    <p className="text-sm font-bold">{area.area} m2</p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      if (draw) {
                        const res = draw.delete(`${area.id}`);
                        setPolygons(removeNullCoordinates(res.getAll()));
                      }
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

export default MapBoxPickArea;

function removeNullCoordinates(geoJson: any) {
  // Filter the features array to remove any feature with null coordinates
  const filteredFeatures = geoJson.features.filter((feature: any) => {
    // Check if the geometry coordinates contain null values
    const coordinates = feature.geometry.coordinates.flat(Infinity);
    return !coordinates.includes(null);
  });

  // Return the updated GeoJSON object with valid features
  return {
    ...geoJson,
    features: filteredFeatures,
  };
}

function removeInvalidPolygons(workAreaData: WorkAreaData) {
  const filteredFeatures = workAreaData.features.filter((feature) => {
    // Check if the feature is a Polygon and has at least 3 coordinate points
    return (
      feature.geometry.type === "Polygon" &&
      feature.geometry.coordinates[0].length >= 3
    );
  });

  return {
    ...workAreaData,
    features: filteredFeatures,
  };
}
