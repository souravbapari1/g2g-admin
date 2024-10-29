import { getTreeStateColor } from "@/helper/plantIcon";
import { Tree } from "@/interfaces/treeOrders";
import { TreePalm } from "lucide-react";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ageOfDays } from "@/helper/dateTime";
import { useMapContext } from "@/components/context/mapContext";

export default function TreeListItem({ tree }: { tree: Tree }) {
  const { map } = useMapContext();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="w-full">
          <div
            onClick={() =>
              map?.flyTo({
                center: [tree.area.position!.lng, tree.area.position!.lat],
                zoom: 22,
              })
            }
            className="w-full flex justify-between items-center cursor-pointer p-2 bg-white hover:bg-gray-200 border-b"
          >
            <div className="flex w-full gap-1 text-xs justify-start items-center ml-2">
              <TreePalm size={14} color={getTreeStateColor(tree.status)} />
              <p>ID : {tree.treeId}</p>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Name : {tree.treeName}</p>
          <p>Age : {ageOfDays(tree.plant_date)}</p>
          <p className="capitalize">Status : {tree.status}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
