import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import BlogsList from "./BlogsList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 justify-between w-full items-center gap-2">
          <div className="flex items-center  gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Blogs</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <Link href="/dashboard/blogs/new">
            <Button size="sm" variant="outline" className="mr-5 rounded-none">
              Add New Post
            </Button>
          </Link>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <BlogsList />
        </div>
      </SidebarInset>
    </>
  );
}
