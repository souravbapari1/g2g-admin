"use client";

import { Button } from "@/components/ui/button";
import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import Link from "next/link";
import MicroActionList from "./MicroActionList";

function page() {
  return (
    <WorkSpace>
      <WorkHeader title="Micro Actions">
        <Link href="/dashboard/micro-action/add">
          <Button size="sm" variant="outline">
            Add New
          </Button>
        </Link>
      </WorkHeader>

      <MicroActionList />
    </WorkSpace>
  );
}

export default page;
