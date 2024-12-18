import { auth } from "@/auth";
import { client } from "@/request/actions";
import { FSLPItem } from "./fslp";
import { Collection } from "@/interfaces/collection";

export const getMyPrograms = async (id: string) => {
  const res = await client
    .get("/api/collections/fslp/records", {
      filter: `(user~'${id}')`,
      perPage: 500,
    })
    .send<Collection<FSLPItem>>();
  return res;
};
