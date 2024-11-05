import { client } from "@/request/actions";
import { getAccessToken } from "../auth";
import { Collection } from "@/interfaces/collection";
import { LiveAndPopcastItem } from "@/interfaces/liveandpodcast";

export const getLives = async ({ page }: { page?: number }) => {
  const token = await getAccessToken();
  const req = await client
    .get("/api/collections/lives/records", {
      sort: "-created",
      perPage: 20,
      page: page || 1,
    })
    .send<Collection<LiveAndPopcastItem>>(token);
  return req;
};

export const deleteLive = async (id: string) => {
  const token = await getAccessToken();
  const req = await client
    .delete("/api/collections/lives/records/" + id)
    .send<LiveAndPopcastItem>(token);
  return req;
};

export const getLive = async (id: string) => {
  const token = await getAccessToken();
  const req = await client
    .get("/api/collections/lives/records/" + id)
    .send<LiveAndPopcastItem>(token);
  return req;
};

export const createLive = async (data: {
  title: string;
  location: string;
  location_url: string;
  videoId: string;
}) => {
  const token = await getAccessToken();
  const req = await client
    .post("/api/collections/lives/records")
    .json(data)
    .send<LiveAndPopcastItem>(token);
  return req;
};
