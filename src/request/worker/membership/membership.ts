import { Collection } from "@/interfaces/collection";
import {
  MembershipItem,
  MemberShipPayment,
  NewMemberShipItem,
} from "@/interfaces/membership";
import { UserItem } from "@/interfaces/user";
import { AdminAuthToken, client } from "@/request/actions";

export interface NewMemberShipItemNew {
  name?: string;
  amount?: number;
  qna?: any;
  active?: boolean;
  compare_amount?: number;
  info?: any;
  image?: File | undefined;
  status?: "pending" | "confirm" | "cancel";
}

export const addMembership = async (data: NewMemberShipItemNew) => {
  const req = await client
    .post("/api/collections/memberships/records")
    .form(data)
    .send<NewMemberShipItem>(AdminAuthToken());
  return req;
};

export const getMembership = async (page: number = 1) => {
  const req = await client
    .get("/api/collections/memberships/records", { page })
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
    status?: "pending" | "confirm" | "cancel";
    qna?: any;
  };
}) => {
  return await client
    .patch("/api/collections/memberships_payments/records/" + data.id)
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
    .send<UserItem>({
      Authorization: `Bearer ${token}`,
    } as any);
  return req;
};
