import { client } from "@/request/actions";
import { ImpactDataItem } from "./impact";
import { Collection } from "@/interfaces/collection";

export const getMcSubmits = async (page: number, filter?: string) => {
  const data = await client
    .get("/api/collections/micro_impact/records", {
      page,
      filter: filter || "",
      expand: "micro_action,user,refer",
      perPage: 20,
      sort: "-created",
    })
    .send<Collection<ImpactDataItem>>();
  return data;
};

export const getMcSubmit = async (id: string) => {
  const data = await client
    .get("/api/collections/micro_impact/records/" + id)
    .send<ImpactDataItem>();
  return data;
};

export const deleteMcSubmit = async (id: string) => {
  const data = await client
    .delete("/api/collections/micro_impact/records/" + id)
    .send<ImpactDataItem>();
  return data;
};
