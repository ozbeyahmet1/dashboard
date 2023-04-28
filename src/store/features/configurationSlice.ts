import { INNOLOFT_API_ENDPOINT } from "@/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

export interface ConfigurationModel {
  id: number;
  logo: string;
  mainColor: string;
  hasUserSection: boolean;
}

interface ConfigurationsState {
  loading: boolean;
  data: ConfigurationModel | null;
}

const initialState: ConfigurationsState = {
  loading: false,
  data: null,
};

let appId = "";
if (!process.env.APP_ID) {
  appId = "1";
} else {
  appId = process.env.APP_ID;
}

export const fetchData = createAsyncThunk("get/configuration", async (): Promise<ConfigurationModel> => {
  const response: AxiosResponse<ConfigurationModel> = await axios.get(
    `${INNOLOFT_API_ENDPOINT}/configuration/${appId}/`,
  );
  return response.data;
});

export const configurationSlice = createSlice({
  name: "configuration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchData.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default configurationSlice.reducer;
