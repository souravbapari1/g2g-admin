import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import React from "react";
import NewEmployeeForm from "./NewEmployeeForm";

function AddNewEmployee() {
  return (
    <WorkSpace>
      <WorkHeader title="Add New Employee" />
      <NewEmployeeForm />
    </WorkSpace>
  );
}

export default AddNewEmployee;
