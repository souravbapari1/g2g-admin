import { client } from "@/request/actions";
import { getAccessToken } from "../auth";
import { Collection } from "@/interfaces/collection";

import { BlogCategoryItem } from "@/interfaces/category";

export const getBlogCategorys = async () => {
  const token = await getAccessToken();
  const req = await client
    .get("/api/collections/blog_category/records/", { perPage: 500 })
    .send<Collection<BlogCategoryItem>>(token);
  return req;
};

export const createBlogCategory = async (name: string) => {
  const token = await getAccessToken();
  const req = await client
    .post("/api/collections/blog_category/records")
    .json({ title: name })
    .send<BlogCategoryItem>(token);
  return req;
};

export const updateBlogCategory = async (id: string, name: string) => {
  const token = await getAccessToken();
  const req = await client
    .patch("/api/collections/blog_category/records/" + id)
    .json({ title: name })
    .send<BlogCategoryItem>(token);
  return req;
};

export const deleteBlogCategory = async (id: string) => {
  const token = await getAccessToken();
  const req = await client
    .delete("/api/collections/blog_category/records/" + id)
    .send<BlogCategoryItem>(token);
  return req;
};
