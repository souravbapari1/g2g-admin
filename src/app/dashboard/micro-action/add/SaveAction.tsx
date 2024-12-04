"use client";

import { Button } from "@/components/ui/button";
import { useMaState } from "./maState";
import toast from "react-hot-toast";

import { AdminAuthToken, client } from "@/request/actions";
import { useRouter } from "next/navigation";

function SaveAction() {
  const state = useMaState();
  const router = useRouter();
  const handelSave = () => {
    toast.dismiss();
    const errors = state.validateState();
    if (errors.length != 0) {
      toast.error(errors[0].message);
      return false;
    } else {
      saveMC();
    }
  };

  const saveMC = async () => {
    try {
      toast.loading("Creating Micro Action...");
      const res = await client
        .post("/api/collections/micro_actions/records")
        .json<{
          title: string;
          description: string;
          kgPerUnit: number;
          partners: string[];
          sponsors: string;
          public: boolean;
        }>({
          description: state.data.description,
          kgPerUnit: state.data.kgPerUnit,
          title: state.data.title,
          partners: state.data.partner,
          public: state.data.public,
        })
        .send(AdminAuthToken());
      toast.dismiss();
      state.resetData();
      router.back();
      toast.success("Micro Action created successfully");
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Failed to create micro action");
    }
  };

  return (
    <div>
      <Button onClick={handelSave} size="sm">
        Save Action
      </Button>
    </div>
  );
}

export default SaveAction;
