import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { SdgsList } from "./SdgsList";
import NewSdgForm from "./manage/NewSdgForm";
import ExportDataView from "@/components/export";
import { Button } from "@/components/ui/button";
import { FaFileExcel } from "react-icons/fa";

export default function Page() {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 justify-between items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Sustainable Development Goal</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex justify-end items-center gap-5">
            <ExportDataView base="sdg_list">
              <Button size="sm" variant="secondary">
                <FaFileExcel /> Export Files
              </Button>
            </ExportDataView>
            <NewSdgForm />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 ">
          <SdgsList />
        </div>
      </SidebarInset>
    </>
  );
}
