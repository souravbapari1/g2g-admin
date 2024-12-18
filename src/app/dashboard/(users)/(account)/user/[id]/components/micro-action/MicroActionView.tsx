"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Session } from "next-auth";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TbCopyCheckFilled, TbScreenShare } from "react-icons/tb";
import { createNewImpact, getImpactStatus, isMAsubmitToday } from "./actions";
import { useMicroActionState } from "./microActioonState";
import ThanksView from "./ThanksView";

import { useMutation } from "react-query";

function MicroActionView() {
  const data = useMicroActionState();
  const [thankyou, setThankYou] = useState(false);
  const [open, setOpen] = useState(false);

  const params = useSearchParams();

  const statusData = useMutation({
    mutationKey: ["status", data.selected?.id],
    mutationFn: () => getImpactStatus(data.selected?.id || ""),
  });

  useEffect(() => {
    if (data.selected?.id) {
      statusData.mutate();
    }
  }, [data.selected?.id]);

  if (data.selected == null) {
    return null;
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <ThanksView open={thankyou} setOpen={setThankYou} />
      <div className="">
        <h1 className="text-3xl font-bold">Impact</h1>
        <div className="grid md:grid-cols-2 gap-6 mt-5">
          <div className="w-full h-36 border rounded-2xl bg-primary/5 flex flex-col text-center justify-center items-center border-white shadow p-5">
            <p className=" font-medium text-gray-600 mb-3">Impacters from</p>
            <h4 className="text-2xl font-bold text-primary">
              {statusData.data?.totalCity} locations
            </h4>
          </div>
          <div className="w-full h-36 border rounded-2xl bg-primary/5  text-center flex flex-col justify-center items-center border-white shadow p-5">
            <p className=" font-medium text-gray-600 mb-1">
              Impact (ongoing micro-action)
            </p>
            <h4 className="text-xl font-bold text-primary">
              {statusData.data?.current.impact} Kgs CO2e
              <small className="text-xs"> (saved/year)</small>
            </h4>
          </div>
          <div className="w-full h-36 border rounded-2xl text-center bg-primary/5 flex flex-col justify-center items-center border-white shadow p-5">
            <p className="text-lg font-medium text-gray-600 mb-3">
              Sustainabilty Warriors
            </p>
            <h4 className="text-2xl font-bold text-primary">
              {statusData.data?.users.users}
            </h4>
          </div>
          <div className="w-full h-36 border rounded-2xl bg-primary/5 text-center flex flex-col justify-center items-center border-white shadow p-5">
            <p className="text-lg font-medium text-gray-600 mb-3">
              Total impact of ReThink
            </p>
            <h4 className="text-xl font-bold text-primary">
              {statusData.data?.total.impact} Kgs CO2e
              <small className="text-xs"> (saved/year)</small>
            </h4>
          </div>
        </div>
      </div>
      <div className="">
        <h1 className="font-bold text-2xl text-center">
          {data.selected.title}
        </h1>

        <div className="md:p-7 md:mt-0 mt-3">
          <div className="bg-yellow-400/30 rounded-2xl  p-8">
            <div className="flex gap-5">
              <div className="w-40">
                <TbScreenShare size={40} className="text-orange-700" />
              </div>
              <div
                className="text-sm text-left"
                dangerouslySetInnerHTML={{
                  __html: data.selected?.description || "",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MicroActionView;
