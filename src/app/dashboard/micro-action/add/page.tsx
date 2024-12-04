import { Button } from "@/components/ui/button";
import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import React from "react";
import NewMCForm from "./NewMCForm";
import graphqlClient from "@/request/fetch/graphqlClient";
import { gql } from "@apollo/client";
import { SponsorsData } from "./sponsers";
import SaveAction from "./SaveAction";

export const revalidate = 60;
async function page() {
  return (
    <WorkSpace>
      <WorkHeader title="New Micro Action">
        <SaveAction />
      </WorkHeader>
      <NewMCForm />
    </WorkSpace>
  );
}

export default page;
