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
  Microscope,
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

const role = localStorage.getItem("role") || "ADMIN";

const data = {
  user: {
    name: "Gray To Green",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain:
    role !== "ADMIN"
      ? [
          {
            title: "Dashboard",
            url: "/employee",
            icon: LayoutDashboard,
          },
          {
            title: "Tree Orders",
            url: "/employee/tree-orders",
            icon: ListTodo,
          },

          {
            title: "Planting Tree",
            url: "/employee/planting",
            icon: Trees,
          },
        ]
      : [
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
            title: "Researches",
            url: "/dashboard/researches",
            icon: Microscope,
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
            items: [
              {
                title: "Manage Live Videos",
                url: "/dashboard/live-and-podcast/live",
              },
              {
                title: "Manage Podcasts",
                url: "/dashboard/live-and-podcast/podcast",
              },
            ],
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
            url: "/dashboard/blogs",
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
              {
                title: "Area Types",
                url: "/dashboard/catalogs/area-types",
              },
              {
                title: "Blog Category",
                url: "/dashboard/catalogs/blog-category",
              },
              {
                title: "Accredation Standars",
                url: "/dashboard/catalogs/accredation-standars",
              },
              {
                title: "Researches Category",
                url: "/dashboard/catalogs/researches-category",
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
  projects:
    role !== "ADMIN"
      ? []
      : [
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
        {role == "ADMIN" ? <NavProjects projects={data.projects} /> : null}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
