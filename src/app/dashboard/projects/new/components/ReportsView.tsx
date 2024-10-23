import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { ReportingItem } from "@/interfaces/reporting";

import { extractErrors, genPbFiles } from "@/request/actions";
import { deleteReports } from "@/request/worker/catalogs/reports";
import { FileChartPie, Trash2 } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

import Link from "next/link";
import UpdateReportForm from "./UpdateReportForm";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setProjectDataValue } from "@/redux/Slices/projectParamsSlice";

function ReportsView({
  index,
  report,
}: {
  report: ReportingItem;
  index: number;
}) {
  const [viewReport, setViewReport] = useState(report);
  const [isDelete, setIsDelete] = useState(false);

  return (
    <TableRow style={{ opacity: isDelete ? 0.3 : 1 }}>
      <TableCell>{index}</TableCell>
      <TableCell>
        <Link
          href={genPbFiles(viewReport, viewReport.file)}
          target="_blank"
          className="flex items-center gap-3 justify-start"
        >
          <FileChartPie size={20} />{" "}
          <p className="line-clamp-1 text-ellipsis  ">{viewReport.file}</p>
        </Link>
      </TableCell>
      <TableCell>{viewReport.name}</TableCell>
      <TableCell>{viewReport.desc}</TableCell>

      <TableCell>
        <div
          className="flex justify-center items-center gap-8"
          style={{ display: isDelete ? "none" : "flex" }}
        >
          <UpdateReportForm report={viewReport} onUpdate={setViewReport} />
          <DeleteUnitType
            id={viewReport.id}
            onDelete={() => setIsDelete(true)}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}

export default ReportsView;

const DeleteUnitType = ({
  onDelete,
  id,
}: {
  onDelete: Function;
  id: string;
}) => {
  const state = useAppSelector((e) => e.projectParamsSlice);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      toast.loading("Deleting viewReport...");
      await deleteReports(id);
      dispatch(
        setProjectDataValue({
          key: "reports",
          data: state.project.reports.filter((e) => e !== id),
        })
      );
      setLoading(false);
      toast.dismiss();
      toast.success("Report Deleted Successfully");
      onDelete();
      setOpen(false);
    } catch (error: any) {
      setLoading(false);
      toast.dismiss();
      const errors = extractErrors(error.response);
      setLoading(false);
      toast.error(errors[0]);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        <Trash2 color="red" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={() => handleDelete()}
            disabled={loading}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
