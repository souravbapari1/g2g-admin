"use client";
import TextEditor from "@/components/text-editor";
import { Button } from "@/components/ui/button";
import WorkHeader from "@/components/ui/custom/WorkHeader";
import WorkSpace from "@/components/ui/custom/WorkSpace";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

function page() {
  return (
    <WorkSpace>
      <WorkHeader title="Create Blog" />
      <div className="p-8 flex flex-col gap-5">
        <div className="">
          <Label>Title</Label>
          <Input type="text" placeholder="Title" />
        </div>
        <div className="">
          <Label>Description</Label>
          <Textarea placeholder="Description" />
        </div>
        <div className="">
          <Label>Image</Label>
          <Input type="file" placeholder="Image" />
        </div>
        <div className="">
          <Label>Category</Label>
          <Input type="text" placeholder="Category" />
        </div>
        <div className="">
          <Label>Content</Label>
          <TextEditor defaultContent="" onChange={() => {}} />
        </div>
        <div className="">
          <Button>Publish Blog</Button>
        </div>
      </div>
    </WorkSpace>
  );
}

export default page;
