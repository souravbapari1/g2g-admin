import { Collection } from "@/interfaces/collection";
import { NewUser } from "@/interfaces/NewUser";
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

export const updateUser = async (id: string, data: any, image?: File) => {
  const req = client
    .patch("/api/collections/users/records/" + id, {
      expand: "company",
    })
    .form(data);

  if (image) {
    req.append("avatar", image);
  }

  const resData = await req.send<UserItem>();
  return resData;
};

export const deleteUser = async (id: string) => {
  const req = await client
    .delete("/api/collections/users/records/" + id)
    .send<UserItem>();
  return req;
};

//create User
export const createUser = async (data: NewUser, image: File) => {
  const req = await client
    .post("/api/collections/users/records")
    .form(data)
    .append("avatar", image)
    .send<UserItem>();
  return req;
};

export const addTransition = async (data: {
  reason: string;
  amount: number;
  user: string;
  actionBy: string;
  type: "CREDIT" | "DEBIT" | "DONATE";
}) => {
  const req = await client
    .post("/api/collections/transactions/records")
    .json(data)
    .send();
  return req;
};

export const getTransitions = async (page: number = 1, user: string) => {
  const req = await client
    .get("/api/collections/transactions/records", {
      sort: "-created",
      perPage: 50,
      filter: `(user='${user}')`,
      expand: "actionBy",
      page: page,
    })
    .send<
      Collection<{
        id: string;
        collectionId: string;
        collectionName: string;
        created: string;
        updated: string;
        reason: string;
        amount: 123;
        user: string;
        actionBy: string;
        type: "CREDIT" | "DEBIT" | "DONATE";
        expand: {
          actionBy?: UserItem;
        };
      }>
    >();
  return req;
};

export const getTransaction = async (id: string) => {
  const req = await client
    .get("/api/collections/transactions/records/" + id)
    .send<UserItem>();
  return req;
};

export const setLastLogin = async (id: string) => {
  const req = await client
    .patch("/api/collections/users/records/" + id)
    .json({ lastLogin: new Date() })
    .send<UserItem>();
  return req;
};
