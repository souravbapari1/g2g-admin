"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { useMutation } from "react-query";
import {
  addMembership,
  NewMemberShipItemNew,
  updateMembership,
} from "@/request/worker/membership/membership";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { extractErrors } from "@/request/actions";
import { usePlanState } from "../add/planState";

function PlanSaveAction({ id }: { id: string }) {
  const router = useRouter();
  const state = usePlanState();
  const mutate = useMutation({
    mutationKey: ["updateMembership", "membership"],
    mutationFn: async ({
      data,
      id,
    }: {
      id: string;
      data: NewMemberShipItemNew;
    }) => {
      return await updateMembership(id, data);
    },
    onSuccess(data, variables, context) {
      toast.success("New Membership Update successfully");
      router.back();
    },
    onError(error: any, variables, context) {
      const errors = extractErrors(error?.response);
      toast.error("Error! " + errors[0]);
    },
  });
  const handelSubmit = () => {
    if (!state.validateState("edit")) {
      return;
    }
    console.log(state);

    let data: NewMemberShipItemNew = {
      active: state.isAvailable,
      amount: state.originalPrice,
      compare_amount: state.comparePrice,
      name: state.planName,
      status: state.originalPrice == 0 ? "free" : ("paid" as any),
      info: JSON.stringify(state.planDetails),
      qna: JSON.stringify(state.qna),
      stocks: state.stocks,
    };

    if (state.planIcon) {
      data = { ...data, image: state.planIcon };
    }

    mutate.mutate({
      data,
      id: id,
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
