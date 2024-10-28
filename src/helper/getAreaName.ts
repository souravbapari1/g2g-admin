import { WorkAreaData } from "@/interfaces/project";

type Coordinate = [number, number];

interface AreaInfo {
  id: string;
  area: number;
  areaName: string;
  areaType: string;
}

// Ray-casting algorithm to check if a point is inside a polygon
function isPointInPolygon(point: Coordinate, polygon: any[]): boolean {
  const [x, y] = point;
  let isInside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];

    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

    if (intersect) isInside = !isInside;
  }

  return isInside;
}

export function getAreaNameForCoordinates(
  coordinates: Coordinate,
  areaInfo: AreaInfo[],
  workAreaData: WorkAreaData
): {
  exist: boolean;
  areaName: string;
  areaId: string | null;
  areaType: string;
} {
  const { features } = workAreaData;

  for (let feature of features) {
    const polygon = feature.geometry.coordinates[0]; // Assuming a single polygon per feature
    if (isPointInPolygon(coordinates, polygon)) {
      const area = areaInfo.find((info) => info.id === feature.id);
      if (area) {
        return {
          exist: true,
          areaName: area.areaName,
          areaId: area.id,
          areaType: area.areaType,
        };
      }
    }
  }

  return {
    exist: false,
    areaName: "No Area Found",
    areaId: null,
    areaType: "Unknown",
  };
}
