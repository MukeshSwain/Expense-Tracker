import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dashboardData: [],
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setdashboardData: (state, action) => {
      state.dashboardData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setdashboardData } = dashboardSlice.actions;

export default dashboardSlice.reducer;
