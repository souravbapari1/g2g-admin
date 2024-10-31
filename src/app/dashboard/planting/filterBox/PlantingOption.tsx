import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ViewList from "./viewList";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { cn } from "@/lib/utils";
import { IoCloseOutline } from "react-icons/io5";
import { setPlantingData } from "@/redux/Slices/plantingSlice";
import { useState } from "react";
import FilterOptions from "./FilterOptions";
import FilterdListView from "./filterView/FilterdListView";
import PreviewList from "./preview/PreviewList";

function PlantingOption() {
  const platingSlice = useAppSelector((state) => state.plantingSlice);
  const dispatch = useAppDispatch();
  const [filterType, setFilterType] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "h-screen w-80 overflow-auto z-20 bg-gray-100 p-3 fixed top-0 left-0  duration-300",
        platingSlice.openTreesPanel ? "translate-x-0 " : "-translate-x-full "
      )}
    >
      <div className="relative">
        <div
          onClick={() => dispatch(setPlantingData({ openTreesPanel: false }))}
          className="w-5 h-5 bg-red-600 rounded-full shadow-md flex justify-center items-center cursor-pointer text-white absolute top-0 right-0"
        >
          <IoCloseOutline />
        </div>
        <div>
          <Label>Display By</Label>
          <Select value={filterType || ""} onValueChange={setFilterType}>
            <SelectTrigger className="w-full mt-1 rounded-none bg-black-50/60 backdrop-blur-3xl border-white">
              <SelectValue placeholder="No Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="reset">No Filter</SelectItem>
              <SelectItem value="tree-type">Tree Type</SelectItem>
              <SelectItem value="conditions">Conditions</SelectItem>
              <SelectItem value="tree-age">Tree Age</SelectItem>
              <SelectItem value="area-type">Area Type</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <FilterOptions type={filterType || ""} />
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="border-b-0">
            <AccordionTrigger>Statics and Impacts :</AccordionTrigger>
            <AccordionContent>
              <div className="flex justify-between items-center">
                <p>✓ Hectare Restored (Kha)</p>
                <p>12323</p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p>✓ Number of Planted Trees</p>
                <p>12323</p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p>✓ CO2 Storage (kg/year)</p>
                <p>12323</p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p>✓ CO2 removal (ton/year)</p>
                <p>12323</p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p>✓ Air Quality (kg/year)</p>
                <p>12323</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {platingSlice.filterOptions.length == 0 ? (
          platingSlice.startPlanting ? (
            <ViewList />
          ) : (
            <PreviewList />
          )
        ) : (
          <FilterdListView />
        )}
      </div>
    </div>
  );
}

export default PlantingOption;
