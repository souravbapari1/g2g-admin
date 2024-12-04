import { Collection } from "@/interfaces/collection";
import { AdminAuthToken, client } from "@/request/actions";

export const getMicroActions = (page: number = 1) => {
  const res = client
    .get("/api/collections/micro_actions/records", {
      expand: "partners",
    })
    .send<Collection<MicroActionDataItem>>();
  return res;
};

export const getMicroAction = (id: string) => {
  const res = client
    .get("/api/collections/micro_actions/records/" + id, {
      expand: "partners",
      perPage: 500,
    })
    .send<MicroActionDataItem>();
  return res;
};

export const deleteMicroAction = async (id: string) => {
  const res = await client
    .delete("/api/collections/micro_actions/records/" + id)
    .send<MicroActionDataItem>(AdminAuthToken());
  return res;
};

export interface MicroActionDataItem {
  collectionId: string;
  collectionName: string;
  created: string;
  description: string;
  expand: Expand;
  id: string;
  kgPerUnit: number;
  partners: string[];
  title: string;
  updated: string;
  public: boolean;
  isPrimary: boolean;
}

export interface Expand {
  partners: Partner[];
}

export interface Partner {
  avatar: string;
  breef: string;
  city: string;
  collectionId: string;
  collectionName: string;
  company: string;
  complete: boolean;
  country: string;
  created: string;
  dob: string;
  email: string;
  emailVisibility: boolean;
  first_name: string;
  gender: string;
  id: string;
  instagram: string;
  last_name: string;
  linkedin: string;
  mamberships: any[];
  mobile_no: string;
  role: string;
  socail_state: string;
  targetPlastic: number;
  targetTrees: number;
  tree_orders: any[];
  twitter: string;
  updated: string;
  user_type: string;
  username: string;
  verified: boolean;
  youtube: string;
}
