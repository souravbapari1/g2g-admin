import { client } from "@/request/actions";
import { getAccessToken } from "../auth";
import { Collection } from "@/interfaces/collection";
import { ResearchItem } from "@/interfaces/researches";

export const getResearches = async (
  page: number = 1,
  filter?: string,
  signal?: AbortSignal
) => {
  const token = await getAccessToken();
  const req = await client
    .get("/api/collections/researches/records", {
      perPage: 9,
      page,
      sort: "-created",
      filter: filter || "",
      fields:
        "id,title,slug,category,created,updated,description,image,public,collectionId,collectionName",
    })
    .send<Collection<ResearchItem>>(token, { signal });
  return req;
};

export const deleteResearches = async (id: string) => {
  const token = await getAccessToken();
  const req = await client
    .delete("/api/collections/researches/records/" + id)
    .send<Collection<ResearchItem>>(token);
  return req;
};

export const getResearch = async (id: string) => {
  const token = await getAccessToken();
  const req = await client
    .get("/api/collections/researches/records/" + id)
    .send<ResearchItem>(token);
  return req;
};

export const updateResearch = async (
  id: string,
  data: {
    title: string;
    description: string;
    keywords: string;
    content: string;
    slug: string;
    public: boolean;
    status: string;
    image?: File | null;
    category?: string;
  }
) => {
  const token = await getAccessToken();
  const req = client.patch("/api/collections/researches/records/" + id).form({
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    content: data.content,
    slug: data.slug,
    public: data.public,
    status: data.status,
    category: data.category,
  });

  if (data.image) {
    req.append("image", data.image);
  }

  return await req.send<Collection<ResearchItem>>(token);
};

export const createResearch = async (data: {
  title: string;
  description: string;
  keywords: string;
  content: string;
  slug: string;
  public: boolean;
  status: string;
  image: File;
}) => {
  const token = await getAccessToken();
  const req = await client
    .post("/api/collections/researches/records")
    .form({
      title: data.title,
      description: data.description,
      keywords: data.keywords,
      content: data.content,
      slug: data.slug,
      public: data.public,
      status: data.status,
    })
    .append("image", data.image)
    .send<Collection<ResearchItem>>(token);
  return req;
};
