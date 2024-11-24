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
import WorkSpace from "@/components/ui/custom/WorkSpace";
import WorkHeader from "@/components/ui/custom/WorkHeader";

export default function Page() {
  return (
    <WorkSpace>
      <WorkHeader title="Trees Activity" />
      <div className="flex flex-1 flex-col gap-4 p-4 ">
        <TreeActivtyList />
      </div>
    </WorkSpace>
  );
}
