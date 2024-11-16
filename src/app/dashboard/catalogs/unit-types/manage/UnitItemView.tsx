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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { UnitItem } from "@/interfaces/units";
import { extractErrors } from "@/request/actions";
import { deleteUnitTypes } from "@/request/worker/catalogs/unitTypes";
import { Eye, Pencil, Trash2 } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import UpdateUnitTypeForm from "./UpdateUnitTypeForm";

function UnitItemView({ index, unit }: { unit: UnitItem; index: number }) {
  const [isDelete, setIsDelete] = useState(false);
  const [showAllParams, setShowAllParams] = useState(false);

  return (
    <TableRow style={{ opacity: isDelete ? 0.3 : 1 }}>
      <TableCell className="text-center border-r">{index}</TableCell>
      <TableCell className="text-center border-r">
        <div className="flex justify-center items-center gap-2">
          <div
            style={{
              backgroundColor: unit.color,
              width: "13px",
              height: "13px",
              borderRadius: "50%",
              border: "1px solid black",
            }}
          />
          <p>{unit.name}</p>
        </div>
      </TableCell>
      <TableCell className="text-center border-r">
        {unit.expand?.project_type?.map((e) => (
          <Badge key={e.id} variant="default" className="mr-2 text-xs">
            {e.name}
          </Badge>
        ))}
      </TableCell>
      <TableCell className="text-center border-r text-nowrap">
        <div className="flex flex-col gap-1 flex-wrap text-xs">
          {showAllParams &&
            unit.parameters.map((e, i) => (
              <div className="flex justify-between items-center" key={i}>
                <Badge variant="secondary" className="rounded-none">
                  {e.name}
                </Badge>
                <div className="w-full h-[1px] bg-gray-200"></div>
                <Badge variant="secondary">{e.value}</Badge>
              </div>
            ))}
          {unit.parameters.length > 1 && (
            <div>
              {!showAllParams && (
                <div className="flex justify-between items-center">
                  <Badge variant="secondary" className="rounded-none">
                    {unit.parameters[0].name}
                  </Badge>
                  <div className="w-full h-[1px] bg-gray-200"></div>
                  <Badge variant="secondary">{unit.parameters[0].value}</Badge>
                </div>
              )}
              <div
                className="flex justify-start items-center gap-2 cursor-pointer"
                onClick={() => setShowAllParams(!showAllParams)}
              >
                <Badge
                  variant="outline"
                  className="text-xs flex justify-center items-center gap-2 font-light mt-2"
                >
                  <Eye size={12} />
                  <p>{showAllParams ? "Hide" : "Show More"}</p>
                </Badge>
              </div>
            </div>
          )}
        </div>
      </TableCell>
      <TableCell className="text-center border-r">{unit.unit}</TableCell>
      <TableCell className="text-center border-r">{unit.orm_unit}</TableCell>
      <TableCell>
        <div
          className="flex justify-center items-center gap-4"
          style={{ display: isDelete ? "none" : "flex" }}
        >
          <UpdateUnitTypeForm data={unit} />
          <DeleteUnitType id={unit.id} onDelete={() => setIsDelete(true)} />
        </div>
      </TableCell>
    </TableRow>
  );
}

export default UnitItemView;

const DeleteUnitType = ({
  onDelete,
  id,
}: {
  onDelete: Function;
  id: string;
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      toast.loading("Deleting Unit Type...");
      await deleteUnitTypes(id);
      setLoading(false);
      toast.dismiss();
      toast.success("Unit Type Deleted Successfully");
      onDelete();
      setOpen(false);
    } catch (error: any) {
      setLoading(false);
      toast.dismiss();
      const errors = extractErrors(error?.response || {});
      toast.error(errors?.[0] || "Failed to delete unit type.");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 color="#ffffff" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this unit
            type and remove its data from our system.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
