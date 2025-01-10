import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

function ClubSocialLinks() {
  return (
    <div className="grid grid-cols-4 gap-5 bg-gray-100 p-8 mt-5">
      <div className="">
        <Label>Website</Label>
        <Input />
      </div>
      <div className="">
        <Label>Email ID</Label>
        <Input />
      </div>
      <div className="">
        <Label>Phone No</Label>
        <Input />
      </div>
      <div className="">
        <Label>Linkedin</Label>
        <Input />
      </div>
      <div className="">
        <Label>X (Twitter)</Label>
        <Input />
      </div>
      <div className="">
        <Label>Telegram</Label>
        <Input />
      </div>
      <div className="">
        <Label>Address</Label>
        <Input />
      </div>
      <div className="">
        <Label>Profile(PDF)</Label>
        <Input />
      </div>
    </div>
  );
}

export default ClubSocialLinks;
