import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserLoginApi, UserRegisterApi } from "../../../apies/authApis";
import { AxiosError } from "axios";

export interface user {
  name: string;
  email: string;
  jwt: string;
  loading: true | false;
}

let initialState: user = {
  name: "",
  email: "",
  jwt: "",
  loading: false,
};

export const loginUser = createAsyncThunk(
  "/api/auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await UserLoginApi(email, password);
      console.log("resss", response);
      return response?.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);
export const registerUser = createAsyncThunk(
  "/api/auth/register",
  async (
    {
      name,
      email,
      password,
    }: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await UserRegisterApi(name, email, password);
      console.log("resss", response);
      return response?.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logoutAction(state) {
      state.jwt = "";
      state.name = "";
      state.email = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log("success ");

      const {
        token,
        user: { name, email },
      } = action.payload;
      state.name = name;
      state.email = email;
      state.jwt = token;
      state.loading = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const { logoutAction } = userSlice.actions;
export default userSlice.reducer;
