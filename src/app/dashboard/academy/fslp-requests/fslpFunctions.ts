import { AdminAuthToken, client } from "@/request/actions";
import { FSLPItem } from "./fslp";
import { Collection } from "@/interfaces/collection";

export const getFslpRequests = async (page: number = 1, filter?: string) => {
  const res = await client
    .get("/api/collections/fslp/records", {
      filter: filter || "",
      page: page,
      expand: "updateBy,user",
    })
    .send<Collection<FSLPItem>>();
  return res;
};

export const getFslpById = async (id: string) => {
  const res = await client
    .get(`/api/collections/fslp/records/${id}`, {
      expand: "updateBy,user",
    })
    .send<FSLPItem>();
  return res;
};

export const updateFslpStatus = async (
  id: string,
  status: "pending" | "approved" | "complete" | "cancel",
  updateBy: string,
  review_note: string | null
) => {
  const res = await client
    .patch(`/api/collections/fslp/records/${id}`, {
      expand: "updateBy",
    })
    .json({
      status: status,
      updateBy: updateBy,
      review_note,
    })
    .send<FSLPItem>(AdminAuthToken());
  return res;
};
