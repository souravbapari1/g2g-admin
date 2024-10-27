import { client } from "@/request/actions";
import { getAccessToken } from "../../auth";
import { Tree } from "@/interfaces/treeOrders";
import { Collection } from "@/interfaces/collection";

export const updateTree = async (id: string, data: any) => {
  const token = await getAccessToken();
  const req = await client
    .patch("/api/collections/trees/records/" + id, {
      expand: "type",
    })
    .json(data)
    .send<Tree>(token);
  return req;
};

export const getTree = async (id: string) => {
  const token = await getAccessToken();
  const req = await client
    .get("/api/collections/trees/records/" + id, {
      expand: "project,user,order,type",
    })
    .send<Tree>(token);
  return req;
};

export const getTrees = async (page: number = 1) => {
  const token = await getAccessToken();
  const req = await client
    .get("/api/collections/trees/records/", {
      expand: "project,user,order,type,update_by",
      perPage: 20,
      page: page,
      sort: "-created",
    })
    .send<Collection<Tree>>(token);
  return req;
};
