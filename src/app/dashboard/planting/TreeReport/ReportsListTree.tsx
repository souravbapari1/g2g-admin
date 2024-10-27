import { useMapContext } from "@/components/context/mapContext";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Eye } from "lucide-react";
import React, { useState } from "react";
import AddTreeReport from "./AddTreeReport";
import ViewPlantedTreeReport from "./ViewPlantedTreeReport";
import UpdatePlantTreeReport from "./UpdatePlantTreeReport";
import { Tree } from "@/interfaces/treeOrders";
import { TreeReportItem } from "@/interfaces/treeReport";
import { getTreeReports } from "@/request/worker/orders/treeorders/reports/manageTreeReport";
import { extractErrors } from "@/request/actions";
import toast from "react-hot-toast";
import { formatTimestampCustom } from "@/helper/dateTime";

function ReportsListTree({ tree }: { tree: Tree }) {
  const { map } = useMapContext();
  const plantingSlice = useAppSelector((state) => state.plantingSlice);
  const dispatch = useAppDispatch();
  const [reports, setReports] = useState<TreeReportItem[]>([]);

  const loadReports = async () => {
    return await getTreeReports(tree.id);
  };

  React.useEffect(() => {
    loadReports()
      .then((res) => {
        setReports(res.items);
      })
      .catch((e: any) => {
        console.log(e);
        const errors = extractErrors(e?.response);
        toast.error(errors[0]);
      });
  }, []);

  return (
    <div className="mt-4">
      <hr />
      <h1 className="mt-4 font-bold underline mb-4">Tree Reports</h1>
      {reports.map((report, index) => (
        <div
          className="flex justify-between text-sm  border p-3 px-4 items-center"
          key={index}
        >
          <p className="font-bold">{formatTimestampCustom(report.created)}</p>
          <div className="flex justify-end items-center gap-3">
            <UpdatePlantTreeReport
              report={report}
              onCompleted={() => loadReports()}
            />
            <ViewPlantedTreeReport report={report} key={index} />
          </div>
        </div>
      ))}
      <AddTreeReport tree={tree} onComplete={() => loadReports()} />
    </div>
  );
}

export default ReportsListTree;
