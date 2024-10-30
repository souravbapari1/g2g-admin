"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import MeasurementItemCard from "./MeasurementItemCard";
import { MeasureOptions } from "node:perf_hooks";
import {
  createMeasurement,
  getMeasurements,
  updateMeasurement,
} from "@/request/worker/measurement/measurement";
import { MeasurementItem } from "@/interfaces/measurement";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { extractErrors } from "@/request/actions";

function MeasurementsList() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<MeasurementItem[]>([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const loadData = async () => {
    const data = await getMeasurements();
    setData(data.items);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-start items-center gap-5 ">
      {data?.map((item) => (
        <MeasurementItemCard
          key={item.id}
          item={item}
          onEdit={async (id, name) => {
            try {
              const update = await updateMeasurement(id, name);
              if (update) {
                loadData();
              }
            } catch (e) {
              console.log(e);
              toast.error("Something went wrong");
            }
          }}
        />
      ))}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button variant="secondary" className="rounded-none">
            Add New
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
  );
}

export default MeasurementsList;
