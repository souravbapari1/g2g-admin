import { Collection } from "@/interfaces/collection";
import { UserItem } from "@/interfaces/user";
import { client } from "@/request/actions";

export const getUsers = async (
  page: number = 1,
  filter?: string,
  data?: { signal?: AbortSignal }
) => {
  const req = await client
    .get("/api/collections/users/records", {
      sort: "-created",
      perPage: 20,
      page: page,
      filter: filter || "",
    })
    .send<Collection<UserItem>>(undefined, { signal: data?.signal });
  return req;
};

export const getUser = async (id: string) => {
  const req = await client
    .get("/api/collections/users/records/" + id, { expand: "company" })
    .send<UserItem>();
  return req;
};

export const updateUser = async (id: string, data: any) => {
  const req = await client
    .patch("/api/collections/users/records/" + id)
    .json(data)
    .send<UserItem>();
  return req;
};
