"use client";

import { manuData } from "@/components/app-sidebar";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion

function NavSubMenu({
  data,
}: {
  data: (typeof manuData)["navMain"][number] &
    (typeof manuData)["projects"][number];
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="w-full select-none">
      <div
        className="flex justify-between items-center cursor-pointer text-[15px]"
        onClick={() => {
          data.items && setShowMenu(!showMenu);
        }}
      >
        {data.items ? (
          <p className="flex justify-start items-center gap-3 w-full py-1">
            <span>
              <data.icon size={15} />
            </span>
            <span className="mt-1">{data.title}</span>
          </p>
        ) : (
          <Link
            href={data.url}
            className="flex justify-start items-center gap-3 w-full py-1"
          >
            <span>
              <data.icon size={15} />
            </span>
            <span className="mt-1">{data.title || data.name}</span>
          </Link>
        )}
        {data.items && (
          <motion.div
            animate={{ rotate: showMenu ? 90 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ChevronRight size={14} />
          </motion.div>
        )}
      </div>
      {data.items && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: showMenu ? "auto" : 0, opacity: showMenu ? 1 : 0 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="flex flex-col text-sm mb-3 ml-3">
            {data?.items?.map((item: any) => (
              <Link href={item.url} key={item.title} className="px-4 pt-2">
                {item.title || item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default NavSubMenu;
