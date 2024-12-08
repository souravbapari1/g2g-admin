import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import React from "react";
import ManageCategory from "./ManageCategory";

function page() {
  return (
    <WorkSpace>
      <ManageCategory />
    </WorkSpace>
  );
}

export default page;
