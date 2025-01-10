import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import React from "react";
import ClubBasic from "./_clubhome/ClubBasic";

function page() {
  return (
    <WorkSpace>
      <WorkHeader title="Manage Club" />
      <ClubBasic />
    </WorkSpace>
  );
}

export default page;
