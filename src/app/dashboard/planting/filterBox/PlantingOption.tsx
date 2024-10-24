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
import React from "react";
import ViewList from "./viewList";

function PlantingOption() {
  return (
    <div className="h-screen w-80 overflow-auto bg-gray-100 p-5 fixed top-0 left-0">
      <div className="">
        <div className="">
          <Label>Display By</Label>
          <Select>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Option 1</SelectItem>
              <SelectItem value="dark">Option 2</SelectItem>
              <SelectItem value="system">Option 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4">
          <Label>Tree Seeds</Label>
          <Select>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Mango" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Mango</SelectItem>
              <SelectItem value="dark">Apple</SelectItem>
              <SelectItem value="system">Orange</SelectItem>
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
