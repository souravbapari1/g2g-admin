"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { MeasurementItem } from "@/interfaces/measurement";
import { extractErrors } from "@/request/actions";
import {
  createAreaType,
  getAreaTypes,
  updateAreaType,
} from "@/request/worker/catalogs/areaType";
import { createMeasurement } from "@/request/worker/measurement/measurement";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import MeasurementItemCard from "./AreaTypesItemCard";

function AreaTypesList() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<MeasurementItem[]>([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const loadData = async () => {
    const data = await getAreaTypes();
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
              const update = await updateAreaType(id, name);
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
            <DialogTitle>Add New Area Type</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Enter Area Type"
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
                const create = await createAreaType(name);
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

export default AreaTypesList;
