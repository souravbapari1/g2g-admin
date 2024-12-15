import React from "react";

import { getUserPaymentInfo } from "./actions/getUserPaymentData";
import { getUser } from "@/request/worker/users/manageUsers";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import WorkHeader from "@/components/ui/custom/WorkHeader";
import UserViewItem from "./UserViewItem";

async function page({ params }: { params: { id: string } }) {
  const balance = await getUserPaymentInfo();

  return (
    <WorkSpace>
      <UserViewItem balance={balance} id={params.id} />
    </WorkSpace>
  );
}

export default page;
