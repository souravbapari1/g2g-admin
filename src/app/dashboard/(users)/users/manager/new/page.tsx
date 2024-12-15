import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import React from "react";
import NewManagerForm from "./NewManagerForm";

function AddNewAdmin() {
  return (
    <WorkSpace>
      <WorkHeader title="Add Manager" />
      <NewManagerForm />
    </WorkSpace>
  );
}

export default AddNewAdmin;
