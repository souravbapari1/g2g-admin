"use client";
import { CountryDropdown } from "@/app/test/country-dropdown";
import FileUploaderTest from "@/components/extensions/SelectFile";
import { CityDropdown } from "@/components/ui/custom/city-dropdown";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

function CreateNewClub() {
  return (
    <div className="p-8 bg-gray-100">
      <p className="font-bold text-xl mb-5">Club Basic Info</p>
      <div className="grid grid-cols-3 gap-5">
        <div className="">
          <Label>Club Name</Label>
          <Input type="text" placeholder="Club Name" />
        </div>
        <div className="">
          <Label>Country</Label>
          <CountryDropdown className="w-full" onChange={() => {}} value="" />
        </div>
        <div className="">
          <Label>City</Label>
          <CityDropdown onChange={() => {}} value="" className="w-full" />
        </div>
        <div className="col-span-3 grid grid-cols-2 gap-5">
          <div className="">
            <Label>Club Logo</Label>
            <div className="border rounded-lg overflow-hidden">
              <FileUploaderTest />
            </div>
          </div>
          <div className="">
            <Label>Club Background Banner Image</Label>
            <div className="border rounded-lg overflow-hidden">
              <FileUploaderTest />
            </div>
          </div>
        </div>
        <div className="">
          <Label>Sponsors</Label>
          <MultiSelect
            className="bg-white"
            options={[]}
            onValueChange={() => {}}
            value={[]}
          />
        </div>
        <div className="">
          <Label>Assigned to Employee</Label>
          <MultiSelect
            className="bg-white"
            options={[]}
            onValueChange={() => {}}
            value={[]}
          />
        </div>
        <div className="">
          <Label>Club State</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Active</SelectItem>
              <SelectItem value="dark">In Active</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="">
          <Label>Mark it as Most Popular</Label>
          <Switch className="ml-3" />
        </div>
      </div>
    </div>
  );
}

export default CreateNewClub;
