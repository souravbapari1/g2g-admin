import { client } from "@/request/actions";
import { getAccessToken } from "../../auth";
import { Tree } from "@/interfaces/treeOrders";
import { Collection } from "@/interfaces/collection";

export const updateTree = async (id: string, data: any) => {
  const token = await getAccessToken();
  const req = await client
    .patch("/api/collections/trees/records/" + id, {
      expand: "unit",
    })
    .json(data)
    .send<Tree>(token);
  return req;
};

export const getTree = async (id: string) => {
  const token = await getAccessToken();
  const req = await client
    .get("/api/collections/trees/records/" + id, {
      expand: "project,user,order,unit",
    })
    .send<Tree>(token);
  return req;
};

export const getTrees = async (page: number = 1, filter?: string) => {
  console.log(filter);

  const token = await getAccessToken();
  const req = await client
    .get("/api/collections/trees/records/", {
      expand: "project,user,order,update_by,unit",
      perPage: 30,
      page: page,
      sort: "-created",
      filter: filter || "",
    })
    .send<Collection<Tree>>(token);
  return req;
};
