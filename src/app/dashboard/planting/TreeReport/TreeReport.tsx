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
import ReportsListTree from "./ReportsListTree";
import { ageOfDays } from "@/helper/dateTime";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import SdgsView from "./SdgView";
function TreeReport() {
  const [loading, setLoading] = useState(true);
  const [treeData, setTreeData] = useState<Tree | null>(null);

  const plantingSlice = useAppSelector((state) => state.plantingSlice);
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<string>("");

  const loadTreeData = async () => {
    try {
      setLoading(true);
      const tree = await getTree(plantingSlice.reportTree!.id);
      setStatus(tree.status);
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
    setTreeData(null);
    if (plantingSlice.reportTree !== null) {
      loadTreeData();
    }
  }, [plantingSlice.reportTree]);

  const handleStatusChange = async (state: string) => {
    setStatus(state);
    try {
      toast.loading("Updating Status...");
      const res = await updateTree(plantingSlice.reportTree!.id, {
        status: state,
      });
      toast.dismiss();
      toast.success("Status Updated Successfully");
      const updatedOrdersList = plantingSlice.ordersList.map((project) => {
        if (project.id !== plantingSlice.workingProject?.id) return project;
        return {
          ...project,
          orders: project.orders?.map((order) => ({
            ...order,
            planted_trees: order.planted_trees?.map((tree) =>
              tree.treeId === plantingSlice.reportTree?.treeId ? res : tree
            ),
            expand: {
              ...order.expand,
              trees: order.expand.trees.map((tree) =>
                tree.treeId === plantingSlice.reportTree?.treeId ? res : tree
              ),
            },
          })),
        };
      });
      // Update Redux state with the new data
      dispatch(
        setPlantingData({
          workingTrees: plantingSlice.workingTrees.filter(
            (t) => t.treeId !== plantingSlice.selectedTree?.treeId
          ),
          workingProject: updatedOrdersList.find(
            (proj) => proj.id === plantingSlice.workingProject?.id
          ),
          ordersList: updatedOrdersList,
        })
      );
    } catch (error: any) {
      console.log(error);
      toast.dismiss();
      const errors = extractErrors(error?.response);
      toast.error(errors[0]);
    }
  };

  return (
    <Sheet
      open={plantingSlice.reportTree !== null}
      onOpenChange={() => {
        dispatch(setPlantingData({ reportTree: null }));
      }}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Tree Profile</SheetTitle>
        </SheetHeader>
        {loading ? (
          <div className="flex justify-center items-center gap-5 h-[70vh]">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="mt-4">
            <div className="flex flex-col gap-2 ">
              <p>ID : {treeData?.treeId}</p>
              <p>Order ID: {treeData?.orderIdNo}</p>
              <p>Project: {treeData?.expand?.project?.name}</p>
              <p>Tree Name: {treeData?.treeName}</p>
              <p>Tree Type: {treeData?.expand?.unit?.name}</p>
              <p>Tree Age: {ageOfDays(treeData?.plant_date || "")}</p>
              <p className="capitalize">Area Name: {treeData?.area.areaName}</p>
              <p>Location: {treeData?.location}</p>
              <p>Area Name: {treeData?.area.areaName}</p>
              <p>Area Type: {treeData?.area.areaType}</p>
              <div className="mt-2">
                <Label className="font-semibold">Tree Status</Label>
                <Select
                  value={status}
                  onValueChange={(e) => handleStatusChange(e)}
                >
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
        {plantingSlice.workingProject?.expand?.sdgs?.map((sdg) => (
          <SdgsView data={sdg} />
        ))}
        {treeData && <ReportsListTree tree={treeData} />}
        <div className="flex justify-between items-center mt-5 ">
          <Input
            className="rounded-none"
            readOnly
            value={`${window.location.origin}/track?projectId=${plantingSlice.workingProject?.id}&orderId=${plantingSlice.reportTree?.order}&treeId=${plantingSlice.reportTree?.id}`}
          />
          <Button
            onClick={() => {
              toast.dismiss();
              navigator.clipboard.writeText(
                `${window.location.origin}/track?projectId=${plantingSlice.workingProject?.id}&orderId=${plantingSlice.reportTree?.order}&treeId=${plantingSlice.reportTree?.id}`
              );
              toast.success("Copied to clipboard");
            }}
            className="rounded-none"
          >
            <Copy />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default TreeReport;
