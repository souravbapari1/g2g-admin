"use client";
import FileUploaderTest, {
  FileSvgDraw,
} from "@/components/extensions/SelectFile";
import { TagsInput } from "@/components/extensions/TagsInput";
import { Button } from "@/components/ui/button";
import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

function page() {
  return (
    <WorkSpace>
      <WorkHeader title="New Club Challenge" />
      <div className="p-10 flex flex-col gap-5 w-full">
        <div className="flex md:flex-row flex-col w-full  gap-5">
          <div className="w-full">
            <Label>Name Of Catagory</Label>
            <Input />
          </div>
          <div className="w-full">
            <Label>Main Color + Sub Color</Label>
            <div className="flex flex-row gap-2">
              <Input type="color" className="p-0" />
              <Input type="color" className="p-0" />
            </div>
          </div>
        </div>
        <div className="">
          <Label>Upload Background</Label>
          <div className="border rounded-md">
            <FileUploaderTest />
          </div>
        </div>

        <div className="">
          <Label>Add and Type Challenge</Label>
          <TagsInput value={["Hello I Am Sourav"]} onValueChange={() => {}} />
        </div>
        <div className="">
          <Button>Submit New Club Challenge</Button>
        </div>
      </div>
    </WorkSpace>
  );
}

export default page;
