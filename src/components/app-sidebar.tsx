"use client";

import {
  Clover,
  Earth,
  Frame,
  GraduationCap,
  Handshake,
  LayoutDashboard,
  LayoutList,
  Leaf,
  MicVocal,
  NotebookPen,
  PanelLeftInactiveIcon,
  Printer,
  Sprout,
  Trees,
  TvMinimalPlay,
  UserCheck,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { TbClubs } from "react-icons/tb";
type UserRoles =
  | "MANAGE_TREES"
  | "MANAGE_ORDERS"
  | "MANAGE_MEMBERSHIPS"
  | "LIVE_AND_PODCASTS"
  | "ACADEMIC"
  | "MICRO_ACTIONS"
  | "MANAGE_PROJECTS"
  | "CATALOG"
  | "INDIVIDUAL"
  | "PARTNER"
  | "AMBASSADOR";

export const manuData = {
  navMain: [
    {
      title: "DashBoard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },

    {
      title: "Manage Trees",
      url: "#",
      icon: Trees,
      permissions: "MANAGE_TREES",
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
      permissions: "MANAGE_ORDERS",
      items: [
        {
          title: "Trees Donation Orders",
          url: "/dashboard/orders/trees-orders",
        },
        {
          title: "Others Project Orders",
          url: "/dashboard/orders/others-orders",
        },
        {
          title: "Funds Donation",
          url: "/dashboard/orders/funds",
        },
      ],
    },
    {
      title: "Memberships",
      url: "#",
      icon: Clover,
      permissions: "MANAGE_MEMBERSHIPS",
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
      permissions: "LIVE_AND_PODCASTS",
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
      permissions: "ACADEMIC",
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
      permissions: "MICRO_ACTIONS",
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
      permissions: "CATALOG",
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
        {
          title: "Club Challenges",
          url: "/dashboard/catalogs/club-challenges",
        },
      ],
    },
  ],
  management: [
    {
      title: "Users",
      url: "/dashboard/users",
      icon: UserCheck,
      permissions: "INDIVIDUAL",
    },

    {
      title: "Partners",
      url: "/dashboard/partners",
      icon: Handshake,
      permissions: "PARTNER",
    },
    {
      title: "Ambassadors",
      url: "/dashboard/ambassadors",
      icon: MicVocal,
      permissions: "AMBASSADOR",
    },
    {
      title: "Admins",
      url: "/dashboard/partners",
      icon: Handshake,

      items: [
        {
          title: "Admins",
          url: "/dashboard/users/admins",
        },
        {
          title: "Managers",
          url: "/dashboard/users/manager",
        },
        {
          title: "Employees",
          url: "/dashboard/users/employee",
        },
      ],
    },

    {
      title: "Clubs",
      url: "/dashboard/clubs",
      icon: TbClubs,
      permissions: "CLUBS",
    },
    {
      title: "Content",
      url: "https://cms.grey-to-green.com/admin/content-manager",
      icon: Leaf,
      blank: true,
    },
    {
      title: "Print Blogs & Researches",
      url: "/dashboard/print-data",
      icon: Printer,
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
const role = localStorage.getItem("role") || "ADMIN";
const allowPermission: UserRoles | null = JSON.parse(
  localStorage.getItem("user") || "[]"
)?.allowPermission;

console.log(allowPermission);

export const genrateManuData = () => {
  if (role == "ADMIN") {
    return manuData;
  } else if (role == "MANAGER") {
    return {
      navMain: manuData.navMain.filter((item) =>
        allowPermission?.includes(item.permissions || "")
      ),

      management: manuData.management.filter((item) =>
        allowPermission?.includes(item.permissions || "")
      ),

      projects: allowPermission?.includes("MANAGE_PROJECTS")
        ? manuData.projects
        : [],
    };
  } else {
    return {
      navMain: [
        {
          title: "DashBoard",
          url: "/employee",
          icon: LayoutDashboard,
        },
        {
          title: "Trees Orders",
          url: "/employee/orders/tree-orders",
          icon: Trees,
          permissions: "MANAGE_TREES",
        },
        {
          title: "Other Orders",
          url: "/employee/orders/others-orders",
          icon: PanelLeftInactiveIcon,
          permissions: "MANAGE_Orders",
        },
        {
          title: "Plant Tree",
          url: "/employee/planting",
          icon: Sprout,
          permissions: "MANAGE_TREES",
        },
      ],
    };
  }
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
      {/* <SidebarFooter>
        <NavUser user={manuData.user} />
      </SidebarFooter> */}
    </Sidebar>
  );
}
