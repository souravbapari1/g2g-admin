import { TableCell, TableRow } from "@/components/ui/table";
import { TreeTypesItem } from "@/interfaces/treetypes";
import React, { useState } from "react";
import UpdateTreeTypeForm from "./updateTreeTypeForm";
import toast from "react-hot-toast";
import { deleteTreeType } from "@/request/worker/treetype/manageTreeTypes";
import { extractErrors } from "@/request/actions";
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
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function ViewTreeType({ index, tree }: { index: number; tree: TreeTypesItem }) {
  const [isDelete, setIsDelete] = useState(false);
  const [data, setData] = useState(tree);
  return (
    <TableRow key={index} style={{ opacity: isDelete ? 0.3 : 1 }}>
      <TableCell className="border-r text-center ">
        <div className="flex justify-center items-center gap-3">
          <div
            className="w-4 h-4 rounded-full border"
            style={{ background: data.color }}
          />
          <p> {data.name}</p>
        </div>
      </TableCell>
      <TableCell className="border-r text-center">{data.price} OMR</TableCell>
      <TableCell className="border-r text-center">
        {data.hectare_restored} Kha
      </TableCell>
      <TableCell className="border-r text-center">
        {data.co2_removal} ton/year
      </TableCell>
      <TableCell className="border-r text-center">
        {data.co2_storage} kg/year
      </TableCell>
      <TableCell className="border-r text-center">
        {data.air_quality} kg/year
      </TableCell>
      <TableCell className="border-r text-center">
        {data.rain_observed}Liter/year
      </TableCell>
      <TableCell className="border-r text-center">
        {data.energy_saved} Kwatt/Hr
      </TableCell>
      <TableCell className="border-r text-center">
        {data.state ? "Active" : "Inactive"}
      </TableCell>
      <TableCell
        className="text-center"
        style={{ display: isDelete ? "none" : "flex" }}
      >
        <div className="flex gap-4 justify-center items-center">
          <UpdateTreeTypeForm data={data} onUpdate={setData} />
          <DeleteTreeType id={data.id} onDelete={() => setIsDelete(true)} />
        </div>
      </TableCell>
    </TableRow>
  );
}

export default ViewTreeType;

const DeleteTreeType = ({
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
      toast.loading("Deleting Tree Type...");
      await deleteTreeType(id);
      setLoading(false);
      toast.dismiss();
      toast.success("Tree Type Deleted Successfully");
      onDelete();
      setOpen(false);
    } catch (error: any) {
      setLoading(false);
      toast.dismiss();
      const errors = extractErrors(error?.response);
      setLoading(false);
      toast.error(errors[0]);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        <Trash2 size={18} color="red" />
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
