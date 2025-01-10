import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function ClubSdg() {
  return (
    <div className="bg-gray-100 p-8 mt-8">
      <p className="font-bold text-xl mb-5">Club SDG</p>
      <div className="flex flex-col gap-5">
        <div className="">
          <Label>Select Sgd</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Option 1</SelectItem>
              <SelectItem value="dark">Option 2</SelectItem>
              <SelectItem value="system">Option3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="">
          <Label>Description</Label>
          <Textarea />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="">
            <div className="flex justify-between items-center">
              <Label>Param 1</Label>
              <p className="text-red-500 cursor-pointer font-bold">Delete</p>
            </div>
            <Textarea />
          </div>
          <div className="">
            <div className="flex justify-between items-center">
              <Label>Param 2</Label>
              <p className="text-red-500 cursor-pointer font-bold">Delete</p>
            </div>
            <Textarea />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClubSdg;
