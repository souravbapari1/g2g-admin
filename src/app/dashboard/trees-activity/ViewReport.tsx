import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tree } from "@/interfaces/treeOrders";
import { Copy, Eye } from "lucide-react";

import React, { useEffect, useState } from "react";
import TreeReport from "../planting/TreeReport/TreeReport";
import ReportsListTree from "../planting/TreeReport/ReportsListTree";
import { ageOfDays } from "@/helper/dateTime";
import { TreeReportItem } from "@/interfaces/treeReport";
import toast from "react-hot-toast";
import {
  getTree,
  updateTree,
} from "@/request/worker/orders/treeorders/manageTree";
import { extractErrors } from "@/request/actions";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SdgsView from "../planting/TreeReport/SdgView";

function ViewReport({
  tree,
  onUpdate,
}: {
  tree: Tree;
  onUpdate?: (tree: Tree) => void;
}) {
  const [treeData, setTreeData] = useState<Tree>(tree);
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<TreeReportItem>();
  const session = useSession();
  const loadTreeData = async () => {
    try {
      setLoading(true);
      const treeLoad = await getTree(
        tree.id,
        "project,user,order,unit,planted_by,project.sdgs,maped_by"
      );

      setTreeData(treeLoad);
      if (onUpdate) {
        onUpdate(treeLoad);
      }
      setLoading(false);
    } catch (error: any) {
      const errors = extractErrors(error?.response);
      setLoading(false);
      toast.error(errors[0]);
    }
  };

  const handleStatusChange = async (state: string) => {
    try {
      toast.loading("Updating Status...");
      const res = await updateTree(report!.tree, {
        status: state,
        updateBy: session.data?.user.id || "",
        planted_by: state === "new planted" ? session.data?.user.id : undefined,
      });
      toast.dismiss();
      toast.success("Status Updated Successfully");
      loadTreeData();
      // Update Redux state with the new data
    } catch (error: any) {
      console.log(error);
      toast.dismiss();
      const errors = extractErrors(error?.response);
      toast.error(errors[0]);
    }
  };

  return (
    <Sheet>
      <SheetTrigger>
        <div className="mx-auto w-full flex justify-center items-center">
          <Eye size={15} />
        </div>
      </SheetTrigger>
      {tree.status === "pending" ? (
        <SheetContent>
          <h1>Tree Not Plant On Map</h1>
        </SheetContent>
      ) : (
        <SheetContent className="px-0">
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
                  {ageOfDays(tree?.plant_date || "")}
                </p>
                <p className="bg-green-100 p-3 py-2">
                  <span className="font-medium text-gray-700">Area Name:</span>{" "}
                  <span className="capitalize">{tree?.area?.areaName}</span>
                </p>
                <p className="p-3 py-2">
                  <span className="font-medium text-gray-700">Location:</span>{" "}
                  {treeData?.location}
                </p>
                <p className="bg-green-100 p-3 py-2">
                  <span className="font-medium text-gray-700">Area Type:</span>{" "}
                  <span className="capitalize">{tree?.area?.areaType}</span>
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
                {treeData?.expand?.planted_by && (
                  <p className=" p-3 py-2">
                    <span className="font-medium text-gray-700">
                      Planted By:
                    </span>{" "}
                    <span className="capitalize">
                      {treeData.expand?.planted_by.first_name +
                        " " +
                        treeData.expand?.planted_by.last_name}
                    </span>
                  </p>
                )}
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
          <div className="p-4">
            <ReportsListTree
              tree={treeData}
              handleStatusChange={handleStatusChange}
              setLastReport={setReport}
            />
          </div>
          <div className="flex justify-between p-4 items-center mt-5 ">
            <Input
              className="rounded-none"
              readOnly
              value={`${window.location.origin}/track?projectId=${treeData.expand?.project?.id}&orderId=${treeData?.order}&treeId=${treeData?.id}`}
            />
            <Button
              onClick={() => {
                toast.dismiss();
                navigator.clipboard.writeText(
                  `${window.location.origin}/track?projectId=${treeData.expand?.project?.id}&orderId=${treeData?.order}&treeId=${treeData?.id}`
                );
                toast.success("Copied to clipboard");
              }}
              className="rounded-none"
            >
              <Copy />
            </Button>
          </div>
          <div className="p-4">
            {treeData.expand?.project?.expand?.sdgs?.map((sdg) => (
              <SdgsView data={sdg} />
            ))}
          </div>
        </SheetContent>
      )}
    </Sheet>
  );
}

export default ViewReport;
