import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UnitTypesList } from "./UnitTypesList";
import NewUnitTypeForm from "./manage/NewUnitTypeForm";
import ExportDataView from "@/components/export";
import { Button } from "@/components/ui/button";
import { FaFileExcel } from "react-icons/fa";

export default function Page() {
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
                  <BreadcrumbPage>Unit Types</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex justify-end items-center gap-5">
            <ExportDataView base="unit_types">
              <Button size="sm" variant="secondary">
                <FaFileExcel /> Export Files
              </Button>
            </ExportDataView>

            <NewUnitTypeForm />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 ">
          <UnitTypesList />
        </div>
      </SidebarInset>
    </>
  );
}
