export interface StatusCountItem {
  blogs_status: Status[];
  donate_status: Status2[];
  project_status: Status3[];
  researches_status: Status4[];
  tree_orders_status: Status5[];
  trees_status: Status6[];
  unit_status: Status7[];
  users_status: Status8[];
}

export interface Status {
  id: string;
  public: boolean;
  total: number;
}

export interface Status2 {
  total: number;
  donates: number;
  id: string;
}

export interface Status3 {
  id: string;
  total: number;
  status: string;
}

export interface Status4 {
  id: string;
  status: string;
  total: number;
}

export interface Status5 {
  id: string;
  total: number;
  status: string;
}

export interface Status6 {
  id: string;
  status: string;
  total: number;
}

export interface Status7 {
  total: number;
  id: string;
}

export interface Status8 {
  total: number;
  id: string;
  user_type: string;
}
