export interface MicroActionItem {
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

export interface MAImpactItem {
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  impact: number;
  micro_action: string;
  refer: string;
  submit: number;
  updated: string;
  user: string;
  userData: UserData;
}

export interface UserData {
  name: string;
  code: string;
  email: string;
  mobile_no: string;
  impact: number;
  id: any;
}

export interface ImpactCount {
  current: Current;
  total: Total;
  totalCity: number;
  users: Users;
}

export interface Current {
  impact: number;
}

export interface Total {
  impact: number;
}

export interface Users {
  users: number;
}
