import { client } from "@/request/actions";
import { getAccessToken } from "../auth";
import { Collection } from "@/interfaces/collection";
import { BlogCategoryItem } from "@/interfaces/category";

export const getAccredationStandars = async (page: number = 1) => {
  const token = await getAccessToken();
  const req = await client
    .get("/api/collections/accredation_standars/records", {
      sort: "-created",
      perPage: 500,
      page: page,
    })
    .send<Collection<BlogCategoryItem>>(token);
  return req;
};

export const createAccredationStandars = async (name: string) => {
  const token = await getAccessToken();
  const req = await client
    .post("/api/collections/accredation_standars/records")
    .json({ title: name })
    .send<BlogCategoryItem>(token);
  return req;
};

export const deleteAccredationStandars = async (id: string) => {
  const token = await getAccessToken();
  const req = await client
    .delete(`/api/collections/accredation_standars/records/${id}`)
    .send<BlogCategoryItem>(token);
  return req;
};

export const updateAccredationStandars = async (id: string, name: string) => {
  const token = await getAccessToken();
  const req = await client
    .patch(`/api/collections/accredation_standars/records/${id}`)
    .json({ title: name })
    .send<BlogCategoryItem>(token);
  return req;
};
