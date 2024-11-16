"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { use, useState } from "react";
import { useGlobalDataSetContext } from "@/components/context/globalDataSetContext";
import { MultiSelect } from "@/components/ui/multi-select";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { createUnitTypes } from "@/request/worker/catalogs/unitTypes";
import { extractErrors } from "@/request/actions";
import { useTriggerContext } from "@/components/context/triggerContecxt";

function NewUnitTypeForm() {
  const [open, setOpen] = useState(false);
  const { projectTypeListGlobal, sdgListGlobal, measurementListGlobal } =
    useGlobalDataSetContext();
  const { triggerUnitTypeEffect } = useTriggerContext();
  const [name, setName] = useState("");
  const [projectType, setProjectType] = useState<string[]>([]);
  const [sdg, setSdg] = useState<string[]>([]);
  const [parameters, setParameters] = useState<
    { name: string; value: string }[]
  >([]);
  const [prefix, setPrefix] = useState("");
  const [unit, setUnit] = useState("");
  const [ormUnit, setOrmUnit] = useState("");
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(false);

  // const addNewParameterField = () => {
  //   setParameters([...parameters, { name: "", value: "" }]);
  // };

  const handleParameterChange = (
    index: number,
    key: "name" | "value",
    value: string
  ) => {
    const updatedParameters = [...parameters];
    updatedParameters[index][key] = value;
    setParameters(updatedParameters);
  };

  const removeParameterField = (index: number) => {
    setParameters(parameters.filter((_, i) => i !== index));
  };

  function validateAll() {
    toast.dismiss();
    if (!name) {
      toast.error("Type Of Unit is required");
      return false;
    }
    if (!prefix) {
      toast.error("Prefix is required");
      return false;
    }
    if (!projectType) {
      toast.error("Project Type is required");
      return false;
    }
    if (parameters.some((parameter) => !parameter.name || !parameter.value)) {
      toast.error("All parameters must have a name and value");
      return false;
    }
    if (!unit) {
      toast.error("Unit is required");
      return false;
    }
    if (!ormUnit) {
      toast.error("ORM/ Unit is required");
      return false;
    }
    return true;
  }

  const handleSave = async () => {
    if (validateAll()) {
      try {
        setLoading(true);
        await createUnitTypes({
          name,
          project_type: projectType || [],
          unit,
          orm_unit: ormUnit,
          sdg,
          parameters,
          prefix,
          color,
        });
        setLoading(false);
        setName("");
        setProjectType([]);
        setSdg([]);
        setParameters([{ name: "", value: "" }]);
        setUnit("");
        setOrmUnit("");
        triggerUnitTypeEffect();
        setOpen(false);
        toast.success("Unit Type created successfully");
      } catch (error: any) {
        setLoading(false);
        const errors = extractErrors(error);
        console.error(error);
        toast.error(errors[0]);
      }
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button variant="outline" size="sm" className="mr-4">
          Create Unit Type
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Unit Type</SheetTitle>
          <SheetDescription>
            Create a new Unit Type in the system and add it to your project.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-3">
          <Label>Type Of Unit</Label>
          <Input
            className="mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <Label>Unit Color</Label>
          <Input
            className="mt-1"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>

        <div className="mt-3">
          <Label>Project Prefix </Label>
          <Select value={prefix} onValueChange={(value) => setPrefix(value)}>
            <SelectTrigger className="w-full mt-1 ">
              <SelectValue placeholder={prefix} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tree">Tree Project</SelectItem>
              <SelectItem value="others">Others Project</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mt-3">
          <Label>Project Type</Label>
          <MultiSelect
            value={projectType}
            defaultValue={projectType}
            onValueChange={(value) => setProjectType(value)}
            options={projectTypeListGlobal.map((e) => ({
              label: e.name,
              value: e.id,
            }))}
          />
        </div>
        <div className="mt-3">
          <Label>SDG</Label>
          <MultiSelect
            value={sdg}
            defaultValue={sdg}
            onValueChange={(value) => {
              setSdg(value);
              let sdgData: { name: string; value: string }[] = [];
              value.map((e) => {
                const sdg = sdgListGlobal.find((d) => d.id === e);
                if (sdg) {
                  sdgData.push(
                    ...sdg.parameters.map((p) => ({ name: p, value: "" }))
                  );
                }
              });
              setParameters(sdgData);
            }}
            options={sdgListGlobal.map((e) => ({
              label: e.name,
              value: e.id,
            }))}
          />
        </div>
        {parameters.length > 0 && (
          <p className="text-lg text-gray-700 font-semibold mt-5">Parameters</p>
        )}
        {parameters.map((parameter, index) => (
          <div key={index} className="grid grid-cols-1">
            <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
              <div className="flex justify-between items-center">
                <Label>{parameter.name}</Label>
                <X
                  color="red"
                  size={11}
                  className="cursor-pointer"
                  onClick={() => removeParameterField(index)}
                />
              </div>
              <Input
                className="mt-1 rounded-l-none"
                value={parameter.value}
                onChange={(e) =>
                  handleParameterChange(index, "value", e.target.value)
                }
              />
            </div>
          </div>
        ))}

        <div className="mt-8">
          <Label>Unit Of Measurement</Label>
          <Select value={unit} onValueChange={(value) => setUnit(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={unit} />
            </SelectTrigger>
            <SelectContent>
              {measurementListGlobal.map((e) => (
                <SelectItem key={e.id} value={e.name}>
                  {e.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mt-3">
          <Label>ORM/ Unit</Label>
          <Input
            className="mt-1"
            value={ormUnit}
            onChange={(e) => setOrmUnit(e.target.value)}
          />
        </div>
        <Button className="w-full mt-6" disabled={loading} onClick={handleSave}>
          Save Unit Type
        </Button>
      </SheetContent>
    </Sheet>
  );
}

export default NewUnitTypeForm;
