type Coordinate = [number, number];

interface AreaInfo {
  id: string;
  area: number;
  areaName: string;
}

interface Feature {
  id: string;
  type: string;
  geometry: {
    coordinates: Coordinate[][];
    type: string;
  };
}

interface WorkAreaData {
  type: string;
  features: Feature[];
}

// Ray-casting algorithm to check if a point is inside a polygon
function isPointInPolygon(point: Coordinate, polygon: Coordinate[]): boolean {
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

function getAreaNameForCoordinates(
  coordinates: Coordinate,
  areaInfo: AreaInfo[],
  workAreaData: WorkAreaData
): { exist: boolean; areaName: string; areaId: string | null } {
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
        };
      }
    }
  }

  return {
    exist: false,
    areaName: "No Area Found",
    areaId: null,
  };
}
// Example Usage:
const areaInfo: AreaInfo[] = [
  {
    id: "aca594b1acdc56bfc0bf7c4e9b891082",
    area: 355019.97,
    areaName: "area 1",
  },
  {
    id: "e35c4039acdaac36dfe4effe7423ef0a",
    area: 609137.09,
    areaName: "area 2",
  },
  {
    id: "b7c3be837f35c4be3d7bf96070915007",
    area: 140553.57,
    areaName: "area 3",
  },
  { id: "ab3fda145a62799f832d390cf4fc133f", area: 8879.04, areaName: "area 4" },
  {
    id: "4c54ed5d24f3520abf0c740af82d9212",
    area: 26568.13,
    areaName: "area 5",
  },
];

const workAreaData: WorkAreaData = {
  type: "FeatureCollection",
  features: [
    {
      id: "aca594b1acdc56bfc0bf7c4e9b891082",
      type: "Feature",
      geometry: {
        coordinates: [
          [
            [57.07661501510441, 21.52990807099151],
            [57.083653925579995, 21.5297483689899],
            [57.08292428242049, 21.52545631193111],
            [57.075756611386794, 21.52553616531401],
            [57.07661501510441, 21.52990807099151],
          ],
        ],
        type: "Polygon",
      },
    },
    {
      id: "e35c4039acdaac36dfe4effe7423ef0a",
      type: "Feature",
      geometry: {
        coordinates: [
          [
            [57.0867012587739, 21.529149484921717],
            [57.0967445822578, 21.529209373439414],
            [57.09436251194492, 21.523539817590915],
            [57.08631497710189, 21.52302076268937],
            [57.0867012587739, 21.529149484921717],
          ],
        ],
        type: "Polygon",
      },
    },
    {
      id: "b7c3be837f35c4be3d7bf96070915007",
      type: "Feature",
      geometry: {
        coordinates: [
          [
            [57.09691626300153, 21.52435287871772],
            [57.1030109293894, 21.52453255013097],
            [57.095392596404054, 21.521298430700483],
            [57.094083530737066, 21.522675934815652],
            [57.09691626300153, 21.52435287871772],
          ],
        ],
        type: "Polygon",
      },
    },
    {
      id: "ab3fda145a62799f832d390cf4fc133f",
      type: "Feature",
      geometry: {
        coordinates: [
          [
            [57.10009235675241, 21.52974292443446],
            [57.100264037496174, 21.53034180605556],
            [57.10056447879688, 21.53042165675258],
            [57.101122441212624, 21.530361768733684],
            [57.10105806093415, 21.53018210453196],
            [57.10105806093415, 21.529603185033622],
            [57.100714699446684, 21.529463445499374],
            [57.10037133796027, 21.529483408298233],
            [57.10009235675241, 21.52974292443446],
          ],
        ],
        type: "Polygon",
      },
    },
    {
      id: "4c54ed5d24f3520abf0c740af82d9212",
      type: "Feature",
      geometry: {
        coordinates: [
          [
            [57.07676523575421, 21.523075208928546],
            [57.07657209491762, 21.52401349877627],
            [57.077194437613, 21.524173207082313],
            [57.07824598216496, 21.52357430002739],
            [57.07835328263022, 21.522875572008743],
            [57.07794554086428, 21.522456333585367],
            [57.077773860121596, 21.522356514734042],
            [57.07723735779868, 21.522336550955742],
            [57.07687253621836, 21.522636007343067],
            [57.07676523575421, 21.523075208928546],
          ],
        ],
        type: "Polygon",
      },
    },
  ],
};

const point: Coordinate = [57.07894554086428, 21.522556333585367];
const areaName = getAreaNameForCoordinates(point, areaInfo, workAreaData);
console.log(areaName);
