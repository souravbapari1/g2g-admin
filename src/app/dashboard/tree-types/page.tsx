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

import { TreesManagement } from "./TreeTypesList";
import AddNewTreeTypeForm from "./manage/addNewTreeTypeForm";
import ExportDataView from "@/components/export";
import { Button } from "@/components/ui/button";
import { FaFileExcel } from "react-icons/fa";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import WorkHeader from "@/components/ui/custom/WorkHeader";

export default function Page() {
  return (
    <WorkSpace>
      <WorkHeader title="Tree Types">
        <ExportDataView base="tree_types" allowPdf={false}>
          <Button size="sm" variant="ghost" className="mr-2">
            <FaFileExcel /> Export Files
          </Button>
        </ExportDataView>
        <AddNewTreeTypeForm />
      </WorkHeader>

      <div className="flex flex-1 flex-col gap-4 p-4 ">
        <TreesManagement />
      </div>
    </WorkSpace>
  );
}
