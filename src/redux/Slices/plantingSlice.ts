import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openTreesPanel: false,
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
