import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function ProjectSheet({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState("");
  const [projectType, setProjectType] = useState("");
  const [unitType, setUnitType] = useState("");
  const [assignedBy, setAssignedBy] = useState("");
  const [operatedBy, setOperatedBy] = useState("");
  const [Country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");

  const [showFilter, setShowFilter] = useState(false);

  const filterData = () => {
    let filters: string[] = [];
    if (search) filters.push(`name~'${search}' || id='${search}'`);
    if (projectType) filters.push(`type~'${projectType}'`);
    if (unitType) filters.push(`unit_types~'${unitType}'`);
    if (assignedBy) filters.push(`assigned_by~'${assignedBy}'`);
    if (operatedBy) filters.push(`operated_by~'${operatedBy}'`);
    if (Country) filters.push(`country~'${Country}'`);
    if (city) filters.push(`city~'${city}'`);

    if (status) {
      if (status == "tree") {
        filters.push(`project_prefix='${status}'`);
      } else if (status == "others" || status == "plastic") {
        filters.push(`project_prefix='${status}'`);
      } else {
        filters.push(`status~'${status}'`);
      }
    }

    return filters.length > 0 ? `(${filters.join(" && ")})` : "";
  };

  return (
    <Sheet open={showFilter} onOpenChange={setShowFilter}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default ProjectSheet;
