import React, { memo, useEffect } from "react";

interface PolygonLayerProps {
  map: mapboxgl.Map;
  id: string;
  coordinates: number[][]; // Coordinates array for the polygon
  fillColor?: string; // Optional fill color
  fillOpacity?: number; // Optional fill opacity
  lineColor?: string; // Optional outline color
  lineWidth?: number; // Optional outline width
}

const PolygonLayer: React.FC<PolygonLayerProps> = ({
  map,
  id,
  coordinates,
  fillColor = "",
  fillOpacity = 0,
  lineColor = "white",
  lineWidth = 1,
}) => {
  useEffect(() => {
    if (!map.getSource(id)) {
      // Add a new source for the polygon
      map.addSource(id, {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: [coordinates],
          },
        },
      });

      // Add the polygon fill layer
      map.addLayer({
        id: `${id}-fill`,
        type: "fill",
        source: id,
        paint: {
          "fill-color": fillColor,
          "fill-opacity": fillOpacity,
        },
      });

      // Add the polygon outline (line) layer
      map.addLayer({
        id: `${id}-outline`,
        type: "line",
        source: id,
        layout: {},
        paint: {
          "line-color": lineColor,
          "line-width": lineWidth,
        },
      });
    }

    return () => {
      const cleanUp = () => {
        try {
          map.removeLayer(`${id}-fill`);
          map.removeLayer(`${id}-outline`);
          map.removeSource(id);
        } catch (error) {
          console.log(error);
        }
      };
      cleanUp();
    };
  }, [map, id, coordinates, fillColor, fillOpacity, lineColor, lineWidth]);

  return null;
};

export default PolygonLayer;
