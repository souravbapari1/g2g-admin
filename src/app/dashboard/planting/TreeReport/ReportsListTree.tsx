import { useMapContext } from "@/components/context/mapContext";
import { formatTimestampCustom } from "@/helper/dateTime";
import { Tree } from "@/interfaces/treeOrders";
import { TreeReportItem } from "@/interfaces/treeReport";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { extractErrors, genPbFiles } from "@/request/actions";
import { getTreeReports } from "@/request/worker/orders/treeorders/reports/manageTreeReport";
import React, { useState } from "react";
import toast from "react-hot-toast";
import AddTreeReport from "./AddTreeReport";
import UpdatePlantTreeReport from "./UpdatePlantTreeReport";
import ViewPlantedTreeReport from "./ViewPlantedTreeReport";
import Image from "next/image";
import Link from "next/link";

function ReportsListTree({
  tree,
  handleStatusChange,
  setLastReport,
}: {
  tree: Tree;
  handleStatusChange: (state: string) => Promise<void>;
  setLastReport: (report: TreeReportItem) => void;
}) {
  const [reports, setReports] = useState<TreeReportItem[]>([]);

  const loadReports = async () => {
    getTreeReports(tree.id)
      .then((res) => {
        setLastReport(res.items[0]);
        setReports(res.items);
      })
      .catch((e: any) => {
        console.log(e);
        const errors = extractErrors(e?.response);
        toast.error(errors[0]);
      });
  };

  React.useEffect(() => {
    loadReports();
  }, []);

  return (
    <div className="mt-4">
      {reports.length > 0 && (
        <div className="grid grid-cols-2 gap-5">
          <Link
            href={genPbFiles(reports[0], reports[0]?.tree_image)}
            target="_blank"
          >
            <Image
              src={genPbFiles(reports[0], reports[0]?.tree_image)}
              alt=""
              width={200}
              height={200}
              className="w-full h-32 object-cover border"
            />
          </Link>
          <Link
            href={genPbFiles(reports[0], reports[0]?.street_image)}
            target="_blank"
          >
            <Image
              src={genPbFiles(reports[0], reports[0]?.street_image)}
              alt=""
              width={200}
              height={200}
              className="w-full h-32 object-cover border"
            />
          </Link>
        </div>
      )}
      <h1 className="mt-4 font-bold  mb-4">Tree Reports</h1>
      {reports.map((report, index) => (
        <div
          className="flex justify-between text-sm  border p-3 px-4 items-center"
          key={index}
        >
          <p className="font-bold capitalize">
            {formatTimestampCustom(report.created)} - {report.status}
          </p>
          <div className="flex justify-end items-center gap-3">
            <UpdatePlantTreeReport
              report={report}
              onCompleted={() => loadReports()}
            />
            <ViewPlantedTreeReport report={report} key={index} />
          </div>
        </div>
      ))}
      <AddTreeReport
        tree={tree}
        onComplete={(status) => {
          loadReports();
          handleStatusChange(status);
        }}
      />
    </div>
  );
}

export default ReportsListTree;
