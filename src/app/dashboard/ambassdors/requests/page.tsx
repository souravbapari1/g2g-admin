import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import React from "react";
import RequestList from "./RequestList";

function page() {
  return (
    <WorkSpace>
      <WorkHeader title="Ambassadors Requests" />
      <RequestList />
    </WorkSpace>
  );
}

export default page;
