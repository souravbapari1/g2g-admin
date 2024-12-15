"use server";

import { auth } from "@/auth";
import { Collection } from "@/interfaces/collection";
import { OrderPayItem } from "@/interfaces/PaymentItem";

import { client } from "@/request/actions";

export type MyBalanceItem = {
  id: string;
  collectionId: string;
  collectionName: string;
  user: string;
  totalAmount: number;
  totalQuantity: number;
};
export const getUserPaymentInfo = async () => {
  const user = await auth();
  try {
    const balance = await client
      .get(`/api/collections/my_donations/records/${user?.user.id}`)
      .send<MyBalanceItem>();
    return balance;
  } catch (error) {
    return {
      totalAmount: 0,
      totalQuantity: 0,
      collectionId: "",
      collectionName: "",
      id: "",
      user: user?.user.id,
    } as MyBalanceItem;
  }
};

export const getUserPaymentHistory = async (
  userId: string,
  filter?: string
) => {
  const payments = await client
    .get(`/api/collections/payments/records`, {
      filter: `(user='${userId}' && status='paid' && orderPlaced=true ${
        filter && "&& " + filter
      })`,
      expand: "project",
      fields:
        "id,status,amount,orderPlaced,donate,quantity,created,updated,expand.project.name",
    })
    .send<Collection<OrderPayItem>>();

  return payments;
};
