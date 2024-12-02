import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import React from "react";
import OtherOrdersList from "./OtherOrdersList";

function page() {
  return (
    <WorkSpace>
      <WorkHeader title="Others Orders" />
      <OtherOrdersList />
    </WorkSpace>
  );
}

export default page;
