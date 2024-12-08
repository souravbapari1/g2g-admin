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
import { TreeOrdersTable } from "./TreeOrdersList";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import WorkHeader from "@/components/ui/custom/WorkHeader";
import ExportDataView from "@/components/export";
import { Button } from "@/components/ui/button";
import { FaFileExcel } from "react-icons/fa";

export default function Page() {
  return (
    <WorkSpace>
      <WorkHeader title="Trees Orders">
        <ExportDataView base="tree_planting_orders">
          <Button size="sm" variant="outline" className="mr-2">
            <FaFileExcel /> Export Files
          </Button>
        </ExportDataView>
      </WorkHeader>
      <div className="flex flex-1 flex-col gap-4 pt-0">
        <TreeOrdersTable />
      </div>
    </WorkSpace>
  );
}
