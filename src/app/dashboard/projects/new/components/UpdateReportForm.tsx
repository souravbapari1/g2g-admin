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
import { ReportingItem } from "@/interfaces/reporting";
import { extractErrors } from "@/request/actions";
import {
  createReports,
  updateReports,
} from "@/request/worker/catalogs/reports";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

function UpdateReportForm({
  report,
  onUpdate,
}: {
  report: ReportingItem;
  onUpdate: Function;
}) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState(report.name || "");
  const [description, setDescription] = useState(report.desc || "");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const validateErrors = () => {
    toast.dismiss();
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
    toast.loading("Update Report...");
    setLoading(true);
    try {
      const res = await updateReports(report.id, {
        desc: description,
        file: file,
        name: name,
      });
      onUpdate(res);
      toast.dismiss();
      toast.success("Report update successfully");
      setFile(null);
      setLoading(false);
      setOpen(false);
    } catch (error: any) {
      toast.dismiss();
      setLoading(false);
      const errors = extractErrors(error.response);
      toast.error(errors[0]);
      console.log(error);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Pencil />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Update Report</SheetTitle>
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
        <Button className="w-full mt-5" disabled={loading} onClick={handleSave}>
          Update Report
        </Button>
      </SheetContent>
    </Sheet>
  );
}

export default UpdateReportForm;
