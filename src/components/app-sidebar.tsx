"use client";

import * as React from "react";
import {
  Award,
  BookOpen,
  Bot,
  Clover,
  Command,
  Earth,
  Frame,
  GraduationCap,
  Group,
  GroupIcon,
  Handshake,
  LayoutDashboard,
  LayoutList,
  LetterText,
  LifeBuoy,
  ListOrdered,
  ListTodo,
  Map,
  NotebookPen,
  PieChart,
  Send,
  Settings2,
  Sprout,
  SquareTerminal,
  Trees,
  TvMinimalPlay,
  UsersRound,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";

const data = {
  user: {
    name: "Gray To Green",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "DashBoard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Users",
      url: "#",
      icon: UsersRound,

      items: [
        {
          title: "Customers",
          url: "/dashboard/users",
        },
        {
          title: "Admins & Employee",
          url: "/dashboard/users/admins",
        },
      ],
    },
    {
      title: "Partners Management",
      url: "/dashboard/partners",
      icon: Handshake,
    },
    {
      title: "Manage Trees",
      url: "#",
      icon: Trees,
      items: [
        {
          title: "Tree Types",
          url: "/dashboard/tree-types",
        },
        {
          title: "Planting Tree",
          url: "/dashboard/planting",
        },
        {
          title: "Trees Activity",
          url: "/dashboard/trees-activity",
        },
      ],
    },
    {
      title: "Orders",
      url: "#",
      icon: LayoutList,
      items: [
        {
          title: "Trees Donation Orders",
          url: "/dashboard/orders/trees-orders",
        },
      ],
    },
    {
      title: "Memberships",
      url: "#",
      icon: Clover,

      items: [
        {
          title: "Our Plans",
          url: "#",
        },
        {
          title: "View Statics",
          url: "#",
        },
        {
          title: "Requests",
          url: "#",
        },
        {
          title: "Add New",
          url: "#",
        },
      ],
    },
    {
      title: "Volunteers",
      url: "#",
      icon: Award,
    },
    {
      title: "Live & Podcasts",
      url: "#",
      icon: TvMinimalPlay,
    },
    {
      title: "Academy",
      url: "#",
      icon: GraduationCap,
      items: [
        {
          title: "Join Requests",
          url: "#",
        },
        {
          title: "Manage Plans",
          url: "#",
        },
      ],
    },
    {
      title: "Our Blogs",
      url: "#",
      icon: LetterText,
    },
    {
      title: "Catalogs",
      url: "#",
      icon: Frame,
      items: [
        {
          title: "Project Types",
          url: "/dashboard/catalogs/project-types",
        },
        {
          title: "SDG`s",
          url: "/dashboard/catalogs/sdgs",
        },
        {
          title: "Unit Types",
          url: "/dashboard/catalogs/unit-types",
        },
        {
          title: "Measurement",
          url: "/dashboard/catalogs/measurement",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "View Projects",
      url: "/dashboard/projects",
      icon: Earth,
    },
    {
      name: "Create New Project",
      url: "/dashboard/projects/new",
      icon: Sprout,
    },
    {
      name: "Reporting",
      url: "/dashboard/projects/reports",
      icon: NotebookPen,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="#">
                <Image
                  src="/logo/main-logo.png"
                  alt=""
                  width={180}
                  height={38}
                  className="h-8 object-contain w-auto"
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
