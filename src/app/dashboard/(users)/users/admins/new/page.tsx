import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import React from "react";
import NewAdminForm from "./NewAdminForm";

function AddNewAdmin() {
  return (
    <WorkSpace>
      <WorkHeader title="Add New Admin" />
      <NewAdminForm />
    </WorkSpace>
  );
}

export default AddNewAdmin;
