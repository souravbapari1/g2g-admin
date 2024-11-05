import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { MeasurementItem } from "@/interfaces/measurement";
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
interface GlobalDataSetContextType {
  projectTypeListGlobal: ProjectType[];
  sdgListGlobal: SDGITEM[];
  unitTypeListGlobal: UnitItem[];
  countryCityListGlobal: Country[];
  usersListGlobal: UserItem[];
  employeeListGlobal: UserItem[];
  treeTypeListGlobal: TreeTypesItem[];
  measurementListGlobal: MeasurementItem[];
  areaTypeListGlobal: MeasurementItem[];
  projectsListGlobal: ProjectItem[];
  blogCategoryListGlobal: BlogCategoryItem[];

  loadAllData: () => Promise<void>;
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
  loadAllData: async () => {},
};

const GlobalDataSetContext =
  createContext<GlobalDataSetContextType>(defaultContextValue);

export const GlobalDataSetContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [projectTypeListGlobal, setProjectTypeListGlobal] = useState<
    ProjectType[]
  >([]);
  const [sdgListGlobal, setSdgListGlobal] = useState<SDGITEM[]>([]);
  const [unitTypeListGlobal, setUnitTypeListGlobal] = useState<UnitItem[]>([]);
  const [countryCityListGlobal, setCountryCityListGlobal] = useState<Country[]>(
    []
  );
  const [usersListGlobal, setUsersListGlobal] = useState<UserItem[]>([]);
  const [employeeListGlobal, setEmployeeListGlobal] = useState<UserItem[]>([]);
  const [treeTypeListGlobal, setTreeTypeListGlobal] = useState<TreeTypesItem[]>(
    []
  );
  const [measurementListGlobal, setMeasurementListGlobal] = useState<
    MeasurementItem[]
  >([]);
  const [areaTypeListGlobal, setAreaTypeListGlobal] = useState<
    MeasurementItem[]
  >([]);
  const [projectsListGlobal, setProjectsListGlobal] = useState<ProjectItem[]>(
    []
  );

  const [blogCategoryListGlobal, setBlogCategoryListGlobal] = useState<
    BlogCategoryItem[]
  >([]);

  const loadAllData = useCallback(async () => {
    try {
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
      ]);

      setSdgListGlobal(sdgData);
      setProjectTypeListGlobal(projectTypeData);
      setUnitTypeListGlobal(unitTypeData);
      setUsersListGlobal(usersData);
      setEmployeeListGlobal(
        usersData.filter((item) => item.role.toLowerCase() === "employee")
      );
      setTreeTypeListGlobal(treeTypeData);
      setMeasurementListGlobal(measurementData.items);
      setAreaTypeListGlobal(areaTypeData.items);
      setProjectsListGlobal(projectData);
      setBlogCategoryListGlobal(blogCategoryData.items);

      const countryCityData = getCountryCity();
      setCountryCityListGlobal(countryCityData);
    } catch (error) {
      console.error("Failed to load global data:", error);
    }
  }, []);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  return (
    <GlobalDataSetContext.Provider
      value={{
        projectTypeListGlobal,
        sdgListGlobal,
        unitTypeListGlobal,
        countryCityListGlobal,
        usersListGlobal,
        employeeListGlobal,
        treeTypeListGlobal,
        measurementListGlobal,
        areaTypeListGlobal,
        projectsListGlobal,
        loadAllData,
        blogCategoryListGlobal,
      }}
    >
      {children}
    </GlobalDataSetContext.Provider>
  );
};

export const useGlobalDataSetContext = () => {
  const context = useContext(GlobalDataSetContext);
  if (!context) {
    throw new Error(
      "GlobalDataSetContext must be used within a GlobalDataSetContextProvider"
    );
  }
  return context;
};
