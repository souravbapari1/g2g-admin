"use client";
import { useGlobalDataSetContext } from "@/components/context/globalDataSetContext";
import TextEditor from "@/components/text-editor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import { Switch } from "@/components/ui/switch";
import React from "react";
import { SponsorsData } from "./sponsers";
import { useMaState } from "./maState";

function NewMCForm() {
  const { usersListGlobal } = useGlobalDataSetContext();
  const state = useMaState();
  const partner = usersListGlobal.filter((u) => u.user_type == "partner");

  return (
    <div className="p-10 flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-5">
        <div className="">
          <Label>Title</Label>
          <Input
            value={state.data.title}
            onChange={(e) => {
              state.setData("title", e.target.value);
            }}
          />
        </div>
        <div className="">
          <Label>Kg Per Unit</Label>
          <Input
            value={state.data.kgPerUnit || ""}
            onChange={(e) => {
              state.setData("kgPerUnit", e.target.value);
            }}
            type="number"
          />
        </div>
      </div>
      <div className="">
        <Label>Description</Label>
        <TextEditor
          defaultContent={state.data.description}
          onChange={(e) => {
            state.setData("description", e);
          }}
        />
      </div>
      <div className="grid grid-cols-1 gap-5">
        <div className="">
          <Label>Assign Partner</Label>
          <MultiSelect
            className="mt-1 bg-white "
            options={partner.map((u) => ({
              value: u.id,
              label: u.first_name + " " + u.last_name,
            }))}
            maxCount={10}
            value={state.data.partner}
            defaultValue={state.data.partner}
            onValueChange={(e) => {
              state.setData("partner", e);
            }}
          />
        </div>
      </div>
      <div className="">
        <p className="mb-2">Public</p>
        <Switch
          checked={state.data.public}
          onClick={() => state.setData("public", !state.data.public)}
        />
      </div>
    </div>
  );
}

export default NewMCForm;
