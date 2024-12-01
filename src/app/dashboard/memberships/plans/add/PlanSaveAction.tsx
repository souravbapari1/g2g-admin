"use client";
import React from "react";
import { usePlanState } from "./planState";
import { Button } from "@/components/ui/button";
import { useMutation } from "react-query";
import {
  addMembership,
  NewMemberShipItemNew,
} from "@/request/worker/membership/membership";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { extractErrors } from "@/request/actions";

function PlanSaveAction() {
  const router = useRouter();
  const state = usePlanState();
  const mutate = useMutation({
    mutationKey: ["addMembership", "membership"],
    mutationFn: async (data: NewMemberShipItemNew) => {
      return await addMembership(data);
    },
    onSuccess(data, variables, context) {
      toast.success("New Membership Create successfully");
      state.resetState();
      router.back();
    },
    onError(error: any, variables, context) {
      const errors = extractErrors(error?.response);
      toast.error("Error! " + errors[0]);
    },
  });
  const handelSubmit = () => {
    if (!state.validateState("add")) {
      return;
    }
    console.log(state);

    mutate.mutate({
      active: state.isAvailable,
      amount: state.originalPrice,
      compare_amount: state.comparePrice,
      image: state.planIcon!,
      name: state.planName,
      status: (state.originalPrice == 0 ? "free" : "paid") as any,
      info: JSON.stringify(state.planDetails),
      qna: JSON.stringify(state.qna),
    });
  };
  return (
    <Button
      disabled={mutate.isLoading}
      size="sm"
      onClick={handelSubmit}
      variant="outline"
    >
      Save Plan Details
    </Button>
  );
}

export default PlanSaveAction;
