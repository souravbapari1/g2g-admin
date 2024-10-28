import { MapPin, Plus, TreePalm } from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tree } from "@/interfaces/treeOrders";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useMapContext } from "@/components/context/mapContext";

function TreeListView({ tree }: { tree: Tree }) {
  const { map } = useMapContext();
  const platingSlice = useAppSelector((state) => state.plantingSlice);
  const dispatch = useAppDispatch();
  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    id: string
  ) => {
    event.dataTransfer.setData("text/plain", id); // Set a meaningful value
  };

  const isWorking = platingSlice.workingTrees.find((t) => t.id === tree.id);

  return (
    <div
      onDragStart={(event) => handleDragStart(event, tree.id)}
      draggable={!isWorking}
      onClick={() => {
        if (isWorking) {
          if (isWorking?.area?.position) {
            map?.flyTo({
              center: [
                isWorking.area.position.lng,
                isWorking.area.position.lat,
              ],
              zoom: 22,
            });
          }
        }
      }}
      style={{
        opacity: isWorking ? 0.3 : 1,
        cursor: isWorking ? "pointer" : "move",
      }}
      className="py-2 px-3 border-t bg-white  border-gray-100 flex justify-between items-center"
    >
      <div className="flex gap-1 text-xs justify-start items-center ml-2">
        <TreePalm size={14} color="green" />
        <p>ID : {tree.treeId}</p>
      </div>
      <MapPin size={15} />
    </div>
  );
}

export default TreeListView;
