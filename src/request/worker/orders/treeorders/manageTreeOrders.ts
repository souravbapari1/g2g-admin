import { client } from "@/request/actions";
import { getAccessToken } from "../../auth";
import { Collection } from "@/interfaces/collection";
import { TreeOrderItem } from "@/interfaces/treeOrders";
import { UserItem } from "@/interfaces/user";

export const getTreeOrders = async (
  page: number = 1,
  { filter }: { filter?: string }
) => {
  const token = await getAccessToken();
  const req = await client
    .get("/api/collections/tree_planting_orders/records", {
      expand: "user,user.company,asigned_to,type,support,updatedBy",
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
  {
    asigned_to,
    status,
    updatedBy,
  }: { asigned_to: string; status?: string; updatedBy?: string }
) => {
  const token = await getAccessToken();
  const req = await client
    .patch("/api/collections/tree_planting_orders/records/" + id, {
      expand: "user,user.company,asigned_to,project,type,updatedBy,support",
    })
    .json({
      asigned_to,
      status,
      updatedBy,
    })
    .send<TreeOrderItem>(token);
  return req;
};

export const setMappingTreeStatus = async (
  id: string,
  { maping_status, updatedBy }: { maping_status: string; updatedBy?: string }
) => {
  const token = await getAccessToken();
  const req = await client
    .patch("/api/collections/tree_planting_orders/records/" + id, {
      expand: "user,user.company,asigned_to,project,type,updatedBy",
    })
    .json({
      maping_status,
      updatedBy,
    })
    .send<TreeOrderItem>(token);
  return req;
};

export const getEmployeFilter = (adminFilter: string = "") => {
  const userType = localStorage.getItem("role");
  if (userType === "ADMIN") {
    return adminFilter;
  }
  const user: UserItem = JSON.parse(localStorage.getItem("user") || "{}");
  return `(asigned_to='${user.id}')`;
};

const getTreeOrdersList = async (page: number = 1) => {
  const token = await getAccessToken();
  const req = await client
    .get("/api/collections/tree_planting_orders/records", {
      expand: "user,user.company,asigned_to,trees,trees.type,trees.unit",
      sort: "-created",
      perPage: 1,
      page: page,
      filter: getEmployeFilter(),
    })
    .send<Collection<TreeOrderItem>>(token);
  return req;
};

export const loadAllTreeOrders = async (
  page: number = 1,
  tmData: TreeOrderItem[] = [],
  onProgress?: (progress: number) => void
): Promise<TreeOrderItem[]> => {
  const data = await getTreeOrdersList(page);
  const updatedTmData = tmData.concat(data.items);

  // Update progress after each page is loaded
  if (onProgress && data.totalPages > 1) {
    const progressPercentage = Math.floor((page / data.totalPages) * 100);
    onProgress(progressPercentage);
  }

  if (page < data.totalPages) {
    return await loadAllTreeOrders(page + 1, updatedTmData, onProgress);
  }

  return updatedTmData;
};
