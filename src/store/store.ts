import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configurationSlice } from "./features/configurationSlice";
import { SidebarSlice } from "./features/sidebarSlice";

export const store = configureStore({
  reducer: {
    sidebar: SidebarSlice.reducer,
    configuration: configurationSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
