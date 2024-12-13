import { Button } from "@/components/ui/button";
import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import { getPartner } from "@/request/worker/partnors/managePartners";
import { PrinterCheck } from "lucide-react";
import Link from "next/link";
import React from "react";
import ViewPartnerData from "./ViewPartnerData";

async function page({ params }: { params: { id: string } }) {
  return (
    <WorkSpace>
      <WorkHeader title="View Partner">
        <Link href={`/dashboard/partners/print/${params.id}`} target="_blank">
          <Button variant="secondary">
            <PrinterCheck /> Print
          </Button>
        </Link>
      </WorkHeader>
      <ViewPartnerData id={params.id} />
    </WorkSpace>
  );
}

export default page;
