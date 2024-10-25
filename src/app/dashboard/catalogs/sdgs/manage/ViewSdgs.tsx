import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { SDGITEM } from "@/interfaces/sdg";
import { extractErrors, genPbFiles } from "@/request/actions";
import { Pencil, Trash2 } from "lucide-react";
import React, { useState } from "react";
import UpdateSdgForm from "./UpdateSdgForm";
import toast from "react-hot-toast";
import { deleteSdgs } from "@/request/worker/catalogs/sdgs";
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

function ViewSdgs({ sdg, index }: { sdg: SDGITEM; index: number }) {
  const [viewSdgData, setViewSdgData] = useState(sdg);
  const [isDelete, setIsDelete] = useState(false);
  return (
    <TableRow style={{ opacity: isDelete ? 0.3 : 1 }}>
      <TableCell>{index}</TableCell>
      <TableCell>
        <Avatar className="rounded-none">
          <AvatarImage
            className="rounded-none object-contain"
            src={genPbFiles(viewSdgData, viewSdgData.image)}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </TableCell>
      <TableCell>{viewSdgData.name}</TableCell>
      <TableCell>
        <div className="flex   gap-2 flex-wrap">
          {viewSdgData.parameters.map((e, i) => {
            return (
              <div
                className="flex text-nowrap justify-between items-center "
                key={i}
              >
                <Badge variant="outline">{e}</Badge>
              </div>
            );
          })}
        </div>
      </TableCell>
      <TableCell className="text-center uppercase">
        <div
          className="flex gap-2 justify-center items-center"
          style={{ display: isDelete ? "none" : "flex" }}
        >
          <div
            className="w-8 h-8 border "
            style={{ backgroundColor: viewSdgData.main_color }}
          ></div>
          <div
            className="w-8 h-8 border "
            style={{ backgroundColor: viewSdgData.sub_color }}
          ></div>
        </div>
      </TableCell>
      <TableCell>
        <div
          className="flex justify-center items-center gap-8"
          style={{ display: isDelete ? "none" : "flex" }}
        >
          <UpdateSdgForm sdg={viewSdgData} onUpdate={setViewSdgData} />
          <DeleteSdg
            id={viewSdgData.id}
            onDelete={() => {
              setIsDelete(true);
            }}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}

export default ViewSdgs;

const DeleteSdg = ({ onDelete, id }: { onDelete: Function; id: string }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      toast.loading("Deleting Sdg...");
      await deleteSdgs(id);
      setLoading(false);
      toast.dismiss();
      toast.success("SDG Deleted Successfully");
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
