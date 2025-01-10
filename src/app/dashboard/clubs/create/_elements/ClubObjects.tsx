import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

function ClubObjects() {
  return (
    <div className="bg-gray-100 p-8 mt-8">
      <p className="font-bold text-xl mb-5">Club Objects</p>
      <div className="flex flex-col gap-5">
        <Textarea />
        <div className="">
          <Button variant="outline">Add More</Button>
        </div>
      </div>
    </div>
  );
}

export default ClubObjects;
