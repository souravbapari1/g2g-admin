import { client } from "@/request/actions";
import { getAccessToken } from "../auth";
import { Collection } from "@/interfaces/collection";
import { MeasurementItem } from "@/interfaces/measurement";

export const getMeasurements = async () => {
  const token = await getAccessToken();
  const req = await client
    .get("/api/collections/measurements/records/", { perPage: 500 })
    .send<Collection<MeasurementItem>>(token);
  return req;
};

export const createMeasurement = async (name: string) => {
  const token = await getAccessToken();
  const req = await client
    .post("/api/collections/measurements/records")
    .json({ name })
    .send<MeasurementItem>(token);
  return req;
};

export const updateMeasurement = async (id: string, name: string) => {
  const token = await getAccessToken();
  const req = await client
    .patch("/api/collections/measurements/records/" + id)
    .json({ name })
    .send<MeasurementItem>(token);
  return req;
};

export const deleteMeasurement = async (id: string) => {
  const token = await getAccessToken();
  const req = await client
    .delete("/api/collections/measurements/records/" + id)
    .send<MeasurementItem>(token);
  return req;
};
