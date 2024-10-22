import { MapBoxPickAreaProps } from "@/components/mapbox/mapBoxPickArea";
import { MapBoxPickMarkerProps } from "@/components/mapbox/mapBoxPickMarker";
import { Collection } from "@/interfaces/collection";
import { UserItem } from "@/interfaces/user";
import { createSlice } from "@reduxjs/toolkit";
export interface projectDataType {
  name: string;
  sort_title: string;
  type: string;
  top_project: boolean;
  main_interventions: string[];
  unit_measurement: string;
  number_of_target_unit: number;
  omr_unit: number;
  start_date: string;
  sdgs: string[];
  unit_types: string[];
  reports: string[];
  country: string;
  city: string;
  location: string;
  marker: MapBoxPickMarkerProps | undefined;
  workareas: MapBoxPickAreaProps["defaultAreaData"];
  about_project: string;
  challenges_and_impact_details: string;
  website: string;
  email: string;
  phone: string;
  address: string;
  operated_by: string[];

  allow: boolean;
  status: string;
  projectImage?: File;
  projectContentImages?: File[];
  projectContentVideos?: File[];
  challengesAndImpactDetailsImages?: File[];
  challengesAndImpactDetailsVideos?: File[];

  challengesAndImpactDetailsImagesLinks: { name: string; url: string }[];
  challengesAndImpactDetailsVideosLinks: { name: string; url: string }[];
  projectContentImagesLinks: { name: string; url: string }[];
  projectContentVideosLinks: { name: string; url: string }[];
}

export interface IProjectParams {
  users?: Collection<UserItem>;
  project: projectDataType;
  trash?: {
    challengesAndImpactDetailsImages?: string[];
    projectContentImages?: string[];
    operated_by?: string[];
    sdgs?: string[];
    unit_types?: string[];
    reports?: string[];
  };
}

const initialState: IProjectParams = {
  project: {
    about_project: "",
    address: "",
    allow: false,
    challenges_and_impact_details: "",
    city: "",
    country: "",
    email: "",
    main_interventions: [],
    marker: undefined,
    name: "",
    number_of_target_unit: 0,
    omr_unit: 0,
    phone: "",
    reports: [],
    sort_title: "",
    start_date: "",
    top_project: false,
    unit_measurement: "",
    unit_types: [],
    website: "",
    workareas: {
      areaInfo: null,
      workAreaData: null,
    },
    operated_by: [],
    location: "",
    sdgs: [],
    type: "",
    status: "",
    challengesAndImpactDetailsImages: [],
    challengesAndImpactDetailsVideos: [],
    projectContentImages: [],
    projectContentVideos: [],

    challengesAndImpactDetailsImagesLinks: [],
    challengesAndImpactDetailsVideosLinks: [],
    projectContentImagesLinks: [],
    projectContentVideosLinks: [],
  },
};
const projectParamsSlice = createSlice({
  name: "projectParams",
  initialState,
  reducers: {
    setProjectParamsData: (
      state,
      action: {
        payload: {
          project?: projectDataType;
        };
      }
    ) => {
      if (action.payload) {
        return {
          ...state,
          ...action.payload,
        };
      }
    },

    setProjectDataValue: (
      state,
      action: {
        payload: { key: keyof projectDataType; data: any };
      }
    ) => {
      return {
        ...state,
        project: {
          ...state.project,
          [action.payload.key]: action.payload.data || "",
        },
      };
    },

    addToTrash: (
      state: IProjectParams,
      action: { payload: { key: keyof IProjectParams["trash"]; value?: any } }
    ) => {
      const { key, value } = action.payload;

      // Initialize `state.trash` if it's undefined
      const trashState = state.trash || {};

      if (value !== undefined && value !== null) {
        // Add new value to the corresponding trash array (safely handle `undefined` key arrays)
        return {
          ...state,
          trash: {
            ...trashState,
            [key]: [...(trashState[key] || []), value],
          },
        };
      } else {
        // If no value provided, reset the array for the given key
        return {
          ...state,
          trash: {
            ...trashState,
            [key]: [],
          },
        };
      }
    },

    resetProjectParamsData: (state) => {
      return {
        ...state,
        project: {
          ...initialState.project,
        },
      };
    },
  },
});
export const {
  setProjectParamsData,
  resetProjectParamsData,
  setProjectDataValue,
} = projectParamsSlice.actions;

export default projectParamsSlice.reducer;
