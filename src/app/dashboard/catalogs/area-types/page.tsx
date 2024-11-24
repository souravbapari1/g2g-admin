import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import AreaTypeList from "./AreaTypesList";
import ExportDataView from "@/components/export";
import { Button } from "@/components/ui/button";
import { FaFileExcel } from "react-icons/fa";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import WorkHeader from "@/components/ui/custom/WorkHeader";

export default function Page() {
  return (
    <WorkSpace>
      <WorkHeader title="Area Types">
        <ExportDataView base="area_type">
          <Button size="sm" variant="secondary">
            <FaFileExcel /> Export Files
          </Button>
        </ExportDataView>
      </WorkHeader>

      <div className="flex flex-1 flex-col gap-4 p-4 ">
        <AreaTypeList />
      </div>
    </WorkSpace>
  );
}
