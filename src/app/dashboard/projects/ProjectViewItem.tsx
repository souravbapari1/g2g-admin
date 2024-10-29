"use client";
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
import { ProjectItem } from "@/interfaces/project";
import { extractErrors } from "@/request/actions";
import { deleteProject } from "@/request/worker/project/manageProject";
import { Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

function ProjectViewItem({
  index,
  project,
}: {
  project: ProjectItem;
  index: number;
}) {
  const [isDelete, setDelete] = useState(false);

  return (
    <TableRow key={project.id} style={{ opacity: isDelete ? 0.3 : 1 }}>
      <TableCell className="text-center border-r font-medium">
        {index}
      </TableCell>
      <TableCell className="text-center border-r">{project.name}</TableCell>
      <TableCell className="text-center border-r">
        {project.expand?.type?.name}
      </TableCell>
      <TableCell className="text-center border-r">
        <div className="flex flex-row flex-wrap gap-2">
          {project?.main_interventions?.map((e) => {
            return (
              <Badge variant="secondary" key={e}>
                {e}
              </Badge>
            );
          })}
        </div>
      </TableCell>
      <TableCell className="text-center border-r">
        {project.number_of_target_unit}
      </TableCell>
      <TableCell className="text-center border-r">{project.omr_unit}</TableCell>
      <TableCell className="text-center border-r">
        {project.country},{project.city}
      </TableCell>
      <TableCell className="uppercase text-center border-r">
        <Badge variant="outline">{project.status}</Badge>
      </TableCell>
      <TableCell className="text-center ">
        <div
          className="flex gap-5 justify-center items-center"
          key={project.id}
          style={{ display: isDelete ? "none" : "flex" }}
        >
          <Link href={`/dashboard/projects/${project.id}`}>
            <Edit2 size={18} className="cursor-pointer" />
          </Link>
          <DeleteProject
            id={project.id}
            onDelete={() => {
              setDelete(true);
            }}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}

export default ProjectViewItem;

const DeleteProject = ({
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
      toast.loading("Deleting Project...");
      await deleteProject(id);
      setLoading(false);
      toast.dismiss();
      toast.success("Project Deleted Successfully");
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
        <Trash2 color="red" size={18} />
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
