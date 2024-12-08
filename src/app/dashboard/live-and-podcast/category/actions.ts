import { Collection } from "@/interfaces/collection";
import { client } from "@/request/actions";
import { getAccessToken } from "@/request/worker/auth";
export interface PodCastCategory {
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  name: string;
}

export const addPodcastCategory = async (data: { name: string }) => {
  const token = await getAccessToken();
  const req = await client
    .post("/api/collections/podcast_catagory/records")
    .json(data)
    .send<PodCastCategory>(token);
  return req;
};

export const getPodcastCategory = async () => {
  const token = await getAccessToken();
  const req = await client
    .get("/api/collections/podcast_catagory/records", { perPage: 500 })
    .send<Collection<PodCastCategory>>(token);
  return req;
};

export const deletePodcastCategory = async (id: string) => {
  const token = await getAccessToken();
  const req = await client
    .delete(`/api/collections/podcast_catagory/records/${id}`)
    .send(token);
  return req;
};

export const updatePodcastCategory = async (
  id: string,
  data: { name: string }
) => {
  const token = await getAccessToken();
  const req = await client
    .patch(`/api/collections/podcast_catagory/records/${id}`)
    .json(data)
    .send(token);
  return req;
};
