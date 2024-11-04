import { ProjectItem } from "@/interfaces/project";
import { Tree, TreeOrderItem } from "@/interfaces/treeOrders";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  openTreesPanel: boolean;
  startPlanting: boolean;
  moveTrees: boolean;
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
  startPlanting: false,
  openOrderMenu: null,
  moveTrees: false,
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
    replaceNewPlantedTree: (state, action: PayloadAction<Tree>) => {
      const areaName = action.payload.area.areaName;

      state.ordersList = state.ordersList.map((project) => {
        if (project.id !== state.workingProject?.id) return project;

        // Create a new byArea object with updated tree lists for each area
        const updatedByArea = Object.keys(project.byArea || {}).reduce(
          (acc, key) => {
            acc[key] = project.byArea![key].filter(
              (tree) => tree.id !== action.payload.id
            );
            return acc;
          },
          {} as { [key: string]: Tree[] }
        );

        return {
          ...project,
          byArea: {
            ...updatedByArea,
            [areaName]: [...(updatedByArea[areaName] || []), action.payload],
          },

          orders: project.orders?.map((order) => ({
            ...order,
            planted_trees: order.planted_trees?.map((tree) =>
              tree.id === action.payload.id ? action.payload : tree
            ),

            expand: {
              ...order.expand,
              trees: order.expand.trees.map((tree) =>
                tree.id === action.payload.id ? action.payload : tree
              ),
            },
          })),
        };
      });

      // Synchronize workingProject by applying the same update logic directly
      if (state.workingProject) {
        const updatedByArea = {
          ...state.workingProject.byArea,
          [areaName]: [
            ...(state.workingProject.byArea?.[areaName] || []).filter(
              (tree) => tree.id !== action.payload.id
            ),
            action.payload,
          ],
        };

        const updatedOrders = state.workingProject.orders?.map((order) => ({
          ...order,
          planted_trees: order.planted_trees?.map((tree) =>
            tree.id === action.payload.id ? action.payload : tree
          ),
          expand: {
            ...order.expand,
            trees: order.expand.trees.map((tree) =>
              tree.id === action.payload.id ? action.payload : tree
            ),
          },
        }));

        state.workingProject = {
          ...state.workingProject,
          byArea: updatedByArea,
          orders: updatedOrders,
        };
      }
    },
  },
});

export const { setPlantingData, setWorkingTree, replaceNewPlantedTree } =
  plantingSlice.actions;

export default plantingSlice.reducer;
