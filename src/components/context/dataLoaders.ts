// dataLoaders.ts

import { ProjectItem } from "@/interfaces/project";
import { ProjectType } from "@/interfaces/projectType";
import { SDGITEM } from "@/interfaces/sdg";
import { TreeTypesItem } from "@/interfaces/treetypes";
import { UnitItem } from "@/interfaces/units";
import { UserItem } from "@/interfaces/user";
import { getUsers } from "@/request/worker/auth";
import { getProjectType } from "@/request/worker/catalogs/projectType";
import { getSdgs } from "@/request/worker/catalogs/sdgs";
import { getUnitTypes } from "@/request/worker/catalogs/unitTypes";
import { getProjects } from "@/request/worker/project/manageProject";
import { getTreeTypes } from "@/request/worker/treetype/manageTreeTypes";

// Generalized pagination function
const loadPaginatedData = async <T>(
  fetchFunc: (page: number) => Promise<{ items: T[]; totalPages: number }>
): Promise<T[]> => {
  let page = 1;
  let allData: T[] = [];

  while (true) {
    const { items, totalPages } = await fetchFunc(page);
    allData = allData.concat(items);
    if (page >= totalPages) break;
    page++;
  }

  return allData;
};

export const loadAllSDGs = () => loadPaginatedData<SDGITEM>(getSdgs);
export const loadAllProjectTypes = () =>
  loadPaginatedData<ProjectType>(getProjectType);
export const loadAllUnitTypes = () => loadPaginatedData<UnitItem>(getUnitTypes);
export const loadAllUsers = () => loadPaginatedData<UserItem>(getUsers);
export const loadAllTreeTypes = () =>
  loadPaginatedData<TreeTypesItem>(getTreeTypes);
export const loadAllProjects = () =>
  loadPaginatedData<ProjectItem>(() =>
    getProjects(1, "", "*", "about_project,challenges_and_impact_details")
  );
