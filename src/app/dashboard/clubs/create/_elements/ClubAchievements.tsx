import FileUploaderTest from "@/components/extensions/SelectFile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Plus } from "lucide-react";
import React from "react";

function ClubAchievements() {
  return (
    <div className="bg-gray-100 p-8 mt-8">
      <p className="font-bold text-xl mb-5">Club Achievements</p>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <div className="">
            <Label>Title</Label>
            <Input className="bg-white" />
          </div>
          <div className="">
            <Label>Description</Label>
            <Textarea />
          </div>
          <div className="">
            <Label>Image</Label>
            <div className="border overflow-hidden rounded-md">
              <FileUploaderTest />
            </div>
          </div>
        </div>

        <div className="">
          <Button variant="outline">
            <Plus size={10} />
            Add More
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ClubAchievements;
