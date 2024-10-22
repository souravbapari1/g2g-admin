"use client";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { ProjectType } from "@/interfaces/projectType";
import { Trash2 } from "lucide-react";
import UpdateProjectTypeForm from "./UpdateProjectTypeForm";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteProjectType } from "@/request/worker/catalogs/projectType";
import { extractErrors } from "@/request/actions";
import toast from "react-hot-toast";

function ViewProjectType({
  data,
  index,
}: {
  data: ProjectType;
  index: number;
}) {
  const [isDelete, setIsDelete] = useState(false);

  const [viewData, setViewData] = useState<ProjectType>(data);

  return (
    <TableRow style={{ opacity: isDelete ? 0.3 : 1 }}>
      <TableCell>{index}</TableCell>
      <TableCell>{viewData.name}</TableCell>
      <TableCell>
        <div className="flex gap-2 flex-wrap">
          {viewData.parameters.map((e, i) => {
            return (
              <Badge variant="outline" key={e}>
                {e}
              </Badge>
            );
          })}
        </div>
      </TableCell>
      <TableCell className="text-center uppercase">
        {viewData.unit_measurement}
      </TableCell>
      <TableCell>
        <div
          className="flex justify-center items-center gap-8"
          style={{ display: isDelete ? "none" : "flex" }}
        >
          <UpdateProjectTypeForm
            data={viewData}
            onUpdate={isDelete ? () => {} : setViewData}
          />
          <DeleteProjectType
            onDelete={() => (isDelete ? () => {} : setIsDelete(true))}
            id={data.id}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}

export default ViewProjectType;

const DeleteProjectType = ({
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
      toast.loading("Deleting Project Type...");
      await deleteProjectType(id);
      setLoading(false);
      toast.dismiss();
      toast.success("Project Type Deleted Successfully");
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
