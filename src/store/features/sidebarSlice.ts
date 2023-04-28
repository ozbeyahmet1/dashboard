import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum SelectedSidebar {
  HOMEPAGE,
  PRODUCT,
  EDIT,
}

export interface SidebarState {
  readonly sidebar: SelectedSidebar;
}

const initialState: SidebarState = {
  sidebar: SelectedSidebar.HOMEPAGE,
};

export const SidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setSidebar: (state, action: PayloadAction<SelectedSidebar>) => {
      state.sidebar = action.payload;
    },
  },
});

export default SidebarSlice.reducer;
export const { setSidebar } = SidebarSlice.actions;
