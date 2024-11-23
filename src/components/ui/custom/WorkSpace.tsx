"use client";
import React, { useState } from "react";
import { Button } from "../button";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, LayoutDashboard } from "lucide-react";
import { manuData } from "@/components/app-sidebar";
import NavSubMenu from "./NavSubMenu";

function WorkSpace() {
  const [showMenu, setShowMenu] = useState(true);
  return (
    <div className="flex flex-row relative w-full">
      {/* Sidebar */}
      {showMenu && (
        <div className="min-w-[300px] h-screen border-r sticky top-0 left-0 bg-gray-50 p-5">
          <div className="flex  justify-between items-center">
            <Link href="#">
              <Image
                src="/logo/main-logo.png"
                alt=""
                width={180}
                height={38}
                className="h-8 object-contain w-auto"
              />
            </Link>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowMenu(!showMenu)}
            >
              <ChevronLeft size={22} />
            </Button>
          </div>
          <div className="mt-10">
            <div className="flex justify-between items-start gap-1 flex-col">
              {manuData.navMain.map((item) => (
                <NavSubMenu data={item} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="w-full relative">
        <div
          style={{ width: showMenu ? "calc(100% - 300px)" : "100%" }}
          className="p-10"
        >
          <Button onClick={() => setShowMenu(!showMenu)}>Menu</Button>
          <div className="relative w-full overflow-x-auto max-h-[80vh] mx-auto">
            <table className="tblView">
              <thead>
                <tr>
                  <th>name</th>
                  <th>email</th>
                  <th>password</th>
                  <th>name</th>
                  <th>email</th>
                  <th>password</th>
                  <th>name</th>
                  <th>email</th>
                  <th>password</th>
                  <th>name</th>
                  <th>email</th>
                  <th>password</th>
                  <th>name</th>
                  <th>email</th>
                  <th>password</th>
                  <th>name</th>
                  <th>email</th>
                  <th>password</th>
                  <th>name</th>
                  <th>email</th>
                  <th className="action">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 40 }).map((_, i) => (
                  <tr key={i}>
                    <td>name</td>
                    <td>email</td>
                    <td>Allow column widths to adjust based on content</td>
                    <td>name</td>
                    <td>email</td>
                    <td>password</td>
                    <td>name</td>
                    <td>email</td>
                    <td>password</td>
                    <td>name</td>
                    <td>email</td>
                    <td>password</td>
                    <td>name</td>
                    <td>email</td>
                    <td>password</td>
                    <td>name</td>
                    <td>Allow column widths to adjust based on content</td>
                    <td>password</td>
                    <td>name</td>
                    <td>Last</td>
                    <td className="action">dfvxdfgd</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkSpace;
