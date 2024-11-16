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
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProjectItem } from "@/interfaces/project";
import { extractErrors, genPbFiles } from "@/request/actions";
import { deleteProject } from "@/request/worker/project/manageProject";
import { Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import NewOrder from "./newOrder/NewOrder";

function ProjectViewItem({
  index,
  project,
}: {
  project: ProjectItem;
  index: number;
}) {
  const [isDelete, setDelete] = useState(false);

  return (
    <TableRow
      key={project.id}
      style={{ opacity: isDelete ? 0.3 : 1 }}
      className="text-xs"
    >
      <TableCell className="text-center border-r font-medium">
        {index}
      </TableCell>
      <TableCell className="text-left border-r">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="font-bold">
              {project.name}
            </TooltipTrigger>
            <TooltipContent>
              <p className="uppercase">ID: {project.id}</p>
              <p>
                Type :{" "}
                {project.project_prefix == "tree"
                  ? "Tree Projects"
                  : "Others Projects"}
              </p>
              {project.expand?.created_by && (
                <p className="capitalize">
                  Created By :{" "}
                  {project.expand?.created_by?.first_name +
                    " " +
                    project.expand?.created_by?.last_name}
                </p>
              )}
              <p>Start Date : {project.start_date}</p>
              {project.end_date && <p>End Date : {project.end_date}</p>}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      <TableCell className="text-center border-r ">
        {project.expand?.type?.name}
      </TableCell>
      <TableCell className="text-center border-r">
        <div className="flex flex-row flex-wrap gap-1">
          {project?.main_interventions?.map((e) => {
            return (
              <Badge
                variant="outline"
                className="rounded-sm font-light text-xs"
                key={e}
              >
                {e}
              </Badge>
            );
          })}
        </div>
      </TableCell>
      <TableCell className="text-center border-r">
        {project.number_of_target_unit + " " + project.unit_measurement}
      </TableCell>
      <TableCell className="text-center border-r">{project.omr_unit}</TableCell>
      <TableCell className="text-center border-r">
        {project.country},{project.city}
      </TableCell>

      <TableCell className="text-center border-r gap-2 capitalize text-nowrap ">
        <div className="flex -space-x-5 ">
          {project.expand?.operated_by?.map((user) => {
            return (
              <TooltipProvider key={user.id}>
                <Tooltip>
                  <TooltipTrigger>
                    <Avatar className="bg-gray-200">
                      <AvatarImage src={genPbFiles(user, user?.avatar)} />
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="capitalize">
                      {user?.first_name + " " + user?.last_name}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      </TableCell>
      <TableCell className="text-center  border-r  ">
        <div className="flex -space-x-5">
          {project.expand?.assigned_by?.map((user) => {
            return (
              <TooltipProvider key={user.id}>
                <Tooltip>
                  <TooltipTrigger>
                    <Avatar className="bg-gray-200">
                      <AvatarImage src={genPbFiles(user, user?.avatar)} />
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="capitalize">
                      {user?.first_name + " " + user?.last_name}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      </TableCell>
      <TableCell className="text-center border-r flex justify-center items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Avatar className="bg-gray-200">
                <AvatarImage
                  src={genPbFiles(
                    project.expand?.created_by,
                    project.expand?.created_by?.avatar
                  )}
                />
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p className="capitalize">
                {project.expand?.created_by?.first_name +
                  " " +
                  project.expand?.created_by?.last_name}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      <TableCell className="uppercase text-center border-r">
        <Badge
          variant={project.status === "active" ? "default" : "destructive"}
        >
          {project.status}
        </Badge>
      </TableCell>

      <TableCell className="text-center ">
        <div
          className="flex gap-2 justify-center items-center"
          key={project.id}
          style={{ display: isDelete ? "none" : "flex" }}
        >
          <NewOrder projectId={project.id} />
          <Link href={`/dashboard/projects/${project.id}`}>
            <Button size="sm" variant="secondary">
              <Edit2 size={18} className="cursor-pointer" />
            </Button>
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
        <Button size="sm" variant="destructive">
          <Trash2 color="#ffffff" size={18} />
        </Button>
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
