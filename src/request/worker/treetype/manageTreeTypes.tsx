import { client } from "@/request/actions";
import { Collection } from "@/interfaces/collection";
import { getAccessToken } from "../auth";
import { TreeTypesItem } from "@/interfaces/treetypes";

export const getTreeTypes = async (page: number = 1) => {
  const token = await getAccessToken();
  const req = await client
    .get("/api/collections/tree_types/records", {
      sort: "-created",
      perPage: 20,
      page: page,
    })
    .send<Collection<TreeTypesItem>>(token);
  return req;
};

export const createNewTreeType = async (data: {
  name: string;
  price: number;
  hectare_restored: number;
  co2_removal: number;
  co2_storage: number;
  air_quality: number;
  rain_observed: number;
  energy_saved: number;
  state: boolean;
}) => {
  const token = await getAccessToken();
  const req = await client
    .post("/api/collections/tree_types/records")
    .json(data)
    .send<TreeTypesItem>(token);
  return req;
};

export const updateTreeType = async (
  id: string,
  data: {
    name?: string;
    price?: number;
    hectare_restored?: number;
    co2_removal?: number;
    co2_storage?: number;
    air_quality?: number;
    rain_observed?: number;
    energy_saved?: number;
    state?: boolean;
  }
) => {
  const token = await getAccessToken();
  const req = await client
    .patch("/api/collections/tree_types/records/" + id)
    .json(data)
    .send<TreeTypesItem>(token);
  return req;
};

export const deleteTreeType = async (id: string) => {
  const token = await getAccessToken();
  const req = await client
    .delete("/api/collections/tree_types/records/" + id)
    .send<TreeTypesItem>(token);
  return req;
};
