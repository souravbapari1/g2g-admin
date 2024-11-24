import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { IProjectParams } from "@/redux/Slices/projectParamsSlice";
import { genPbFiles } from "@/request/actions";
import { getProject } from "@/request/worker/project/manageProject";
import UpdateProjectForm from "./UpdateProjectForm";
import ProjectUpdateAction from "./ProjectUpdateAction";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import WorkHeader from "@/components/ui/custom/WorkHeader";

export const revalidate = 0;
export default async function Page({ params }: { params: { id: string } }) {
  return (
    <WorkSpace>
      <WorkHeader title="Update Project">
        <ProjectUpdateAction id={params.id} />
      </WorkHeader>

      <div className="flex flex-1 flex-col gap-4 p-4 ">
        <UpdateProjectForm id={params.id} />
      </div>
    </WorkSpace>
  );
}
