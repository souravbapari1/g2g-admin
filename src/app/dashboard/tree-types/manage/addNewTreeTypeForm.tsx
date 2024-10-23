"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import toast from "react-hot-toast";

function AddNewTreeTypeForm() {
  const [treeTypeName, setTreeTypeName] = useState("");
  const [price, setPrice] = useState("");
  const [hectareRestored, setHectareRestored] = useState("");
  const [co2Removal, setCo2Removal] = useState("");
  const [co2Storage, setCo2Storage] = useState("");
  const [airQuality, setAirQuality] = useState("");
  const [rainObserved, setRainObserved] = useState("");
  const [energySaved, setEnergySaved] = useState("");
  const [state, setState] = useState("");

  const validateState = () => {
    const requiredFields = [
      {
        field: treeTypeName,
        message: "Please enter tree type name",
      },
      {
        field: price,
        message: "Please enter price",
      },
      {
        field: hectareRestored,
        message: "Please enter hectare restored",
      },
      {
        field: co2Removal,
        message: "Please enter co2 removal",
      },
      {
        field: co2Storage,
        message: "Please enter co2 storage",
      },
      {
        field: airQuality,
        message: "Please enter air quality",
      },
      {
        field: rainObserved,
        message: "Please enter rain observed",
      },
      {
        field: energySaved,
        message: "Please enter energy saved",
      },
      {
        field: state,
        message: "Please enter state",
      },
    ];
    for (let i = 0; i < requiredFields.length; i++) {
      if (requiredFields[i].field === "") {
        return requiredFields[i].message;
      }
    }
    return true;
  };

  const handleSave = async () => {
    toast.dismiss();
    const errors = validateState();
    if (errors != true) {
      toast.error(errors);
      return false;
    }
    toast.loading("Add Tree Type...");
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline" className="mr-5">
          Add New Tree Type
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New Tree Type</SheetTitle>
          <SheetDescription>
            enter new tree type details and click save to add new
          </SheetDescription>
        </SheetHeader>
        <div className="grid mt-5 gap-3">
          <div>
            <Label>Tree Type Name</Label>
            <Input
              className="mt-1"
              value={treeTypeName}
              onChange={(e) => setTreeTypeName(e.target.value)}
            />
          </div>
          <div>
            <Label>Price</Label>
            <Input
              className="mt-1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <Label>Hectare Restored</Label>
            <Input
              className="mt-1"
              value={hectareRestored}
              onChange={(e) => setHectareRestored(e.target.value)}
            />
          </div>
          <div>
            <Label>CO2 Removal</Label>
            <Input
              className="mt-1"
              value={co2Removal}
              onChange={(e) => setCo2Removal(e.target.value)}
            />
          </div>
          <div>
            <Label>CO2 Storage</Label>
            <Input
              className="mt-1"
              value={co2Storage}
              onChange={(e) => setCo2Storage(e.target.value)}
            />
          </div>
          <div>
            <Label>Air Quality</Label>
            <Input
              className="mt-1"
              value={airQuality}
              onChange={(e) => setAirQuality(e.target.value)}
            />
          </div>
          <div>
            <Label>Rain Observed</Label>
            <Input
              className="mt-1"
              value={rainObserved}
              onChange={(e) => setRainObserved(e.target.value)}
            />
          </div>
          <div>
            <Label>Energy Saved</Label>
            <Input
              className="mt-1"
              value={energySaved}
              onChange={(e) => setEnergySaved(e.target.value)}
            />
          </div>
          <div>
            <Label>State</Label>
            <Input
              className="mt-1"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
        </div>
        <Button className="mt-8 w-full" onClick={handleSave}>
          Save New Tree Type
        </Button>
      </SheetContent>
    </Sheet>
  );
}

export default AddNewTreeTypeForm;
