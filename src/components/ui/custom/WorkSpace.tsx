"use client";
import React, { useState } from "react";
import { Button } from "../button";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, LayoutDashboard, Menu } from "lucide-react";
import { manuData } from "@/components/app-sidebar";
import NavSubMenu from "./NavSubMenu";
import WorkHeader from "./WorkHeader";
import { useSideMenu } from "./navSTate";

function WorkSpace({ children }: { children?: React.ReactNode }) {
  const { open, openMenu, close } = useSideMenu();
  return (
    <div className="flex relative w-full h-screen">
      {/* Sidebar Toggle Button */}
      {!open && (
        <Button
          variant="outline"
          className="fixed shadow-lg left-0 top-9 rounded-none border-l-0 rounded-r-full pl-2 pr-2 cursor-pointer z-50"
          onClick={openMenu}
        >
          <ChevronRight size={22} />
        </Button>
      )}

      {/* Sidebar */}
      {open && (
        <div className="min-w-[280px] h-screen hide-scroll overflow-y-auto border-r sticky top-0 left-0 bg-gray-50 p-5">
          <div className="flex justify-between items-center">
            <Link href="#">
              <Image
                src="/logo/main-logo.png"
                alt="Logo"
                width={180}
                height={38}
                className="h-8 object-contain w-auto"
              />
            </Link>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full p-0 w-8 h-8"
              onClick={close}
            >
              <ChevronLeft size={22} />
            </Button>
          </div>
          <div className="mt-10">
            <p className="font-semibold font-mono mt-5 mb-2 underline">MENU</p>
            <div className="flex flex-col gap-1">
              {manuData.navMain.map((item) => (
                <NavSubMenu data={item as any} key={item.title} />
              ))}
            </div>
          </div>
          <div className="mt-5">
            <p className="font-semibold font-mono mb-2 underline">Project</p>
            {manuData.projects.map((item) => (
              <NavSubMenu data={item as any} key={item.name} />
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        className={`flex-1 h-screen overflow-auto ${
          open ? "pl-[0px]" : ""
        } transition-all`}
      >
        {children}
      </div>
    </div>
  );
}

export default WorkSpace;
