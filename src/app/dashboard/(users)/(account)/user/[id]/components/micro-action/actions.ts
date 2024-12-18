import { client } from "@/request/actions";
import { ImpactCount, MAImpactItem, MicroActionItem } from "./md";

import { auth } from "@/auth";
import { Collection } from "@/interfaces/collection";
import { UserItem } from "@/interfaces/user";

export const getMicroActions = async (user?: UserItem) => {
  const userType = user?.user_type;
  if (userType === "partner") {
    const res = await client
      .get("/api/collections/micro_actions/records", {
        filter: `(partners~'${user?.id}')`,
      })
      .send<Collection<MicroActionItem>>();
    return res;
  }
  const res = await client
    .get("/api/collections/micro_actions/records")
    .send<Collection<MicroActionItem>>();
  return res;
};

export const createNewImpact = async (data: {
  micro_action: string;
  submit: number;
  impact: number;
  userData: string;
  user?: string;
  refer?: string;
}) => {
  let application: any = {
    micro_action: data.micro_action,
    submit: data.submit,
    impact: data.impact,
    userData: data.userData,
  };
  if (data.user) {
    application.user = data.user;
  }
  if (data.refer) {
    application.refer = data.refer;
  }

  let res = client
    .post("/api/collections/micro_impact/records")
    .json(application);

  const action = await res.send<MAImpactItem>();
  const old = localStorage.getItem("microAction");
  const removeOld = JSON.parse(old || "[]").filter(
    (item: MAImpactItem) => item.micro_action !== action.micro_action
  );
  localStorage.setItem(
    "microAction",
    JSON.stringify([...(removeOld || []), action])
  );
  return action;
};

export const isMAsubmitToday = (id: string) => {
  const old = localStorage.getItem("microAction");
  const microAction: MAImpactItem[] = JSON.parse(old || "[]");
  const isSubmit = microAction.find((item) => item.micro_action === id);

  if (isSubmit) {
    const isOld = false;
    return isOld;
  } else {
    return true;
  }
};

export const getImpactStatus = async (id: string) => {
  const res = await client.get("/maimpact/status", { id }).send<ImpactCount>();
  return res;
};
