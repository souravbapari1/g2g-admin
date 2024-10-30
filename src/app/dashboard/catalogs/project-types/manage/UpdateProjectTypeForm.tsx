"use client";
import { useGlobalDataSetContext } from "@/components/context/globalDataSetContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { allMassMeasurements } from "@/helper/plantIcon";
import { ProjectType } from "@/interfaces/projectType";
import { extractErrors } from "@/request/actions";
import {
  createProjectType,
  updateProjectType,
} from "@/request/worker/catalogs/projectType";
import { Pencil, X } from "lucide-react";

import { useState } from "react";
import toast from "react-hot-toast";

function UpdateProjectTypeForm({
  data,
  onUpdate,
}: {
  data: ProjectType;
  onUpdate: Function;
}) {
  const [open, setOpen] = useState(false);
  const [projectTypeName, setProjectTypeName] = useState<string>(
    data.name || ""
  );
  const [parameters, setParameters] = useState<string[]>(
    data.parameters || [""]
  );
  const [unitMeasurement, setUnitMeasurement] = useState<string>(
    data.unit_measurement || ""
  );
  const { measurementListGlobal } = useGlobalDataSetContext();
  const [loading, setLoading] = useState(false);

  const handleParameterChange = (index: number, value: string) => {
    const newParameters = [...parameters];
    newParameters[index] = value;
    setParameters(newParameters);
  };

  const addNewParameterField = () => {
    setParameters([...parameters, ""]);
  };

  const removeParameterField = (index: number) => {
    setParameters(parameters.filter((_, i) => i !== index));
  };

  const validate = () => {
    toast.dismiss();
    if (!projectTypeName) {
      toast.error("Project Type Name is required");
      return false;
    }

    if (parameters.length === 0) {
      toast.error("Project Type Parameters are required");
      return false;
    }

    if (!unitMeasurement) {
      toast.error("Unit of Measurement is required");
      return false;
    }
    if (parameters.some((parameter) => !parameter)) {
      toast.error("Project Type Parameters are required");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (validate()) {
      try {
        setLoading(true);
        toast.loading("Updating Project Type...");
        const res = await updateProjectType(data.id, {
          name: projectTypeName,
          parameters: parameters,
          unit_measurement: unitMeasurement,
        });
        onUpdate(res);
        setLoading(false);
        toast.dismiss();
        toast.success("Project Type Updated Successfully");

        setOpen(false);
      } catch (error: any) {
        setLoading(false);
        const errors = extractErrors(error?.response);
        toast.dismiss();
        toast.error(errors[0]);
      }
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Pencil />
      </SheetTrigger>
      <SheetContent className="overflow-auto">
        <SheetHeader>
          <SheetTitle>Create New Project Type</SheetTitle>
          <SheetDescription>
            enter the details of the new project type to be created here
          </SheetDescription>
        </SheetHeader>
        <br />
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <Label>Project Type Name</Label>
          <Input
            className="mt-1"
            value={projectTypeName}
            onChange={(e) => setProjectTypeName(e.target.value)}
          />
        </div>
        <p className="font-bold mb-2">Project Main Interventions</p>
        <div className="">
          {parameters.map((parameter, index) => (
            <div className="w-full" key={index + "-parameters"}>
              <div className="flex items-center  mb-1 justify-between">
                <Label className="text-xs mt-2">Parameter Name</Label>
                <X
                  size={12}
                  color="red"
                  className="cursor-pointer"
                  onClick={() => removeParameterField(index)}
                />
              </div>
              <Input
                value={parameter}
                onChange={(e) => handleParameterChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
        <Button
          size="sm"
          variant="secondary"
          className="float-end mb-4 text-xs px-4 border-t-0 rounded-t-none"
          onClick={addNewParameterField}
        >
          Add New Parameter
        </Button>

        <br />
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <Label>Unit of Measurement</Label>
          <Select
            value={unitMeasurement}
            onValueChange={(e) => setUnitMeasurement(e)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              {measurementListGlobal.map((measurement) => (
                <SelectItem
                  value={measurement.name}
                  key={measurement.id}
                  className="capitalize"
                >
                  {measurement.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button className="w-full mt-2" disabled={loading} onClick={handleSave}>
          Save Project Type
        </Button>
      </SheetContent>
    </Sheet>
  );
}

export default UpdateProjectTypeForm;
