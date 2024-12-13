import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import React from "react";
import UserProfile from "./UserProfile";

function page({ params }: { params: { id: string } }) {
  return (
    <WorkSpace>
      <WorkHeader title="User Details" />
      <UserProfile id={params.id} />
    </WorkSpace>
  );
}

export default page;
