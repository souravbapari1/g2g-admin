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

export const revalidate = 0;
export default async function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 justify-between">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Update Project</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <ProjectUpdateAction id={params.id} />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 ">
          <UpdateProjectForm id={params.id} />
        </div>
      </SidebarInset>
    </>
  );
}
