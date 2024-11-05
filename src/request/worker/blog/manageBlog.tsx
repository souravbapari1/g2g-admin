import { client } from "@/request/actions";
import { getAccessToken } from "../auth";
import { BlogItem } from "@/interfaces/blog";
import { Collection } from "@/interfaces/collection";

export const createBlog = async (data: {
  title: string;
  description: string;
  keywords: string;
  content: string;
  slug: string;
  category: string;
  image: File;
  public: boolean;
}) => {
  const token = await getAccessToken();
  const req = await client
    .post("/api/collections/blogs/records")
    .form({
      title: data.title,
      description: data.description,
      keywords: data.keywords,
      content: data.content,
      slug: data.slug,
      category: data.category,
      public: data.public,
    })
    .append("image", data.image)
    .send(token);
  return req;
};

export const getBlog = async (id: string) => {
  const token = await getAccessToken();
  const req = await client
    .get("/api/collections/blogs/records/" + id)
    .send<BlogItem>(token);
  return req;
};

export const deleteBlog = async (id: string) => {
  const token = await getAccessToken();
  const req = await client
    .delete("/api/collections/blogs/records/" + id)
    .send<BlogItem>(token);
  return req;
};

export const getBlogs = async (page: number = 1) => {
  const token = await getAccessToken();
  const req = await client
    .get("/api/collections/blogs/records", {
      perPage: 20,
      page,
      hideFields: "content",
    })
    .send<Collection<BlogItem>>(token);
  return req;
};

export const updateBlog = async (
  id: string,
  data: {
    title: string;
    description: string;
    keywords: string;
    content: string;
    slug: string;
    image?: File | null;
    category: string;
    public: boolean;
  }
) => {
  const token = await getAccessToken();
  const req = client.patch("/api/collections/blogs/records/" + id).form({
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    content: data.content,
    slug: data.slug,
    category: data.category,
    public: data.public,
  });

  if (data.image) {
    req.append("image", data.image);
  }

  return await req.send(token);
};
