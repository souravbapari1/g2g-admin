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
import { Textarea } from "@/components/ui/textarea";
import { useTriggerContext } from "@/components/context/triggerContecxt";
import { extractErrors } from "@/request/actions";
import { createSdgs } from "@/request/worker/catalogs/sdgs";
import { set } from "date-fns";
import { X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

function NewSdgForm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { triggerSDGEffect } = useTriggerContext();

  const [nameOfSdg, setNameOfSdg] = useState("");
  const [sortDescription, setSortDescription] = useState("");
  const [sdgImage, setSdgImage] = useState<File | null>(null);
  const [parameters, setParameters] = useState([{ title: "", value: "" }]);
  const [mainColor, setMainColor] = useState("");
  const [subColor, setSubColor] = useState("");

  const addNewParameterField = () => {
    setParameters([
      ...parameters,
      { title: "", value: "" },
    ] as typeof parameters);
  };

  const handleParameterChange = (
    index: number,
    key: "title" | "value",
    value: string
  ) => {
    const updatedParameters = [...parameters];
    updatedParameters[index][key] = value;
    setParameters(updatedParameters);
  };

  const removeParameterField = (index: number) => {
    setParameters(parameters.filter((_, i) => i !== index));
  };

  const validate = () => {
    toast.dismiss();
    if (!nameOfSdg) {
      toast.error("Name of SDG is required");
      return false;
    }
    if (!sortDescription) {
      toast.error("Sort description is required");
      return false;
    }
    if (!sdgImage) {
      toast.error("SDG image is required");
      return false;
    }
    if (parameters.some((parameter) => !parameter.title || !parameter.value)) {
      toast.error("All parameters must have a name and value");
      return false;
    }
    if (!mainColor) {
      toast.error("Main color is required");
      return false;
    }
    if (!subColor) {
      toast.error("Sub color is required");
      return false;
    }

    return true;
  };

  const saveFormData = async () => {
    if (validate()) {
      try {
        setLoading(true);
        toast.loading("Creating SDG...");
        await createSdgs({
          name: nameOfSdg,
          sort_desc: sortDescription,
          parameters: parameters,
          image: sdgImage!,
          main_color: mainColor,
          sub_color: subColor,
        });
        toast.dismiss();
        toast.success("SDG created successfully");
        setNameOfSdg("");
        setSortDescription("");
        setSdgImage(null);
        setParameters([{ title: "", value: "" }]);
        setMainColor("");
        setSubColor("");
        triggerSDGEffect();
        setOpen(false);
        setLoading(false);
      } catch (error: any) {
        const errors = extractErrors(error);
        setLoading(false);
        toast.dismiss();
        toast.error(errors[0]);
      }
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button size="sm" className="mr-4">
          Add New Sdg
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-auto">
        <SheetHeader>
          <SheetTitle>Create New SDG</SheetTitle>
          <SheetDescription>
            Add New Sustainable Development Goal from here
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label>Name Of SDG</Label>
            <Input
              className="mt-1"
              value={nameOfSdg}
              onChange={(e) => setNameOfSdg(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label>Sort Description</Label>
            <Textarea
              className="mt-1"
              value={sortDescription}
              onChange={(e) => setSortDescription(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label>SDG Image</Label>
            <Input
              className="mt-1"
              type="file"
              onChange={(e) =>
                setSdgImage(e.target.files ? e.target.files[0] : null)
              }
            />
          </div>
          <p className="text-lg text-gray-700 font-semibold">Parameters</p>
          {parameters.map((parameter, index) => (
            <div key={index} className="grid grid-cols-2">
              <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                <Label>Name</Label>
                <Input
                  className="mt-1 rounded-r-none border-r-0"
                  value={parameter.title}
                  onChange={(e) =>
                    handleParameterChange(index, "title", e.target.value)
                  }
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                <div className="flex justify-between items-center">
                  <Label>Value</Label>
                  <X
                    color="red"
                    size={11}
                    className="cursor-pointer"
                    onClick={() => removeParameterField(index)}
                  />
                </div>
                <Input
                  className="mt-1 rounded-l-none "
                  value={parameter.value}
                  onChange={(e) =>
                    handleParameterChange(index, "value", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
        </div>
        <Button
          className="float-end rounded-t-none "
          variant="secondary"
          size="sm"
          onClick={addNewParameterField}
        >
          Add More
        </Button>
        <div className="grid grid-cols-2 mt-14">
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label>Main Color</Label>
            <Input
              className="mt-1 rounded-r-none border-r-0"
              type="color"
              value={mainColor}
              onChange={(e) => setMainColor(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label>Sub Color</Label>
            <Input
              className="mt-1 rounded-l-none "
              type="color"
              value={subColor}
              onChange={(e) => setSubColor(e.target.value)}
            />
          </div>
        </div>
        <Button
          disabled={loading}
          className="w-full mt-3"
          onClick={saveFormData}
        >
          Save SDGs
        </Button>
      </SheetContent>
    </Sheet>
  );
}

export default NewSdgForm;
