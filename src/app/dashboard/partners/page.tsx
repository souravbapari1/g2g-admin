import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { PartnersList } from "./PartnersList";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import WorkHeader from "@/components/ui/custom/WorkHeader";

export default function Page() {
  return (
    <WorkSpace>
      <WorkHeader title="Partners" />
      <div className="flex flex-1 flex-col gap-4 p-4 ">
        <PartnersList />
      </div>
    </WorkSpace>
  );
}
