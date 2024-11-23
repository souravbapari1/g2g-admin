"use client";

import { manuData } from "@/components/app-sidebar";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function NavSubMenu({ data }: { data: (typeof manuData)["navMain"][number] }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="w-full select-none">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setShowMenu(!showMenu)}
      >
        <p className="flex justify-start items-center gap-3 w-full py-1 ">
          <span>
            <data.icon size={15} />
          </span>
          <span className="mt-1">{data.title}</span>
        </p>
        {data.items && <ChevronRight size={14} />}
      </div>
      {data.items && showMenu && (
        <div className="flex flex-col text-sm mb-3 ml-3">
          {data.items?.map((item) => (
            <Link href={item.url} key={item.title} className="px-4 pt-2">
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default NavSubMenu;
