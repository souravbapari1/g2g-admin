"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  createMeasurement,
  deleteMeasurement,
  getMeasurements,
  updateMeasurement,
} from "@/request/worker/measurement/measurement";
import { MeasurementItem } from "@/interfaces/measurement";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { extractErrors } from "@/request/actions";
import MeasurementItemRow from "./MeasurementItemCard";

function MeasurementsList() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<MeasurementItem[]>([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const loadData = async () => {
    setLoading(true);
    const data = await getMeasurements();
    setData(data.items);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter data based on the search term
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between ">
        <Input
          placeholder="Search Measurements..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mr-2 w-64 rounded-none border-b-0"
        />
        <div className="flex justify-end items-center gap-5">
          <p>Total Measurements : {data.length}</p>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
              <Button variant="secondary" className="rounded-none">
                Add New Measurement
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Measurement</DialogTitle>
              </DialogHeader>
              <Input
                placeholder="Enter Measurement"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Button
                onClick={async () => {
                  if (!name) {
                    toast.error("Name is required");
                    return;
                  }
                  try {
                    const create = await createMeasurement(name);
                    if (create) {
                      setName("");
                      setOpen(false);
                      loadData();
                    }
                  } catch (e: any) {
                    const errors = extractErrors(e?.response);
                    toast.error(errors[0]);
                    console.log(e);
                  }
                }}
              >
                Save
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Table className="border">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center border">S No.</TableHead>
            <TableHead className="text-center border">
              Measurement Name
            </TableHead>
            <TableHead className="text-center border">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((item, index) => (
            <MeasurementItemRow
              key={item.id}
              item={item}
              index={index + 1}
              onEdit={async (id, newName) => {
                try {
                  const update = await updateMeasurement(id, newName);
                  if (update) loadData();
                } catch (e) {
                  console.error(e);
                  toast.error("Something went wrong");
                }
              }}
              onDelete={async (id) => {
                try {
                  await deleteMeasurement(id);
                  loadData();
                } catch (e) {
                  console.error(e);
                  toast.error("Could not delete measurement");
                }
              }}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default MeasurementsList;
