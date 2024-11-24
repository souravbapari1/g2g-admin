import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import ResearchesList from "./ResearchesList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import WorkHeader from "@/components/ui/custom/WorkHeader";

export const revalidate = 0;
export default function Page() {
  return (
    <WorkSpace>
      <WorkHeader title="Researches">
        <Link href="/dashboard/researches/new">
          <Button size="sm" variant="outline">
            Add New
          </Button>
        </Link>
      </WorkHeader>
      <div className="flex flex-1 flex-col gap-4 p-4 ">
        <ResearchesList />
      </div>
    </WorkSpace>
  );
}
