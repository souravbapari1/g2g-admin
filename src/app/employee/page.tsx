import React from "react";
import { TreeOrdersTable } from "../dashboard/orders/trees-orders/TreeOrdersList";
import { Trees, TreesIcon } from "lucide-react";
import Link from "next/link";

function page() {
  return (
    <div className="w-full h-full">
      <TreeOrdersTable />
      <Link
        href="/employee/planting"
        className="w-16 cursor-pointer flex justify-center items-center h-16 rounded-2xl bg-green-500 text-white z-20 absolute bottom-8 left-8  shadow-md "
      >
        <TreesIcon size={28} />
      </Link>
    </div>
  );
}

export default page;
