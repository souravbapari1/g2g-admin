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
  Leaf,
  LetterText,
  LifeBuoy,
  ListOrdered,
  ListTodo,
  Map,
  Microscope,
  MicVocal,
  NotebookPen,
  PieChart,
  Printer,
  Send,
  Settings2,
  Sprout,
  SquareTerminal,
  Trees,
  TvMinimalPlay,
  UserCheck,
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
import { useFilesState } from "./project/report/projectReportState";
import { it } from "node:test";

const role = localStorage.getItem("role") || "ADMIN";

export const manuData = {
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

          // {
          //   title: "Researches",
          //   url: "/dashboard/researches",
          //   icon: Microscope,
          // },
          {
            title: "Orders",
            url: "#",
            icon: LayoutList,
            items: [
              {
                title: "Trees Donation Orders",
                url: "/dashboard/orders/trees-orders",
              },
              {
                title: "Others Project Orders",
                url: "/dashboard/orders/others-orders",
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
                url: "/dashboard/memberships/plans",
              },

              {
                title: "Requests",
                url: "/dashboard/memberships/requests",
              },
            ],
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
              {
                title: "Category",
                url: "/dashboard/live-and-podcast/category",
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
                url: "/dashboard/academy/join-requests",
              },
              {
                title: "FSLP Requests",
                url: "/dashboard/academy/fslp-requests",
              },
            ],
          },
          {
            title: "Micro-Action",
            url: "#",
            icon: Sprout,
            items: [
              {
                title: "Mange Actions",
                url: "/dashboard/micro-action",
              },
              {
                title: "Impactors Details List",
                url: "/dashboard/micro-action/impactors-details-list",
              },
            ],
          },
          // {
          //   title: "Our Blogs",
          //   url: "/dashboard/blogs",
          //   icon: LetterText,
          // },
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
                title: "Accredation Standars",
                url: "/dashboard/catalogs/accredation-standars",
              },
            ],
          },
        ],
  management: [
    {
      title: "User Management",
      url: "#",
      icon: UserCheck,
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
      title: "Partner Management",
      url: "/dashboard/partners",
      icon: Handshake,
    },
    {
      title: "Ambassdor Management",
      url: "#",
      icon: MicVocal,
      items: [
        {
          title: "Ambassador Reports",
          url: "/dashboard/ambassdors/reports",
        },
        {
          title: "Pending Requests",
          url: "/dashboard/ambassdors/requests",
        },
      ],
    },
    {
      title: "Content Management",
      url: "http://194.238.19.82:1337/admin",
      icon: Leaf,
    },
    {
      title: "Print Blogs & Researches",
      url: "/dashboard/print-data",
      icon: Printer,
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
        <NavMain items={manuData.navMain} />
        {role == "ADMIN" ? <NavProjects projects={manuData.projects} /> : null}
        {/* <NavSecondary items={manuData.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={manuData.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
