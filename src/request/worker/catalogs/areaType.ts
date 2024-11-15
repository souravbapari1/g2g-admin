import { client } from "@/request/actions";
import { getAccessToken } from "../auth";
import { Collection } from "@/interfaces/collection";
import { AreaTypeDataItem, MeasurementItem } from "@/interfaces/measurement";

export const getAreaTypes = async () => {
  const token = await getAccessToken();
  const req = await client
    .get("/api/collections/area_type/records/", { perPage: 500 })
    .send<Collection<AreaTypeDataItem>>(token);
  return req;
};

export const createAreaType = async (name: string, color: string) => {
  const token = await getAccessToken();
  const req = await client
    .post("/api/collections/area_type/records")
    .json({ name, color })
    .send<MeasurementItem>(token);
  return req;
};

export const updateAreaType = async (id: string, name: string) => {
  const token = await getAccessToken();
  const req = await client
    .patch("/api/collections/area_type/records/" + id)
    .json({ name })
    .send<MeasurementItem>(token);
  return req;
};

export const deleteAreaType = async (id: string) => {
  const token = await getAccessToken();
  const req = await client
    .delete("/api/collections/area_type/records/" + id)
    .send<MeasurementItem>(token);
  return req;
};
