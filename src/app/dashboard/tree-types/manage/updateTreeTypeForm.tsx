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
import { extractErrors } from "@/request/actions";
import {
  createNewTreeType,
  updateTreeType,
} from "@/request/worker/treetype/manageTreeTypes";

import { Switch } from "@/components/ui/switch";
import { TreeTypesItem } from "@/interfaces/treetypes";
import { Pencil } from "lucide-react";

function UpdateTreeTypeForm({
  data,
  onUpdate,
}: {
  data: TreeTypesItem;
  onUpdate: Function;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [treeTypeName, setTreeTypeName] = useState(data.name);
  const [price, setPrice] = useState(data.price.toString());
  const [hectareRestored, setHectareRestored] = useState(
    data.hectare_restored.toString()
  );
  const [co2Removal, setCo2Removal] = useState(data.co2_removal.toString());
  const [co2Storage, setCo2Storage] = useState(data.co2_storage.toString());
  const [airQuality, setAirQuality] = useState(data.air_quality.toString());
  const [rainObserved, setRainObserved] = useState(
    data.rain_observed.toString()
  );
  const [energySaved, setEnergySaved] = useState(data.energy_saved.toString());
  const [state, setState] = useState<boolean>(data.state);

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

    toast.loading("Update Tree Type...");

    try {
      setLoading(true);
      const res = await updateTreeType(data.id, {
        name: treeTypeName,
        price: parseFloat(price),
        hectare_restored: parseFloat(hectareRestored),
        co2_removal: parseFloat(co2Removal),
        co2_storage: parseFloat(co2Storage),
        air_quality: parseFloat(airQuality),
        rain_observed: parseFloat(rainObserved),
        energy_saved: parseFloat(energySaved),
        state: state,
      });

      onUpdate(res);

      setLoading(false);
      toast.dismiss();
      toast.success("Tree Type Update successfully");
      setOpen(false);
    } catch (error: any) {
      setLoading(false);
      const errors = extractErrors(error?.response);
      toast.dismiss();
      toast.error(errors[0]);
      console.log(error);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Pencil size={18} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Update Tree Type</SheetTitle>
          <SheetDescription>
            enter new tree type details and click save to update
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
          <div className="flex justify-start items-center gap-4 mt-3">
            <Label>State</Label>
            <Switch checked={state} onClick={() => setState(!state)} />
          </div>
        </div>
        <Button className="mt-8 w-full" disabled={loading} onClick={handleSave}>
          update Tree Type
        </Button>
      </SheetContent>
    </Sheet>
  );
}

export default UpdateTreeTypeForm;
