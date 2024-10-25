import { client } from "@/request/actions";
import { getAccessToken } from "../../auth";
import { Collection } from "@/interfaces/collection";
import { TreeOrderItem } from "@/interfaces/treeOrders";

export const getTreeOrders = async (
  page: number = 1,
  { filter }: { filter?: string }
) => {
  const token = await getAccessToken();
  const req = await client
    .get("/api/collections/tree_planting_orders/records", {
      expand: "user,user.company,asigned_to,project",
      sort: "-created",
      perPage: 20,
      page: page,
      filter: filter || "",
    })
    .send<Collection<TreeOrderItem>>(token);
  return req;
};

export const assignTreeOrder = async (
  id: string,
  { asigned_to }: { asigned_to: string }
) => {
  const token = await getAccessToken();
  const req = await client
    .patch("/api/collections/tree_planting_orders/records/" + id, {
      expand: "user,user.company,asigned_to,project",
    })
    .json({
      asigned_to,
    })
    .send<TreeOrderItem>(token);
  return req;
};

const getTreeOrdersList = async (page: number = 1) => {
  const token = await getAccessToken();
  const req = await client
    .get("/api/collections/tree_planting_orders/records", {
      expand: "user,user.company,asigned_to,trees",
      sort: "-created",
      perPage: 100,
      page: page,
    })
    .send<Collection<TreeOrderItem>>(token);
  return req;
};

export const loadAllTreeOrders = async (
  page: number = 1,
  tmData: TreeOrderItem[] = []
): Promise<TreeOrderItem[]> => {
  const data = await getTreeOrdersList(page);
  const updatedTmData = tmData.concat(data.items);
  if (page < data.totalPages) {
    return await loadAllTreeOrders(page + 1, updatedTmData);
  }
  return updatedTmData;
};
