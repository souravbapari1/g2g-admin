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
import TreeActivtyList from "./TreeActivtyList";
import { Button } from "@/components/ui/button";
import { FaFileExcel } from "react-icons/fa";
import ExportDataView from "@/components/export";

export default function Page() {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Trees Activity</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <ExportDataView base="trees">
            <Button size="sm" variant="secondary" className="mr-10">
              <FaFileExcel /> Export Files
            </Button>
          </ExportDataView>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 ">
          <TreeActivtyList />
        </div>
      </SidebarInset>
    </>
  );
}
