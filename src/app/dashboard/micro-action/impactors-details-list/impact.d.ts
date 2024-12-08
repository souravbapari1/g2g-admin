import { UserItem } from "@/interfaces/user";

export interface ImpactDataItem {
  collectionId: string;
  collectionName: string;
  created: string;
  expand: Expand;
  id: string;
  impact: number;
  micro_action: string;
  refer: string;
  submit: number;
  updated: string;
  user: string;
  userData: UserData;
}

export interface Expand {
  micro_action: MicroAction;
  user?: UserItem;
  refer?: UserItem;
}

export interface MicroAction {
  collectionId: string;
  collectionName: string;
  created: string;
  description: string;
  id: string;
  isPrimary: boolean;
  kgPerUnit: number;
  partners: string[];
  public: boolean;
  title: string;
  updated: string;
}

export interface UserData {
  name: string;
  code: string;
  email: string;
  mobile_no: string;
  impact: number;
  id?: string;
  city?: string;
  country?: string;
}

export interface MAStatus {
  current: Current;
  submits: Submits;
  total: Total;
  totalCity: number;
  users: Users;
  totalCountry: number;
  totalMc: number;
  sponsors: number;
  totalAmbassador: number;
}

export interface Current {
  impact: number;
}

export interface Submits {
  submits: number;
}

export interface Total {
  impact: number;
}

export interface Users {
  users: number;
}
