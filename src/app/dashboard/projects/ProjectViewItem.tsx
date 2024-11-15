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
import { extractErrors, genPbFiles } from "@/request/actions";
import { deleteProject } from "@/request/worker/project/manageProject";
import { Edit2, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import NewOrder from "./newOrder/NewOrder";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGlobalDataSetContext } from "@/components/context/globalDataSetContext";
import { AvatarStack } from "@/components/ui/avatar-stack";

function ProjectViewItem({
  index,
  project,
}: {
  project: ProjectItem;
  index: number;
}) {
  const { usersListGlobal } = useGlobalDataSetContext();
  const [isDelete, setDelete] = useState(false);
  const createdUser = usersListGlobal?.find((e) => e.id === project.created_by);
  return (
    <TableRow key={project.id} style={{ opacity: isDelete ? 0.3 : 1 }}>
      <TableCell className="text-center border-r font-medium">
        {index}
      </TableCell>
      <TableCell className="text-center border-r">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>{project.name}</TooltipTrigger>
            <TooltipContent>
              <p className="uppercase">ID: {project.id}</p>
              <p>
                Type :{" "}
                {project.project_prefix == "tree"
                  ? "Tree Projects"
                  : "Others Projects"}
              </p>
              {createdUser && (
                <p className="capitalize">
                  Created By :{" "}
                  {createdUser.first_name + " " + createdUser.last_name}
                </p>
              )}
              <p>Start Date : {project.start_date}</p>
              {project.end_date && <p>End Date : {project.end_date}</p>}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
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
        {project.number_of_target_unit + " " + project.unit_measurement}
      </TableCell>
      <TableCell className="text-center border-r">{project.omr_unit}</TableCell>
      <TableCell className="text-center border-r">
        {project.country},{project.city}
      </TableCell>

      <TableCell className="text-center border-r gap-2 capitalize text-nowrap">
        {project.expand?.operated_by?.map((e) => {
          return (
            <Badge variant="secondary" key={e.id}>
              {e.first_name + " " + e.last_name}
            </Badge>
          );
        })}
      </TableCell>
      <TableCell className="text-center  border-r  ">
        <div className="">
          <div className="">
            {project.assigned_by?.map((e) => {
              const user = usersListGlobal?.find((u) => u.id === e);
              return (
                <AvatarStack
                  avatars={[
                    {
                      name: user?.first_name + " " + user?.last_name,
                      image: genPbFiles(user, user?.avatar),
                    },
                  ]}
                  key={e}
                  maxAvatarsAmount={4}
                  orientation={"horizontal"}
                  spacing={"sm"}
                />
              );
            })}
          </div>
        </div>
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
          <NewOrder projectId={project.id} />
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
