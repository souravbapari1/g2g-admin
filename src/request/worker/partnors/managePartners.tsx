import { loadPaginatedData } from "@/components/context/dataLoaders";
import { Collection } from "@/interfaces/collection";
import { Company, UserItem } from "@/interfaces/user";
import { AdminAuthToken, client } from "@/request/actions";

export const getPartners = async (page: number = 1) => {
  const req = await client
    .get("/api/collections/users/records", {
      sort: "-created",
      perPage: 20,
      page: page,
      expand: "company",
      filter: "(user_type='partner')",
    })
    .send<Collection<UserItem>>();
  return req;
};

export const setStatusPartner = async (
  id: string,
  status: "approved" | "rejected"
) => {
  const req = await client
    .patch("/api/collections/companies/records/" + id)
    .json({ approved_status: status })
    .send<Collection<Company>>(AdminAuthToken());
  return req;
};

export const getAllPartners = async () => {
  const res = await loadPaginatedData(getPartners);
  return res;
};
