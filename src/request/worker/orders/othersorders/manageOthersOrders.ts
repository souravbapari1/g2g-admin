import { Collection } from "@/interfaces/collection";
import { OthersOrdersItem } from "@/interfaces/othersProjects";
import { client } from "@/request/actions";
import { getAccessToken } from "../../auth";

export const getOthersOrdersList = async (page: number = 1) => {
  const req = await client
    .get("/api/collections/other_projects_orders/records", {
      expand: "user,updatedBy,support,asigned_to",
      sort: "-created",
      perPage: 20,
      page: page,
    })
    .send<Collection<OthersOrdersItem>>();
  return req;
};

export const assignOthersProjectOrder = async (
  id: string,
  {
    asigned_to,
    status,
    updatedBy,
  }: { asigned_to: string; status?: string; updatedBy?: string }
) => {
  const token = await getAccessToken();
  const req = await client
    .patch("/api/collections/other_projects_orders/records/" + id, {
      expand: "user,updatedBy,support,asigned_to",
    })
    .json({
      asigned_to,
      status,
      updatedBy,
    })
    .send<OthersOrdersItem>(token);
  return req;
};
