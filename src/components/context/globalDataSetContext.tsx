import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { AreaTypeDataItem, MeasurementItem } from "@/interfaces/measurement";
import { ProjectItem } from "@/interfaces/project";
import { ProjectType } from "@/interfaces/projectType";
import { SDGITEM } from "@/interfaces/sdg";
import { TreeTypesItem } from "@/interfaces/treetypes";
import { UnitItem } from "@/interfaces/units";
import { UserItem } from "@/interfaces/user";
import { Country, getCountryCity } from "@/request/fetch/country";
import { getAreaTypes } from "@/request/worker/catalogs/areaType";
import { getMeasurements } from "@/request/worker/measurement/measurement";
import {
  loadAllProjects,
  loadAllProjectTypes,
  loadAllSDGs,
  loadAllTreeTypes,
  loadAllUnitTypes,
  loadAllUsers,
} from "./dataLoaders";
import { BlogCategoryItem } from "@/interfaces/category";
import { getBlogCategorys } from "@/request/worker/blog/manageCategory";
import { getAccredationStandars } from "@/request/worker/AccredationStandars/manageAccredationStandars";
import { ResearchCategoryItem } from "@/interfaces/researches";
import { getResearchCategorys } from "@/request/worker/researches/manageResearchesCategory";

// Context Interface
interface GlobalDataSetContextType {
  projectTypeListGlobal: ProjectType[];
  sdgListGlobal: SDGITEM[];
  unitTypeListGlobal: UnitItem[];
  countryCityListGlobal: Country[];
  usersListGlobal: UserItem[];
  employeeListGlobal: UserItem[];
  ambassadorListGlobal: UserItem[];
  partnerListGlobal: UserItem[];
  treeTypeListGlobal: TreeTypesItem[];
  measurementListGlobal: MeasurementItem[];
  areaTypeListGlobal: AreaTypeDataItem[];
  projectsListGlobal: ProjectItem[];
  blogCategoryListGlobal: BlogCategoryItem[];
  researchCategoryListGlobal: ResearchCategoryItem[];
  accStandardsListGlobal: BlogCategoryItem[];

  loadAllData: () => Promise<void>;
  revalidateCache: () => Promise<void>;
}

const defaultContextValue: GlobalDataSetContextType = {
  projectTypeListGlobal: [],
  sdgListGlobal: [],
  unitTypeListGlobal: [],
  countryCityListGlobal: [],
  usersListGlobal: [],
  employeeListGlobal: [],
  treeTypeListGlobal: [],
  measurementListGlobal: [],
  areaTypeListGlobal: [],
  projectsListGlobal: [],
  blogCategoryListGlobal: [],
  accStandardsListGlobal: [],
  researchCategoryListGlobal: [],
  ambassadorListGlobal: [],
  partnerListGlobal: [],
  loadAllData: async () => {},
  revalidateCache: async () => {},
};

const GlobalDataSetContext =
  createContext<GlobalDataSetContextType>(defaultContextValue);

// Helper Functions
const getCache = (key: string, expirationTime: number) => {
  const cachedData = localStorage.getItem(key);
  if (!cachedData) return null;
  const { data, timestamp } = JSON.parse(cachedData);
  return Date.now() - timestamp < expirationTime ? data : null;
};

const setCache = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
};

const clearCache = (key: string) => {
  localStorage.removeItem(key);
};

// Provider Component
export const GlobalDataSetContextProvider: React.FC<{
  children: ReactNode;
  cacheExpirationTime?: number; // Default to 30 minutes
}> = ({ children, cacheExpirationTime = 30 * 60 * 1000 }) => {
  const [state, setState] =
    useState<GlobalDataSetContextType>(defaultContextValue);

  const loadAllData = useCallback(async () => {
    const cacheKey = "globalDataSetCache";

    try {
      // Check and load from cache (excluding country data)
      const cachedData = getCache(cacheKey, cacheExpirationTime);
      let newState: GlobalDataSetContextType;

      if (cachedData) {
        newState = { ...cachedData, countryCityListGlobal: [] };
      } else {
        // Fetch all data in parallel except country data
        const [
          sdgData,
          projectTypeData,
          unitTypeData,
          usersData,
          treeTypeData,
          measurementData,
          areaTypeData,
          projectData,
          blogCategoryData,
          accStandardsData,
          researchCategoryData,
        ] = await Promise.all([
          loadAllSDGs(),
          loadAllProjectTypes(),
          loadAllUnitTypes(),
          loadAllUsers(),
          loadAllTreeTypes(),
          getMeasurements(),
          getAreaTypes(),
          loadAllProjects(),
          getBlogCategorys(),
          getAccredationStandars(),
          getResearchCategorys(),
        ]);

        const employeeListGlobal = usersData.filter(
          (item) => item.role.toLowerCase() === "employee"
        );

        const ambassadorListGlobal = usersData.filter(
          (item) => item.user_type.toLowerCase() === "ambassador"
        );

        const partnerListGlobal = usersData.filter(
          (item) => item.user_type.toLowerCase() === "partner"
        );
        newState = {
          ambassadorListGlobal,
          partnerListGlobal,
          projectTypeListGlobal: projectTypeData,
          sdgListGlobal: sdgData,
          unitTypeListGlobal: unitTypeData,
          usersListGlobal: usersData,
          employeeListGlobal,
          treeTypeListGlobal: treeTypeData,
          measurementListGlobal: measurementData.items,
          areaTypeListGlobal: areaTypeData.items,
          projectsListGlobal: projectData,
          blogCategoryListGlobal: blogCategoryData.items,
          accStandardsListGlobal: accStandardsData.items,
          researchCategoryListGlobal: researchCategoryData.items,
          countryCityListGlobal: [], // Placeholder for dynamic fetch
          loadAllData,
          revalidateCache,
        };

        setCache(cacheKey, newState); // Cache only non-country data
      }

      // Always fetch fresh country data
      const countryCityData = await getCountryCity();
      newState = { ...newState, countryCityListGlobal: countryCityData };

      // Update state with combined data
      setState(newState);
    } catch (error) {
      console.error("Failed to load global data:", error);
    }
  }, [cacheExpirationTime]);

  // Revalidate Cache
  const revalidateCache = useCallback(async () => {
    const cacheKey = "globalDataSetCache";
    clearCache(cacheKey); // Clear cached data
    await loadAllData(); // Fetch fresh data and cache it
  }, [loadAllData]);

  // Load data on mount
  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  return (
    <GlobalDataSetContext.Provider value={{ ...state, revalidateCache }}>
      {children}
    </GlobalDataSetContext.Provider>
  );
};

// Custom Hook
export const useGlobalDataSetContext = () => {
  const context = useContext(GlobalDataSetContext);
  if (!context) {
    throw new Error(
      "GlobalDataSetContext must be used within a GlobalDataSetContextProvider"
    );
  }
  return context;
};
