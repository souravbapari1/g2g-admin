import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { setPlantingData } from "@/redux/Slices/plantingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Disc, Move, Plus, Trees } from "lucide-react";
import React from "react";
import NewOrder from "../NewOrder";
import { useGlobalDataSetContext } from "@/components/context/globalDataSetContext";

function MapActionBtns() {
  const { projectsListGlobal } = useGlobalDataSetContext();
  const platingSlice = useAppSelector((state) => state.plantingSlice);
  const dispatch = useAppDispatch();
  return (
    <>
      <div
        onClick={() =>
          dispatch(
            setPlantingData({
              startPlanting: !platingSlice.startPlanting,
              workingProject: null,
              workingOrder: null,
              openTreesPanel: true,
              workingTrees: [],
            })
          )
        }
        className={cn(
          "px-[10px] select-none rounded-md shadow-sm cursor-pointer overflow-hidden group h-[38px] z-10 bg-white fixed right-2 top-16 flex justify-center items-center transition-all duration-300 ease-in-out",
          `${
            platingSlice.startPlanting
              ? "bg-green-400 text-primary-foreground shadow-md shadow-primary"
              : "bg-secondary text-secondary-foreground"
          }`
        )}
      >
        <Trees size={18} />
        <p className="text-sm max-w-0 text-nowrap group-hover:max-w-xs group-hover:pl-3 transform transition-all duration-300 ease-in-out opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0">
          {platingSlice.startPlanting ? "Stop" : "Start"} Planting
        </p>
      </div>

      <div
        onClick={() =>
          dispatch(
            setPlantingData({
              moveTrees: !platingSlice.moveTrees,
            })
          )
        }
        className={cn(
          "px-[10px] select-none rounded-md shadow-sm cursor-pointer overflow-hidden group h-[38px] z-10 bg-white fixed right-2 top-28 flex justify-center items-center transition-all duration-300 ease-in-out",
          `${
            platingSlice.moveTrees
              ? "bg-red-400 text-primary-foreground shadow-md shadow-red-400"
              : "bg-secondary text-secondary-foreground"
          }`
        )}
      >
        <Move size={18} />
        <p className="text-sm max-w-0 text-nowrap group-hover:max-w-xs group-hover:pl-3 transform transition-all duration-300 ease-in-out opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0">
          {platingSlice.moveTrees ? "Stop  Move" : "Move"} Trees
        </p>
      </div>

      <div
        onClick={() =>
          dispatch(
            setPlantingData({
              showPoints: !platingSlice.showPoints,
            })
          )
        }
        className={cn(
          "px-[10px] select-none rounded-md shadow-sm cursor-pointer overflow-hidden group h-[38px] z-10 bg-white fixed right-2 top-40 flex justify-center items-center transition-all duration-300 ease-in-out",
          `${
            platingSlice.showPoints
              ? "bg-blue-400 text-primary-foreground shadow-md shadow-blue-400"
              : "bg-secondary text-secondary-foreground"
          }`
        )}
      >
        <Disc size={18} />
        <p className="text-sm max-w-0 text-nowrap group-hover:max-w-xs group-hover:pl-3 transform transition-all duration-300 ease-in-out opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0">
          {!platingSlice.showPoints ? "Show" : "Hide"} Points
        </p>
      </div>

      <div className="fixed top-2 left-2 shadow-lg flex justify-center items-center gap-4 z-10">
        <Button
          variant="secondary"
          className="rounded-md shadow-sm"
          onClick={() => {
            dispatch(
              setPlantingData({
                openTreesPanel: !platingSlice.openTreesPanel,
              })
            );
          }}
        >
          <Trees />
          <p>Panel (CTRL + B)</p>
        </Button>
      </div>

      <NewOrder>
        <Button
          size="sm"
          variant="secondary"
          className="px-[10px] select-none rounded-md shadow-sm cursor-pointer overflow-hidden group h-[38px] z-10 bg-white fixed right-2 top-52 flex justify-center items-center transition-all duration-300 ease-in-out"
        >
          <Plus />
        </Button>
      </NewOrder>
    </>
  );
}

export default MapActionBtns;
