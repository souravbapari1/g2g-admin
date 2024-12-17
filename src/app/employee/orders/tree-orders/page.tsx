import { TreeOrdersTable } from "@/app/dashboard/orders/trees-orders/TreeOrdersList";
import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import React from "react";

function page() {
  return (
    <WorkSpace>
      <WorkHeader title="Tree Orders" />
      <TreeOrdersTable />
    </WorkSpace>
  );
}

export default page;
