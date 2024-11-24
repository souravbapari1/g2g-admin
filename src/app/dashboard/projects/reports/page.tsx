import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import ReportsList from "./ReportsList";
import NewReportForm from "./manage/NewReportForm";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import WorkHeader from "@/components/ui/custom/WorkHeader";

export const revalidate = 0;
export default function Page() {
  return (
    <WorkSpace>
      <WorkHeader title="Reports">
        <NewReportForm />
      </WorkHeader>
      <div className="flex flex-1 flex-col gap-4 p-4 ">
        <ReportsList />
      </div>
    </WorkSpace>
  );
}
