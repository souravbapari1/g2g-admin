import { ProjectType } from "./projectType";
import { ReportingItem } from "./reporting";
import { SDGITEM } from "./sdg";
import { UnitItem } from "./units";
import { UserItem } from "./user";

export interface ProjectItem {
  about_project: string;
  address: string;
  allow: boolean;
  challenges_and_impact_details: string;
  challenges_and_impact_details_images: string[];
  challenges_and_impact_details_videos: string[];
  city: string;
  collectionId: string;
  collectionName: string;
  country: string;
  created: string;
  email: string;
  expand?: Expand;
  id: string;
  status: string;
  location: string;
  main_interventions: string[];
  marker: any;
  name: string;
  number_of_target_unit: number;
  omr_unit: number;
  operated_by: string[];
  phone: string;
  preview_image: string;
  project_images: string[];
  project_videos: any[];
  reports: string[];
  sdgs: string[];
  sort_title: string;
  start_date: string;
  top_project: boolean;
  type: string;
  unit_measurement: string;
  unit_types: string[];
  updated: string;
  website: string;
  workareas: any;
}

export interface Expand {
  operated_by?: UserItem[];
  sdgs?: SDGITEM[];
  type?: ProjectType;
  unit_types?: UnitItem[];
  reports?: ReportingItem[];
}

export interface Parameter {
  name: string;
  value: string;
}

export interface MainIntervention {
  text: string;
  value: string;
}
