import { loadPaginatedData } from "@/components/context/dataLoaders";
import { getTodayDate } from "@/helper/dateTime";
import { Collection } from "@/interfaces/collection";
import { Company, UserItem } from "@/interfaces/user";
import { AdminAuthToken, client, getUserLocalData } from "@/request/actions";

export const getPartners = async (page: number = 1) => {
  const req = await client
    .get("/api/collections/users/records", {
      sort: "-created",
      perPage: 20,
      page: page,
      expand: "company,company.updateBy",
      filter: "(user_type='partner')",
    })
    .send<Collection<UserItem>>();
  return req;
};

export const setStatusPartner = async (
  id: string,
  status: "approved" | "rejected",
  rejectReason?: string,
  approvedBy?: string
) => {
  const user = getUserLocalData();
  const req = await client
    .patch("/api/collections/companies/records/" + id)
    .json({
      approved_status: status,
      updateBy: user?.id,
      rejectReason,
      approvedBy,
      approvedDate: getTodayDate(),
    })
    .send<Collection<Company>>(AdminAuthToken());
  return req;
};

export const getAllPartners = async () => {
  const res = await loadPaginatedData(getPartners);
  return res;
};

export const getPartner = async (id: string) => {
  const req = await client
    .get("/api/collections/users/records/" + id, {
      expand: "company,company.updateBy,company.approvedBy",
    })
    .send<UserItem>();
  return req;
};
