// note: this i used for dynamicy  userffect qany page any ware
import { MeasurementItem } from "@/interfaces/measurement";
import { ProjectType } from "@/interfaces/projectType";
import { ReportingItem } from "@/interfaces/reporting";
import { SDGITEM } from "@/interfaces/sdg";
import { TreeTypesItem } from "@/interfaces/treetypes";
import { UnitItem } from "@/interfaces/units";
import { UserItem } from "@/interfaces/user";
import { Country, CountryList, getCountryCity } from "@/request/fetch/country";
import { getUsers } from "@/request/worker/auth";
import { getProjectType } from "@/request/worker/catalogs/projectType";
import { getReports } from "@/request/worker/catalogs/reports";
import { getSdgs } from "@/request/worker/catalogs/sdgs";
import { getUnitTypes } from "@/request/worker/catalogs/unitTypes";
import { getMeasurements } from "@/request/worker/measurement/measurement";
import { getTreeTypes } from "@/request/worker/treetype/manageTreeTypes";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  memo,
} from "react";

// Define the shape of the context value
interface GlobalDataSetContextType {
  projectTypeListGlobal: ProjectType[];
  sdgListGlobal: SDGITEM[];
  unitTypeListGlobal: UnitItem[];
  countryCityListGlobal: Country[];
  usersListGlobal: UserItem[];
  employeeListGlobal: UserItem[];
  treeTypeListGlobal: TreeTypesItem[];
  measurementListGlobal: MeasurementItem[];

  loadSdgListGlobal: () => Promise<void>;
  loadProjectTypeListGlobal: () => Promise<void>;
  loadUnitTypeListGlobal: () => Promise<void>;
  loadCountryCityListGlobal: () => Promise<void>;
  loadUsersListGlobal: () => Promise<void>;
  loadTreeTypeListGlobal: () => Promise<void>;

  loadMeasurementListGlobal: () => Promise<void>;
}

// Create the context with a default value
const GlobalDataSetContext = createContext<
  GlobalDataSetContextType | undefined
>(undefined);

// Define the provider component
export const GlobalDataSetContextProvider: React.FC<{
  children: ReactNode;
}> = memo(({ children }) => {
  const [countryCityListGlobal, setCountryCityListGlobal] = useState<Country[]>(
    []
  );
  const [sdgListGlobal, setSdgListGlobal] = useState<SDGITEM[]>([]);

  const [measurementListGlobal, setMeasurementListGlobal] = useState<
    MeasurementItem[]
  >([]);

  const [unitTypeListGlobal, setUnitTypeListGlobal] = useState<UnitItem[]>([]);
  const [usersListGlobal, setUsersListGlobal] = useState<UserItem[]>([]);
  const [projectTypeListGlobal, setProjectTypeListGlobal] = useState<
    ProjectType[]
  >([]);

  const [employeeListGlobal, setEmployeeListGlobal] = useState<UserItem[]>([]);

  const [treeTypeListGlobal, setTreeTypeListGlobal] = useState<TreeTypesItem[]>(
    []
  );

  const loadSdgListGlobal = async () => {
    try {
      const data = await allSDGITEMDataLoaderAll();
      setSdgListGlobal(data);
    } catch (error) {
      console.log(error);
    }
  };
  const loadProjectTypeListGlobal = async () => {
    try {
      const data = await allProjectTypesDataLoaderAll();
      setProjectTypeListGlobal(data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadUnitTypeListGlobal = async () => {
    try {
      const data = await allUnitTypesDataLoaderAll();
      setUnitTypeListGlobal(data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadUsersListGlobal = async () => {
    try {
      const data = await allUsersDataLoaderAll();
      setEmployeeListGlobal(
        data.filter?.((item) => item.role.toLowerCase() === "employee")
      );
      setUsersListGlobal(data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadCountryCityListGlobal = async () => {
    try {
      const data = await getCountryCity();
      setCountryCityListGlobal(data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadTreeTypeListGlobal = async () => {
    try {
      const data = await allTreeTypesDataLoaderAll();
      setTreeTypeListGlobal(data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMeasurementListGlobal = async () => {
    try {
      const data = await getMeasurements();
      setMeasurementListGlobal(data.items);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GlobalDataSetContext.Provider
      value={{
        measurementListGlobal,
        loadMeasurementListGlobal,
        treeTypeListGlobal,
        employeeListGlobal,
        usersListGlobal,
        countryCityListGlobal,
        unitTypeListGlobal,
        projectTypeListGlobal,
        sdgListGlobal,
        loadUsersListGlobal,
        loadUnitTypeListGlobal,
        loadCountryCityListGlobal,
        loadSdgListGlobal,
        loadProjectTypeListGlobal,
        loadTreeTypeListGlobal,
      }}
    >
      {children}
    </GlobalDataSetContext.Provider>
  );
});

// Custom hook to use the GlobalDataSetContext
export const useGlobalDataSetContext = () => {
  const context = useContext(GlobalDataSetContext);

  const loadAllData = async () => {
    await Promise.all([
      context?.loadProjectTypeListGlobal(),
      context?.loadSdgListGlobal(),
      context?.loadUnitTypeListGlobal(),
      context?.loadCountryCityListGlobal(),
      context?.loadUsersListGlobal(),
      context?.loadTreeTypeListGlobal(),
      context?.loadMeasurementListGlobal(),
    ]);
  };

  useEffect(() => {
    loadAllData();
  }, []);

  if (!context) {
    throw new Error(
      "GlobalDataSetContext must be used within a GlobalDataSetContextProvider"
    );
  }
  return context;
};

const allSDGITEMDataLoaderAll = async (
  page: number = 1,
  tmData: SDGITEM[] = []
): Promise<SDGITEM[]> => {
  const data = await getSdgs(page);
  const updatedTmData = tmData.concat(data.items);
  if (page < data.totalPages) {
    return await allSDGITEMDataLoaderAll(page + 1, updatedTmData);
  }
  return updatedTmData;
};

const allProjectTypesDataLoaderAll = async (
  page: number = 1,
  tmData: ProjectType[] = []
): Promise<ProjectType[]> => {
  const data = await getProjectType(page);
  const updatedTmData = tmData.concat(data.items);
  if (page < data.totalPages) {
    return await allProjectTypesDataLoaderAll(page + 1, updatedTmData);
  }
  return updatedTmData;
};

const allUnitTypesDataLoaderAll = async (
  page: number = 1,
  tmData: UnitItem[] = []
): Promise<UnitItem[]> => {
  const data = await getUnitTypes(page);
  const updatedTmData = tmData.concat(data.items);
  if (page < data.totalPages) {
    return await allUnitTypesDataLoaderAll(page + 1, updatedTmData);
  }
  return updatedTmData;
};

const allUsersDataLoaderAll = async (
  page: number = 1,
  tmData: UserItem[] = []
): Promise<UserItem[]> => {
  const data = await getUsers(page);
  const updatedTmData = tmData.concat(data.items);
  if (page < data.totalPages) {
    return await allUsersDataLoaderAll(page + 1, updatedTmData);
  }
  return updatedTmData;
};

const allTreeTypesDataLoaderAll = async (
  page: number = 1,
  tmData: TreeTypesItem[] = []
): Promise<TreeTypesItem[]> => {
  const data = await getTreeTypes(page);
  const updatedTmData = tmData.concat(data.items);
  if (page < data.totalPages) {
    return await allTreeTypesDataLoaderAll(page + 1, updatedTmData);
  }
  return updatedTmData;
};
