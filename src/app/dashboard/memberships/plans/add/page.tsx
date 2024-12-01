import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import React from "react";
import NewMembership from "./NewMembership";
import { Button } from "@/components/ui/button";
import PlanSaveAction from "./PlanSaveAction";

function page() {
  return (
    <WorkSpace>
      <WorkHeader title="New Membership Plans">
        <PlanSaveAction />
      </WorkHeader>
      <NewMembership />
    </WorkSpace>
  );
}

export default page;
