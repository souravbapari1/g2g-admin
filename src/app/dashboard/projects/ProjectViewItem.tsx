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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProjectItem } from "@/interfaces/project";
import { client, extractErrors, genPbFiles } from "@/request/actions";
import { deleteProject } from "@/request/worker/project/manageProject";
import { Edit2, EllipsisVertical, Star, StarsIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import NewOrder from "./newOrder/NewOrder";
import ManageProjectReport from "@/components/project/report/ManageProjectReport";
import { useQuery } from "react-query";

function ProjectViewItem({
  index,
  project,
}: {
  project: ProjectItem;
  index: number;
}) {
  const [isDelete, setDelete] = useState(false);
  const complete = useQuery(["complete", project.id], async () => {
    return await client
      .get("/project/target", {
        id: project.id,
        type: project.project_prefix,
      })
      .send<{ total: number }>();
  });
  function calculatePercentage(completed: number, target: number): string {
    return ((completed / target) * 100).toFixed(2);
  }
  return (
    <tr style={{ opacity: isDelete ? 0.3 : 1 }}>
      <td>{index}</td>
      <td className="flex-wrap">
        <div className="flex justify-start items-center gap-2">
          {project.top_project && (
            <Badge
              variant="outline"
              className="flex justify-center items-center text-xs font-normal"
            >
              <StarsIcon size={14} className="text-yellow-600 mr-2" />{" "}
              <span>TOP</span>
            </Badge>
          )}{" "}
          {project.name}
        </div>
        <p className="text-xs mt-1">ID: {project.id}</p>
      </td>
      <td>{project.expand?.type?.name}</td>
      <td>
        <div className="flex gap-2">
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
      </td>
      <td className="text-center">
        {calculatePercentage(
          complete.data?.total || 0,
          project.number_of_target_unit
        ) || "0"}{" "}
        %
      </td>
      <td className="text-center">
        {project.unit_types.length} {project.unit_measurement}
      </td>
      <td>
        {project.number_of_target_unit} {project.unit_measurement}
      </td>
      <td>{project.omr_unit} OMR</td>
      <td>{project.expand?.accredation_standars?.title}</td>
      <td>{project.start_date}</td>
      <td>{project.end_date}</td>
      <td>
        {project.country}/{project.city}
      </td>

      <td>
        <div className="flex -space-x-5 justify-center items-center">
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
      </td>
      <td>
        <div className="flex -space-x-5 justify-center items-center">
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
      </td>
      <td>
        {project.expand?.created_by?.first_name}{" "}
        {project.expand?.created_by?.last_name}
      </td>
      <td>
        <Badge
          variant={project.status === "active" ? "default" : "destructive"}
        >
          {project.status}
        </Badge>
      </td>
      <td className="action">
        <ProjectViewItemActions
          project={project}
          isDelete={isDelete}
          onDelete={setDelete}
        />
      </td>
    </tr>
  );
}

export default ProjectViewItem;

const DeleteProject = ({
  onDelete,
  id,
  open,
  setOpen,
}: {
  onDelete: Function;
  id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
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

function ProjectViewItemActions({
  project,
  isDelete,
  onDelete,
}: {
  project: ProjectItem;
  onDelete: Function;
  isDelete: boolean;
}) {
  const [openDelete, setOpenDelete] = useState(false);
  const [showNewOrder, setShowNewOrder] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={`/dashboard/projects/${project.id}`}>Update</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDelete(true)}>
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowNewOrder(true)}>
            New Order
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenReport(true)}>
            Reports
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ManageProjectReport
        open={openReport}
        setOpen={setOpenReport}
        project={project}
      />
      <NewOrder
        projectId={project.id}
        open={showNewOrder}
        setOpen={setShowNewOrder}
      />
      <DeleteProject
        open={openDelete}
        setOpen={setOpenDelete}
        id={project.id}
        onDelete={() => {
          onDelete(true);
        }}
      />
    </>
  );
}
