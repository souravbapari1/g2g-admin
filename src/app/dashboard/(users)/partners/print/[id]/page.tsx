import { getPartner } from "@/request/worker/partnors/managePartners";
import { getUsers } from "@/request/worker/users/manageUsers";
import React from "react";
import PrintUser from "./PrintUser";

async function page({ params }: { params: { id: string } }) {
  const user = await getPartner(params.id);
  return (
    <div className="w-full">
      <PrintUser userData={user} />
    </div>
  );
}

export default page;
