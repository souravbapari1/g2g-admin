import { Collection } from "@/interfaces/collection";
import {
  MembershipItem,
  MemberShipPayment,
  NewMemberShipItem,
} from "@/interfaces/membership";
import { UserItem } from "@/interfaces/user";
import { AdminAuthToken, client } from "@/request/actions";
import { m } from "framer-motion";
import toast from "react-hot-toast";

export interface NewMemberShipItemNew {
  name?: string;
  amount?: number;
  qna?: any;
  active?: boolean;
  compare_amount?: number;
  info?: any;
  image?: File | undefined;
  stocks?: number;
  status?: "new" | "processing" | "delivred" | "cancelled";
  review_note?: string;
  popular?: boolean;
}

export const addMembership = async (data: NewMemberShipItemNew) => {
  const req = await client
    .post("/api/collections/memberships/records")
    .form(data)
    .send<NewMemberShipItem>(AdminAuthToken());
  return req;
};

export const getMembership = async (page: number = 1, filter?: string) => {
  const req = await client
    .get("/api/collections/memberships/records", {
      page,
      expand: "user,membership",
      filter: filter || "",
    })
    .send<Collection<MembershipItem>>();
  return req;
};

export const deleteMembership = async (id: string) => {
  const req = await client
    .delete("/api/collections/memberships/records/" + id)
    .send<Collection<MembershipItem>>(AdminAuthToken());
  return req;
};

export const updateMembership = async (
  id: string,
  data: NewMemberShipItemNew
) => {
  const req = await client
    .patch("/api/collections/memberships/records/" + id)
    .form(data)
    .send<Collection<MembershipItem>>(AdminAuthToken());
  return req;
};

export const decStocksMembership = async (id: string) => {
  try {
    const membership = await getMembershipById(id);

    const req = await client
      .patch("/api/collections/memberships/records/" + id)
      .form<MembershipItem>({
        stocks: membership.stocks - 1,
      })
      .send<Collection<MembershipItem>>(AdminAuthToken());
    return req;
  } catch (error) {
    toast.dismiss();
    toast.error("Warning! MemberShip is Out Of Stock Now");
    return null;
  }
};

export const getMembershipById = async (id: string) => {
  const req = await client
    .get("/api/collections/memberships/records/" + id)
    .send<MembershipItem>();
  return req;
};

export const addNewMembershipPayment = async (data: {
  membership: string;
  user: string;
  payurl?: string;
  amount: number;
  gateway_response?: any;
  completeOrder: boolean;
  qna?: any;
  status?: "pending" | "confirm" | "cancel";
}) => {
  return await client
    .post("/api/collections/memberships_payments/records")
    .json(data)
    .send<MemberShipPayment>();
};

export const updateMembershipPayment = async (data: {
  id: string;

  data: {
    membership?: string;
    user?: string;
    payurl?: string;
    amount?: number;
    gateway_response?: any;
    completeOrder?: boolean;
    sessionId?: string;
    status?: "new" | "processing" | "delivred" | "cancelled";
    qna?: any;
    stocks?: number;
    assgine?: string;
  };
}) => {
  return await client
    .patch("/api/collections/memberships_payments/records/" + data.id, {
      expand: "user,membership,assgine",
    })
    .json(data.data)
    .send<MemberShipPayment>();
};

export const setUserMembership = async (
  id: string,
  membership: string,
  token?: string
) => {
  const req = await client
    .patch("/api/collections/users/records/" + id)
    .json({
      "mamberships+": membership,
    })
    .send<UserItem>();
  return req;
};
