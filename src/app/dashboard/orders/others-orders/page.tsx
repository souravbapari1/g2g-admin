import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import React from "react";
import OtherOrdersList from "./OtherOrdersList";
import ExportDataView from "@/components/export";
import { Button } from "@/components/ui/button";
import { FaFileExcel } from "react-icons/fa";

function page() {
  return (
    <WorkSpace>
      <WorkHeader title="Others Orders">
        <ExportDataView base="other_projects_orders">
          <Button size="sm" variant="outline" className="mr-2">
            <FaFileExcel /> Export Files
          </Button>
        </ExportDataView>
      </WorkHeader>
      <OtherOrdersList />
    </WorkSpace>
  );
}

export default page;
