import { ProjectItem } from "@/interfaces/project";
import { Tree, TreeOrderItem } from "@/interfaces/treeOrders";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  openTreesPanel: boolean;
  openOrderMenu: string | null;
  ordersList: ProjectItem[];
  workingProject: ProjectItem | null;
  workingOrder: TreeOrderItem | null;
  workingTrees: Tree[];
  selectedTree: Tree | null;
  reportTree: Tree | null;
  checkedProjectList: ProjectItem[] | null;

  //
  filterOrdersList: ProjectItem[] | null;
  filterType: string | null;
  filterOptions: string[];

  //
  showSelected: boolean;
} = {
  openTreesPanel: false,
  openOrderMenu: null,
  workingProject: null,
  workingOrder: null,
  ordersList: [],
  workingTrees: [],
  selectedTree: null,
  reportTree: null,
  checkedProjectList: null,
  //
  filterOrdersList: null,
  filterOptions: [],
  filterType: null,
  showSelected: false,
};

const plantingSlice = createSlice({
  name: "plantingSlice",
  initialState,
  reducers: {
    setPlantingData: (
      state,
      action: PayloadAction<Partial<typeof initialState>>
    ) => {
      return { ...state, ...action.payload };
    },

    setWorkingTree: (
      state,
      action: PayloadAction<{
        index: number;
        tree: Tree;
      }>
    ) => {
      const updatedTrees = state.workingTrees.map((t, i) =>
        i === action.payload.index ? action.payload.tree : t
      );
      return {
        ...state,
        workingTrees: updatedTrees,
      };
    },
  },
});

export const { setPlantingData, setWorkingTree } = plantingSlice.actions;

export default plantingSlice.reducer;
