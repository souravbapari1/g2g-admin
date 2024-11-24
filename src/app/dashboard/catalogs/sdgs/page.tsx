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
import WorkSpace from "@/components/ui/custom/WorkSpace";
import WorkHeader from "@/components/ui/custom/WorkHeader";

export default function Page() {
  return (
    <WorkSpace>
      <WorkHeader title="SDGs">
        <ExportDataView base="sdg_list">
          <Button size="sm" variant="secondary">
            <FaFileExcel /> Export Files
          </Button>
        </ExportDataView>
        <NewSdgForm />
      </WorkHeader>
      <div className="flex flex-1 flex-col gap-4 p-4 ">
        <SdgsList />
      </div>
    </WorkSpace>
  );
}
