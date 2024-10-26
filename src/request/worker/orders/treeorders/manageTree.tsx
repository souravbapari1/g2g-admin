import { client } from "@/request/actions";
import { getAccessToken } from "../../auth";
import { Tree } from "@/interfaces/treeOrders";

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
