import { createSlice } from "@reduxjs/toolkit";

const settings = createSlice({
  name: "settings",
  initialState: {
    showSidebar: true,
    theme: "light",
    advertisement: [],
    generalData: {},
    costCenter: [],
  },
  reducers: {
    toggleSideBar: (state, action) => {
      if (action.payload === undefined) {
        state.showSidebar = state.showSidebar === true ? false : true;
      } else {
        state.showSidebar = action.payload;
      }
    },
    setTheme: (state, action) => {
      const newTheme = action.payload;
      state.theme = newTheme;
    },
    setAdvertisement: (state, action) => {
      state.advertisement = action.payload;
    },
    setGeneralData: (state, action) => {
      state.generalData = action.payload;
    },
    setCostCenter: (state, action) => {
      state.costCenter = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
  },
});

export const {
  toggleSideBar,
  setTheme,
  setAdvertisement,
  setGeneralData,
  setCostCenter,
  toggleTheme,
} = settings.actions;
export default settings.reducer;
