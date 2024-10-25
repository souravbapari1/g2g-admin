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
import { createReports } from "@/request/worker/catalogs/reports";
import { useState } from "react";
import toast from "react-hot-toast";

function NewReportForm() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const validateErrors = () => {
    toast.dismiss();
    if (!file) {
      return "Please select a file";
    }
    if (!name) {
      return "Please enter a name";
    }
    if (!description) {
      return "Please enter a description";
    }
    return true;
  };

  const handleSave = async () => {
    const errors = validateErrors();
    if (errors != true) {
      toast.error(errors);
      return false;
    }
    toast.loading("Creating Report...");

    try {
      await createReports({
        desc: description,
        file: file!,
        name: name,
      });
      toast.dismiss();
      toast.success("Report created successfully");

      setName("");
      setDescription("");
      setFile(null);
      setOpen(false);
    } catch (error: any) {
      toast.dismiss();
      const errors = extractErrors(error.response);
      toast.error(errors[0]);
      console.log(error);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button variant="outline" size="sm" className="mr-4">
          Add New Report
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create New Report</SheetTitle>
          <SheetDescription>
            Enter a name and description for your report
          </SheetDescription>
        </SheetHeader>
        <div className="mt-3">
          <Label>Report File</Label>
          <Input className="mt-1" type="file" onChange={handleFileChange} />
        </div>
        <div className="mt-3">
          <Label>Report Name</Label>
          <Input
            className="mt-1"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <Label>Report Description</Label>
          <Textarea
            className="mt-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button className="w-full mt-5" onClick={handleSave}>
          Save Report
        </Button>
      </SheetContent>
    </Sheet>
  );
}

export default NewReportForm;
