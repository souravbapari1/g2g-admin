import { client } from "@/request/actions";
import { getAccessToken } from "../auth";
import { Collection } from "@/interfaces/collection";
import { LiveAndPopcastItem } from "@/interfaces/liveandpodcast";

export const getPodcasts = async ({ page }: { page?: number }) => {
  const token = await getAccessToken();
  const req = await client
    .get("/api/collections/podcasts/records", {
      sort: "-created",
      perPage: 20,
      page: page || 1,
    })
    .send<Collection<LiveAndPopcastItem>>(token);
  return req;
};

export const updatePodcast = async (id: string, data: any) => {
  const token = await getAccessToken();
  const req = await client
    .patch("/api/collections/podcasts/records/" + id)
    .json(data)
    .send<LiveAndPopcastItem>(token);
  return req;
};

export const deletePodcast = async (id: string) => {
  const token = await getAccessToken();
  const req = await client
    .delete("/api/collections/podcasts/records/" + id)
    .send<LiveAndPopcastItem>(token);
  return req;
};

export const getPodcast = async (id: string) => {
  const token = await getAccessToken();
  const req = await client
    .get("/api/collections/podcasts/records/" + id)
    .send<LiveAndPopcastItem>(token);
  return req;
};

export const createPodcast = async (data: {
  title: string;
  location: string;
  location_url: string;
  videoId: string;
  category: string;
}) => {
  const token = await getAccessToken();
  const req = await client
    .post("/api/collections/podcasts/records")
    .json(data)
    .send<LiveAndPopcastItem>(token);
  return req;
};
