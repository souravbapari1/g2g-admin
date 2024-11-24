import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import NewProjectForm from "./NewProjectForm";
import ProjectSaveAction from "./ProjectSaveAction";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import WorkHeader from "@/components/ui/custom/WorkHeader";

export const revalidate = 0;
export default function Page() {
  return (
    <WorkSpace>
      <WorkHeader title="New Project">
        <ProjectSaveAction />
      </WorkHeader>

      <div className="flex flex-1 flex-col gap-4 p-4 ">
        <NewProjectForm />
      </div>
    </WorkSpace>
  );
}
