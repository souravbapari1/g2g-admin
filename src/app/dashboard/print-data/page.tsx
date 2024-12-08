import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import React from "react";
import ListView from "./ListView";

function page() {
  return (
    <WorkSpace>
      <WorkHeader title="Print Blogs & Research" />
      <ListView />
    </WorkSpace>
  );
}

export default page;
