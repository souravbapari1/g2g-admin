export interface NewUser {
  password?: string;
  passwordConfirm?: string;
  email?: string | null;
  emailVisibility?: boolean;
  first_name?: string | null;
  last_name?: string | null;
  avatar?: string | null;
  mobile_no?: string | null;
  country?: string | null;
  city?: string | null;
  gender?: string | null;
  socail_state?: string | null;
  dob?: string | null;
  user_type?: "individual" | "ambassador" | "partner" | null;
  role?: "USER" | "ADMIN" | "EMPLOYEE" | "MANAGER" | null;
  complete?: boolean | null;
  breef?: string | null;
  linkedin?: string | null;
  instagram?: string | null;
  twitter?: string | null;
  youtube?: string | null;
  targetTrees?: number | null;
  targetPlastic?: number | null;
  isBlocked?: boolean | null;
  level?: string | null;
  lastLogin?: string | null;
  allowPermission?: string | null;
}
