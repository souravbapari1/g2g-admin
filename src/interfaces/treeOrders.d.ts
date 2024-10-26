import { ProjectItem } from "./project";
import { Company, UserItem } from "./user";

export interface TreeOrderItem {
  amount: number;
  asigned_to: string;
  collectionId: string;
  collectionName: string;
  created: string;
  expand: Expand;
  id: string;
  maping_status: string;
  order_id: number;
  project: string;
  status: string;
  tree_count: number;
  trees: string[];
  updated: string;
  user: string;
  plant_date: string;
  type: string;
  planted_trees?: Tree[];
  not_planted_trees?: Tree[];
}

export interface Expand {
  trees: Tree[];
  user: UserItem;
  asigned_to: UserItem;
  project: ProjectItem;
}

export interface Tree {
  area: any;
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  location: string;
  order: string;
  orderIdNo: number;
  project: string;
  status: string;
  treeId: number;
  treeName: string;
  treeType: string;
  updated: string;
  user: string;
}
