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
  end_date: string;

  sdgs: {
    name: string;
    sdg: string;
    description: string;
    data: {
      name: string;
      value: string;
    }[];
  }[];
  report?: File | null;
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
  instagram: string;
  linkedin: string;
  telegram: string;
  profilePdf: string;
  x: string;
  facebook: string;
  operated_by: string[];
  assigned_by: string[];
  project_prefix: string;

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
    project_prefix: "",
    allow: true,
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
    end_date: "",
    instagram: "",
    linkedin: "",
    telegram: "",
    profilePdf: "",
    x: "",
    facebook: "",

    top_project: false,
    report: null,
    unit_measurement: "",
    unit_types: [],
    website: "",
    workareas: {
      areaInfo: null,
      workAreaData: null,
    },
    operated_by: [],
    assigned_by: [],
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

    // Modify the existing reducer code with the following updates.

    addNewSdg: (
      state,
      action: {
        payload: {
          name: string;
          sdg: string;
          description: string;
          data: {
            name: string;
            value: string;
          }[];
        };
      }
    ) => {
      // Check if the payload structure is correct
      const { name, sdg, description, data } = action.payload;

      state.project.sdgs.push({ name, sdg, description, data });
    },

    removeSdgByIndex: (state, action: { payload: number }) => {
      const index = action.payload;
      if (index >= 0 && index < state.project.sdgs.length) {
        state.project.sdgs.splice(index, 1); // Safely remove by index
      }
    },

    updateSgdByIndex: (
      state,
      action: {
        payload: {
          index: number;
          data: {
            name: string;
            sdg: string;
            description: string;
            data: {
              name: string;
              value: string;
            }[];
          };
        };
      }
    ) => {
      const { index, data } = action.payload;
      if (index >= 0 && index < state.project.sdgs.length) {
        // Perform a deep update on the SDG at the given index
        state.project.sdgs[index] = {
          ...state.project.sdgs[index],
          ...data, // Update only the fields passed in `data`
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
  addNewSdg,
  addToTrash,
  removeSdgByIndex,
  updateSgdByIndex,
} = projectParamsSlice.actions;

export default projectParamsSlice.reducer;
