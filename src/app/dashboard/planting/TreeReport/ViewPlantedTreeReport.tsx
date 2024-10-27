import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TreeReportItem } from "@/interfaces/treeReport";
import { Eye } from "lucide-react";
import { tree } from "next/dist/build/templates/app-page";

function ViewPlantedTreeReport({ report }: { report: TreeReportItem }) {
  return (
    <Dialog>
      <DialogTrigger>
        <Eye size={18} className="text-green-800 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="bg-white p-0 border-none">
        <DialogHeader>
          <DialogTitle className="px-5 pt-6">Tree Profile</DialogTitle>
        </DialogHeader>

        <div className="">
          <div className="grid grid-cols-2  bg-green-400/20 px-5 py-3">
            <b>Tree ID: </b>{" "}
            <p className="text-center">{report.expand.tree.id}</p>
          </div>
          <div className="grid grid-cols-2  bg-green-400/30 px-5 py-3">
            <b>Tree Name: </b>{" "}
            <p className="text-center">{report.expand.tree.treeName}</p>
          </div>
          <div className="grid grid-cols-2  bg-green-400/20 px-5 py-3">
            <b>Tree Type: </b>{" "}
            <p className="text-center">
              {report.expand.tree.expand?.type?.name}
            </p>
          </div>
          <div className="grid grid-cols-2  bg-green-400/30 px-5 py-3">
            <b>Assigned Project: </b>
            <p className="text-center">
              {report.expand.tree.expand?.project?.name}
            </p>
          </div>
          <div className="grid grid-cols-2  bg-green-400/20 px-5 py-3">
            <b>Planted Area: </b>
            <p className="text-center">{report.expand.tree.area.areaName}</p>
          </div>
          <div className="grid grid-cols-2  bg-green-400/30 px-5 py-3">
            <b>Order ID: </b>
            <p className="text-center">{report.expand.tree.orderIdNo}</p>
          </div>
          <div className="grid grid-cols-2  bg-green-400/20 px-5 py-3">
            <b>Map Location</b>
            <p className="text-center">{report.expand.tree.location}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ViewPlantedTreeReport;
