import { client } from "@/request/actions";
import { getAccessToken } from "../auth";
import { Collection } from "@/interfaces/collection";
import { BlogCategoryItem } from "@/interfaces/category";

export const getResearchCategorys = async () => {
  const token = await getAccessToken();
  const req = await client
    .get("/api/collections/research_category/records/", { perPage: 500 })
    .send<Collection<BlogCategoryItem>>(token);
  return req;
};

export const createResearchCategory = async (name: string) => {
  const token = await getAccessToken();
  const req = await client
    .post("/api/collections/research_category/records")
    .json({ title: name })
    .send<BlogCategoryItem>(token);
  return req;
};

export const deleteResearchCategory = async (id: string) => {
  const token = await getAccessToken();
  const req = await client
    .delete(`/api/collections/research_category/records/${id}`)
    .send<BlogCategoryItem>(token);
  return req;
};

export const updateResearchCategory = async (id: string, name: string) => {
  const token = await getAccessToken();
  const req = await client
    .patch(`/api/collections/research_category/records/${id}`)
    .json({ title: name })
    .send<BlogCategoryItem>(token);
  return req;
};
