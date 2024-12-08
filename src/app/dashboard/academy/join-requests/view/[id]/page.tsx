import React from "react";
import { getAcademicById } from "../../manageRequests";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import WorkHeader from "@/components/ui/custom/WorkHeader";
import AcademicRequestView from "./AcademicRequestView";

export const revalidate = 0;

async function page({ params }: { params: { id: string } }) {
  const data = await getAcademicById(params.id);

  // Destructure the data from your JSON for easier access

  return (
    <WorkSpace>
      <WorkHeader title="Academic Details" />
      <AcademicRequestView data={data} />
    </WorkSpace>
  );
}

export default page;
