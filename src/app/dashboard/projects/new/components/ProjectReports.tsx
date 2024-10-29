"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { ReportingItem } from "@/interfaces/reporting";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { createReports, getReport } from "@/request/worker/catalogs/reports";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import toast from "react-hot-toast";
import { extractErrors } from "@/request/actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ReportsView from "./ReportsView";
import { setProjectDataValue } from "@/redux/Slices/projectParamsSlice";

function ProjectReports() {
  const state = useAppSelector((e) => e.projectParamsSlice);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<ReportingItem[]>([]);

  const loadReports = async () => {
    const reports = state.project.reports.map(async (e) => {
      return await getReport(e);
    });
    return await Promise.all(reports);
  };

  useEffect(() => {
    loadReports()
      .then((e) => {
        setReports(e);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  return (
    <Card className="p-5 mb-10 bg-gray-100 rounded-none">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xl font-bold">Project Reports</p>
        <NewReportForm
          onCreate={(e) => {
            setReports([...reports, e]);
            dispatch(
              setProjectDataValue({
                key: "reports",
                data: [...state.project.reports, e.id],
              })
            );
          }}
        />
      </div>
      {loading && <p>Loading...</p>}
      {!loading && reports.length == 0 && (
        <p className="mt-4">No project reports</p>
      )}
      {!loading && reports.length > 0 && (
        <div className=" mt-4">
          <Table className=" overflow-auto">
            <TableHeader>
              <TableRow className="bg-gray-100 ">
                <TableHead className="w-[100px]">S No.</TableHead>
                <TableHead>File</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Desc</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((item, index) => (
                <ReportsView index={index + 1} report={item} />
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </Card>
  );
}

export default ProjectReports;
function NewReportForm({
  onCreate,
}: {
  onCreate?: (e: ReportingItem) => void;
}) {
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
      const report = await createReports({
        desc: description,
        file: file!,
        name: name,
      });
      toast.dismiss();
      toast.success("Report created successfully");
      if (onCreate) {
        onCreate(report);
      }
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
        <Button variant="outline" size="sm" className="mr-4 rounded-none">
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
