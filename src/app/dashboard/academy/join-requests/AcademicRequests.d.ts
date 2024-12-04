import { UserItem } from "@/interfaces/user";

export interface AcademicRequestsItem {
  academic: Academic;
  applicationData: ApplicationData;
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  status: string;
  updateBy: string;
  updated: string;
  expand: {
    updateBy: UserItem;
  };
}

export interface Academic {
  amount: number;
  name: string;
  maxParticipents: number;
  pricing: string;
  time: string;
  title: string;
  startDate: string;
  slug: string;
  registerationEndDate: string;
  locationType: string;
  endDate: string;
  languge: string;
  location: string;
  __typename: string;
  documentId?: string;
  applications?: number;
}

export interface ApplicationData {
  name: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
  size: string;
  country: string;
  city: string;
  note: string;
}
