export interface UserItem {
  avatar: string;
  city: string;
  collectionId: string;
  collectionName: string;
  company: string;
  country: string;
  created: string;
  dob: string;
  email: string;
  emailVisibility: boolean;
  expand?: Expand;
  first_name: string;
  gender: string;
  id: string;
  last_name: string;
  mobile_no: string;
  role: string;
  socail_state: string;
  updated: string;
  user_type: string;
  username: string;
  verified: boolean;
  linkedin: string;
  instagram: string;
  breef: string;
  twitter: string;
  youtube: string;
  targetTrees: string;
  targetPlastic: string;
  tree_orders?: string[];
  mamberships?: string[];
  isBlocked?: boolean;
  approvedBy?: string;
  approvedDate: string;
  level?: string;
  lastLogin?: string;
  allowPermission?: string[];
  rejectReason?: string;
  wallet: number;
}

export interface Expand {
  company?: Company;
}

export interface Company {
  Industry_type: string;
  about_us: string;
  application_name: string;
  city: string;
  collectionId: string;
  collectionName: string;
  company_name: string;
  country: string;
  created: string;
  id: string;
  mr_ms: string;
  position: string;
  resonses: string[];
  size_hint: string;
  updated: string;
  website: string;
  address: string;
  map_location: string;
  approved_status: string;
  updateBy: string;
  companyType?: string;
  rejectReason?: string;
  approvedBy?: string;
  approvedDate?: string;
  summery?: {
    annualBudget?: string;
    categoriesConsider?: string;
    othersComment?: string;
  };
  expand?: {
    updateBy?: UserItem;
    approvedBy?: UserItem;
  };
}
