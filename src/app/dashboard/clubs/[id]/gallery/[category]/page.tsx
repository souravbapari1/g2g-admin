import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import Image from "next/image";
import React from "react";
import ClubGallery from "../../_gallery/ClubGallery";
import { Button } from "@/components/ui/button";

function page() {
  return (
    <WorkSpace>
      <WorkHeader title="Manage Club [name] Gallery [category]">
        <Button variant="outline" size="sm">
          Add New Gallery
        </Button>
      </WorkHeader>
      <div className="px-10">
        <ClubGallery />
      </div>
    </WorkSpace>
  );
}

export default page;
