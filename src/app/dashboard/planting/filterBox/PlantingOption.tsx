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
import React, { useEffect, useState } from "react";
import ViewList from "./viewList";
import { ProjectItem } from "@/interfaces/project";
import { requestOrdersWithProjects } from "@/request/worker/orders/treeorders/modifyTreeOrders";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setPlantingData } from "@/redux/Slices/plantingSlice";
import { extractErrors } from "@/request/actions";
import toast from "react-hot-toast";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

function PlantingOption() {
  return (
    <div className="h-screen w-80 overflow-auto bg-gray-100 p-3 fixed top-0 left-0">
      <div className="">
        <div className="">
          <Label>Display By</Label>
          <Select>
            <SelectTrigger className="w-full mt-1 rounded-none">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tree-type">Tree Type</SelectItem>
              <SelectItem value="conditions">Conditions</SelectItem>
              <SelectItem value="tree-age">Tree Age</SelectItem>
              <SelectItem value="area-type">Area Type</SelectItem>
            </SelectContent>
          </Select>
        </div>

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
        <ViewList />
      </div>
    </div>
  );
}

export default PlantingOption;
