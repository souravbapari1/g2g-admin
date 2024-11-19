import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ageOfDays } from "@/helper/dateTime";
import { Tree } from "@/interfaces/treeOrders";
import { setPlantingData } from "@/redux/Slices/plantingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { extractErrors } from "@/request/actions";
import {
  getTree,
  updateTree,
} from "@/request/worker/orders/treeorders/manageTree";
import { Copy } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ReportsListTree from "./ReportsListTree";
import SdgsView from "./SdgView";
import { TreeReportItem } from "@/interfaces/treeReport";

export const treeConditions = [
  { value: "new planted", label: "New Planted", color: "#add498" },
  { value: "good", label: "Good", color: "#24d430" },
  { value: "poor", label: "Poor", color: "#f9e86a" },
  { value: "dead", label: "Dead", color: "#636363" },
  { value: "producing", label: "Producing", color: "#00712D" },
];

function TreeReport() {
  const [loading, setLoading] = useState(true);
  const [treeData, setTreeData] = useState<Tree | null>(null);
  const { data } = useSession();
  const plantingSlice = useAppSelector((state) => state.plantingSlice);
  const dispatch = useAppDispatch();
  const [report, setReport] = useState<TreeReportItem>();

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
    setTreeData(null);
    if (plantingSlice.reportTree !== null) {
      loadTreeData();
    }
  }, [plantingSlice.reportTree, plantingSlice.ordersList]);

  const handleStatusChange = async (state: string) => {
    try {
      toast.loading("Updating Status...");
      const res = await updateTree(plantingSlice.reportTree!.id, {
        status: state,
        updateBy: data?.user.id || "",
        planted_by: state === "new planted" ? data?.user.id : undefined,
      });
      toast.dismiss();
      toast.success("Status Updated Successfully");
      const updatedOrdersList = plantingSlice.ordersList.map((project) => {
        // if (project.id !== plantingSlice.workingProject?.id) return project;
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
      <SheetContent className="p-0 text-sm">
        <SheetHeader className="px-4 pt-4">
          <SheetTitle>Tree Profile</SheetTitle>
        </SheetHeader>
        {loading ? (
          <div className="flex justify-center items-center gap-5 h-[70vh]">
            <LoadingSpinner />
          </div>
        ) : (
          <div className=" bg-green-50 mt-3 rounded-lg ">
            <div className="">
              <div className="grid grid-cols-1  ">
                <p className="bg-green-100 p-3 py-2">
                  <span className="font-medium text-gray-700">ID:</span>{" "}
                  {treeData?.treeId}
                </p>
                <p className="p-3 py-2">
                  <span className="font-medium text-gray-700">Order ID:</span>{" "}
                  {treeData?.orderIdNo}
                </p>
                <p className="bg-green-100 p-3 py-2">
                  <span className="font-medium text-gray-700">Project:</span>{" "}
                  {treeData?.expand?.project?.name}
                </p>
                <p className="p-3 py-2">
                  <span className="font-medium text-gray-700">Tree Name:</span>{" "}
                  {treeData?.treeName}
                </p>
                <p className="bg-green-100 p-3 py-2">
                  <span className="font-medium text-gray-700">Tree Type:</span>{" "}
                  {treeData?.expand?.unit?.name}
                </p>
                <p className="p-3 py-2">
                  <span className="font-medium text-gray-700">Tree Age:</span>{" "}
                  {ageOfDays(treeData?.plant_date || "")}
                </p>
                <p className="bg-green-100 p-3 py-2">
                  <span className="font-medium text-gray-700">Area Name:</span>{" "}
                  <span className="capitalize">{treeData?.area.areaName}</span>
                </p>
                <p className="p-3 py-2">
                  <span className="font-medium text-gray-700">Location:</span>{" "}
                  {treeData?.location}
                </p>
                <p className="bg-green-100 p-3 py-2">
                  <span className="font-medium text-gray-700">Area Type:</span>{" "}
                  <span className="capitalize">{treeData?.area.areaType}</span>
                </p>
                {report && (
                  <>
                    <p className=" p-3 py-2">
                      <span className="font-medium text-gray-700">Ob Cm:</span>{" "}
                      <span className="capitalize">{report.ob_cm} cm</span>
                    </p>
                    <p className="bg-green-100 p-3 py-2">
                      <span className="font-medium text-gray-700">Height:</span>{" "}
                      <span className="capitalize">{report.height} cm</span>
                    </p>
                    <p className=" p-3 py-2">
                      <span className="font-medium text-gray-700">
                        Updated By:
                      </span>{" "}
                      <span className="capitalize">
                        {report.expand.updateBy.first_name +
                          " " +
                          report.expand.updateBy.last_name}
                      </span>
                    </p>
                  </>
                )}
                <p className="p-3 py-2 bg-green-100">
                  <span className="font-medium text-gray-700">
                    Tree Condition:
                  </span>{" "}
                  <span className="capitalize">{treeData?.status}</span>
                </p>
              </div>

              {/* <div className="mt-4">
                <label
                  className="block text-gray-700 font-semibold mb-2"
                  htmlFor="treeStatus"
                >
                  Tree Status
                </label>
                <Select
                  value={status}
                  onValueChange={(e) => handleStatusChange(e)}
                >
                  <SelectTrigger className="w-full rounded-lg border-gray-300">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {treeConditions.map((condition) => (
                      <SelectItem
                        key={condition.value}
                        value={condition.value}
                        className="capitalize"
                      >
                        {condition.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div> */}
            </div>
          </div>
        )}

        <div className="p-4">
          {treeData && (
            <ReportsListTree
              tree={treeData}
              handleStatusChange={handleStatusChange}
              setLastReport={setReport}
            />
          )}
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
          {plantingSlice.workingProject?.expand?.sdgs?.map((sdg) => (
            <SdgsView data={sdg} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default TreeReport;
