import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import NewProjectTypeForm from "./manage/NewProjectTypeForm";
import { ProjectTypesList } from "./ProjectTypesList";
import ExportDataView from "@/components/export";
import { Button } from "@/components/ui/button";
import { FaFileExcel } from "react-icons/fa";

export default function Page() {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 justify-between ">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Project Types</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="gap-5 flex justify-end items-center">
            <ExportDataView base="project_type">
              <Button size="sm" variant="secondary">
                <FaFileExcel /> Export Files
              </Button>
            </ExportDataView>
            <NewProjectTypeForm />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 ">
          <ProjectTypesList />
        </div>
      </SidebarInset>
    </>
  );
}
