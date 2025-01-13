import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import React from "react";
import ViewFundsList from "./ViewFundsList";

function page() {
  return (
    <WorkSpace>
      <WorkHeader title="Funds Orders" />
      <ViewFundsList />
    </WorkSpace>
  );
}

export default page;
