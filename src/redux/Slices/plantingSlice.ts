import { ProjectItem } from "@/interfaces/project";
import { TreeOrderItem } from "@/interfaces/treeOrders";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  openTreesPanel: boolean;

  openOrderMenu: string | null;
  ordersList: ProjectItem[];
  workingProject: ProjectItem | null;
  workingOrder: TreeOrderItem | null;
} = {
  openTreesPanel: false,
  openOrderMenu: "",
  workingProject: null,
  workingOrder: null,
  ordersList: [],
};

const plantingSlice = createSlice({
  name: "plantingSlice",
  initialState,
  reducers: {
    setPlantingData: (
      state,
      action: { payload: Partial<typeof initialState> }
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setPlantingData } = plantingSlice.actions;

export default plantingSlice.reducer;
