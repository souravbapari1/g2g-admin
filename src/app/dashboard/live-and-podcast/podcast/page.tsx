import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

import PodcastVideos from "./PodcastVideos";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import WorkHeader from "@/components/ui/custom/WorkHeader";

export default function Page() {
  return (
    <WorkSpace>
      <WorkHeader title="Podcast Videos" />
      <div className="flex mt-5 flex-1 flex-col gap-4 p-4 pt-0">
        <PodcastVideos />
      </div>
    </WorkSpace>
  );
}
