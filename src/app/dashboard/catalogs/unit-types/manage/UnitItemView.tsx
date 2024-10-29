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
import { Pencil, Trash2 } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import UpdateUnitTypeForm from "./UpdateUnitTypeForm";

function UnitItemView({ index, unit }: { unit: UnitItem; index: number }) {
  const [isDelete, setIsDelete] = useState(false);

  return (
    <TableRow style={{ opacity: isDelete ? 0.3 : 1 }}>
      <TableCell className="text-center border-r">{index}</TableCell>
      <TableCell className="text-center border-r">{unit.name}</TableCell>
      <TableCell className="text-center border-r">
        {unit.expand?.project_type?.name}
      </TableCell>
      <TableCell className="text-center border-r">
        <div className="flex flex-col  gap-2 flex-wrap">
          {unit.parameters.map((e, i) => {
            return (
              <div
                className="flex text-nowrap justify-between items-center  "
                key={i}
              >
                <Badge variant="outline" className="rounded-none">
                  {e.name}
                </Badge>
                <div className="w-full h-[1px] bg-gray-200"></div>
                <Badge variant="outline">{e.value}</Badge>
              </div>
            );
          })}
        </div>
      </TableCell>
      <TableCell className="text-center border-r">{unit.unit}</TableCell>
      <TableCell className="text-center border-r ">{unit.orm_unit}</TableCell>
      <TableCell>
        <div
          className="flex justify-center items-center gap-8"
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
