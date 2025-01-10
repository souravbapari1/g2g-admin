"use client";
import TextEditor from "@/components/text-editor";
import { Label } from "@/components/ui/label";
import React from "react";

function AboutClub() {
  return (
    <div className="bg-gray-100 p-8 mt-8">
      <Label>About Club</Label>
      <TextEditor defaultContent="" onChange={() => {}} />
    </div>
  );
}

export default AboutClub;
