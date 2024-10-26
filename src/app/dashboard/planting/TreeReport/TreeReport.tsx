import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMapContext } from "@/components/context/mapContext";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setPlantingData } from "@/redux/Slices/plantingSlice";
import { Tree } from "@/interfaces/treeOrders";
import {
  getTree,
  updateTree,
} from "@/request/worker/orders/treeorders/manageTree";
import { extractErrors } from "@/request/actions";
import toast from "react-hot-toast";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useGlobalDataSetContext } from "@/components/context/globalDataSetContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
function TreeReport() {
  const [loading, setLoading] = useState(true);
  const [treeData, setTreeData] = useState<Tree | null>(null);
  const { map } = useMapContext();
  const plantingSlice = useAppSelector((state) => state.plantingSlice);
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<string>("");

  const loadTreeData = async () => {
    try {
      setLoading(true);
      const tree = await getTree(plantingSlice.reportTree!.id);
      setTreeData(tree);
      setLoading(false);
    } catch (error: any) {
      const errors = extractErrors(error?.response);
      setLoading(false);
      toast.error(errors[0]);
    }
  };

  React.useEffect(() => {
    setStatus("");
    if (plantingSlice.reportTree !== null) {
      loadTreeData();
    }
  }, [plantingSlice.reportTree]);

  const handleStatusChange = async () => {
    try {
      toast.loading("Updating Status...");
      await updateTree(plantingSlice.reportTree!.id, { status: status });
      toast.dismiss();
      toast.success("Status Updated Successfully");
    } catch (error: any) {
      console.log(error);
      toast.dismiss();
      const errors = extractErrors(error?.response);
      toast.error(errors[0]);
    }
  };

  useEffect(() => {
    if (plantingSlice.reportTree !== null && status !== "") {
      handleStatusChange();
    }
  }, [status]);

  return (
    <Sheet
      open={plantingSlice.reportTree !== null}
      onOpenChange={() => {
        dispatch(setPlantingData({ reportTree: null }));
      }}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Tree Report</SheetTitle>
        </SheetHeader>
        {loading ? (
          <div className="flex justify-center items-center gap-5 h-[70vh]">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="mt-4">
            <div className="flex flex-col gap-2 ">
              <p>ID : {treeData?.treeId}</p>
              <p>Tree Name: {treeData?.treeName}</p>
              <p>Tree Type: {treeData?.treeType}</p>
              <p className="capitalize">Area Name: {treeData?.area.areaName}</p>
              <p>Location: {treeData?.location}</p>
              <p className="capitalize">Status: {treeData?.status}</p>
              <div className="mt-2">
                <Label className="font-semibold">Tree Status</Label>
                <Select value={status} onValueChange={(e) => setStatus(e)}>
                  <SelectTrigger className="w-full mt-1 rounded-none ">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new planted">New Planted</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                    <SelectItem value="dead">Dead</SelectItem>
                    <SelectItem value="producing">Producing</SelectItem>
                    {/* <SelectItem value="not planted">Not Planted</SelectItem> */}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default TreeReport;
