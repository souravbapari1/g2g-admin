import { Button } from "@/components/ui/button";
import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import Link from "next/link";
import React from "react";
import ClubCard from "./_components/ClubCard";

function page() {
  return (
    <WorkSpace>
      <WorkHeader title="Club Management">
        <Link href="/dashboard/clubs/create">
          <Button className="btn btn-primary" size="sm" variant="outline">
            Create Club
          </Button>
        </Link>
      </WorkHeader>
      <div className="grid grid-cols-4 gap-8 p-10">
        <ClubCard />
        <ClubCard />
        <ClubCard />
        <ClubCard />
        <ClubCard />
      </div>
    </WorkSpace>
  );
}

export default page;
