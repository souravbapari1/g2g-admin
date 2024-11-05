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

export const revalidate = 0;
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
                  <BreadcrumbPage>Researches</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <Link href="/dashboard/researches/new">
            <Button size="sm" className="rounded-none mr-5" variant="secondary">
              Add New Research
            </Button>
          </Link>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 ">
          <ResearchesList />
        </div>
      </SidebarInset>
    </>
  );
}
