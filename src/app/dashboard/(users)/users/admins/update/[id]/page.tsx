import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import React from "react";
import UpdateAdminForm from "./UpdateAdminForm";
import { getUser } from "@/request/worker/users/manageUsers";

export const revalidate = 0;
async function AddNewAdmin({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const id = params.id;
  const user = await getUser(id);
  return (
    <WorkSpace>
      <WorkHeader title="Update Admin" />
      <UpdateAdminForm user={user} />
    </WorkSpace>
  );
}

export default AddNewAdmin;
