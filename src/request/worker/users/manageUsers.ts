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
