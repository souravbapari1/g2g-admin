import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { setPlantingData } from "@/redux/Slices/plantingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGlobalDataSetContext } from "@/components/context/globalDataSetContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { updateTree } from "@/request/worker/orders/treeorders/manageTree";
import { getTodayDate } from "@/helper/dateTime";
import { extractErrors } from "@/request/actions";

export function ManagePlantBox() {
  const { treeTypeListGlobal } = useGlobalDataSetContext();
  const platingSlice = useAppSelector((state) => state.plantingSlice);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const [type, setType] = useState("");

  const project = platingSlice.ordersList.find(
    (proj) => proj.id === platingSlice.selectedTree?.project
  );

  const onUpdatePlanting = async () => {
    toast.dismiss();
    if (!type) {
      toast.error("Please select tree type");
      return false;
    }
    try {
      setLoading(true);
      const treeType = treeTypeListGlobal.find((t) => t.name === type);
      toast.loading("Updating Tree...");
      const res = await updateTree(platingSlice.selectedTree!.id, {
        treeType: treeType?.name,
        type: type,
        plat_date: getTodayDate(),
        location: platingSlice.selectedTree?.location,
        area: platingSlice.selectedTree?.area,
        status: "new planted",
      });

      toast.dismiss();
      setLoading(false);
      toast.success("Tree updated successfully");
      dispatch(setPlantingData({ selectedTree: null }));
      return res;
    } catch (error: any) {
      toast.dismiss();
      const errors = extractErrors(error?.response);
      toast.error(errors[0]);
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Sheet
      open={platingSlice.selectedTree != null}
      onOpenChange={(open) => dispatch(setPlantingData({ selectedTree: null }))}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Tree ID: {platingSlice.selectedTree?.treeId}</SheetTitle>
        </SheetHeader>
        <div className="text-sm flex flex-col gap-2 mt-4 ">
          <p>Tree Name: {platingSlice.selectedTree?.treeName}</p>
          <p className="capitalize">
            Tree Status: {platingSlice.selectedTree?.status}
          </p>
          <p>Assigned Project: {project?.name}</p>
          <p>Planted Area : {platingSlice.selectedTree?.area.areaName}</p>
          <p>Order ID : {platingSlice.selectedTree?.orderIdNo}</p>
          <p>Tree Location: {platingSlice.selectedTree?.location}</p>
          <div className="mt-2">
            <Label className="font-semibold">Tree Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                {treeTypeListGlobal.map((item) => (
                  <SelectItem value={item.id}>{item.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <br />
          <Button onClick={onUpdatePlanting} disabled={loading}>
            Save And Confirm Plant Tree
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
