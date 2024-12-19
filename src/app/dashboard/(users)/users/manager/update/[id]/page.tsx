import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import React from "react";
import NewManagerForm from "./NewManagerForm";
import { getUser } from "@/request/worker/users/manageUsers";

export const revalidate = 0;
async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const data = await getUser(id);
  return (
    <WorkSpace>
      <WorkHeader title="Update Manager" />
      <NewManagerForm data={data} />
    </WorkSpace>
  );
}

export default Page;
