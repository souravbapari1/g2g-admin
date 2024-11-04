"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

import { useMapContext } from "@/components/context/mapContext";
import { Checkbox } from "@/components/ui/checkbox";
import { ProjectItem } from "@/interfaces/project";
import { Tree } from "@/interfaces/treeOrders";
import { setPlantingData } from "@/redux/Slices/plantingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import TreeListItem from "../filterView/TreeListItem";

function ProjectPreview({ data }: { data: ProjectItem }) {
  const platingSlice = useAppSelector((state) => state.plantingSlice);
  const dispatch = useAppDispatch();
  const { map } = useMapContext();

  const setWorkProject = () => {
    if (platingSlice.workingProject?.id === data.id) {
      map?.flyTo({
        center: [59.1601407041004, 22.2635482528096], // starting position [lng, lat]
        zoom: 5, // starting zoom
      });
      dispatch(
        setPlantingData({
          workingProject: null,
          workingOrder: null,
        })
      );
    } else {
      map?.flyTo({
        center: [data.marker.position.lng, data.marker.position.lat],
        zoom: 16,
      });

      dispatch(
        setPlantingData({
          workingProject: data,
        })
      );
    }
  };

  const setCheckedProject = () => {
    if (platingSlice.checkedProjectList?.includes(data)) {
      dispatch(
        setPlantingData({
          checkedProjectList: platingSlice.checkedProjectList?.filter(
            (project) => project.id !== data.id
          ),
        })
      );
    } else {
      dispatch(
        setPlantingData({
          checkedProjectList: [
            ...(platingSlice.checkedProjectList || []),
            data,
          ],
        })
      );
    }
  };

  return (
    <div className="border-b-gray-50 border-b select-none">
      <div className=" cursor-pointer w-full p-2 text-sm pl-3 gap-4 flex justify-between items-center bg-white ">
        {platingSlice.showSelected && (
          <Checkbox
            checked={platingSlice.checkedProjectList?.includes(data)}
            onClick={setCheckedProject}
          />
        )}
        <div
          className="flex justify-between items-center w-full"
          onClick={() => setWorkProject()}
        >
          <p>
            {data.name.slice(0, 22) + `${data.name.length > 22 ? "..." : ""}`} -{" "}
            {Object.keys(data.byArea || {})
              .map((key) => data.byArea![key].length)
              .reduce((a, b) => a + b, 0)}{" "}
            Trees
          </p>
          {platingSlice.workingProject?.id === data.id ? (
            <ChevronDown size={18} />
          ) : (
            <ChevronRight size={18} />
          )}
        </div>
      </div>
      <div className="">
        {platingSlice.workingProject?.id === data.id && (
          <div>
            {Object.keys(data.byArea || {}).map((key) => {
              return <PreviewProjectArea data={data} key={key} name={key} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectPreview;

function PreviewProjectArea({
  data,
  name,
}: {
  name: string;
  data: ProjectItem;
}) {
  const [open, setOpen] = useState(false);
  const { map } = useMapContext();
  return (
    <div className="">
      <div
        onClick={() => {
          const weorkspace = getCenterLatLng(name, data.workareas);
          if (weorkspace && !open) {
            map?.flyTo({
              center: [weorkspace.lng, weorkspace.lat],
              zoom: 18,
            });
          }
          setOpen(!open);
        }}
        className="flex sticky top-0  cursor-pointer justify-between items-center bg-green-50 px-3 pr-2 text-sm border-b border-white py-2"
      >
        <p>
          {name} <small>({data.byArea![name].length} Trees)</small>
        </p>
        {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </div>
      {open &&
        data.byArea![name]?.map((tree: Tree) => <TreeListItem tree={tree} />)}
    </div>
  );
}

function getCenterLatLng(areaName: string, fullData: ProjectItem["workareas"]) {
  // Find area ID from areaInfo using areaName
  const areaInfo = fullData.areaInfo.find((area) => area.areaName === areaName);
  if (!areaInfo) {
    return null;
  }

  // Find the matching feature in workAreaData using the area ID
  const areaFeature = fullData.workAreaData.features.find(
    (feature) => feature.id === areaInfo.id
  );
  if (!areaFeature) {
    return null;
  }

  const coordinates = areaFeature.geometry.coordinates[0]; // Polygon coordinates

  // Calculate centroid
  let totalLat = 0;
  let totalLng = 0;
  coordinates.forEach(([lng, lat]) => {
    totalLat += lat;
    totalLng += lng;
  });

  const numPoints = coordinates.length;
  const centerLat = totalLat / numPoints;
  const centerLng = totalLng / numPoints;

  return { lat: centerLat, lng: centerLng };
}
