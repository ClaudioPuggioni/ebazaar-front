import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

const signupApi = createAsyncThunk("authSlice/signupApi", async (values, { rejectWithValue }) => {
  const URL = "http://localhost:8000/auth/signup";
  // const response = await fetch(URL, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(values),
  // });
  // const data = await response.json();
  // console.log("DATA:", data);
  // if (data.error) return rejectWithValue(data.error);
  // return data;

  const response = await axios({ method: "POST", url: URL, data: values });
  return response.data;
});

const loginApi = createAsyncThunk("authSlice/loginApi", async (values, { rejectWithValue }) => {
  const URL = "http://localhost:8000/auth/login";
  // const response = await fetch(URL, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(values),
  // });
  // const data = await response.json();
  // console.log("DATA:", data);
  // if (data.error) return rejectWithValue(data.error);
  const response = await axios({ method: "POST", url: URL, data: values });
  return response.data;
});

const authSlice = createSlice({
  name: "authSlice",
  initialState: { lgn: false, loading: false, userInfo: false, accessToken: false, refreshToken: false },
  reducers: {
    logout: (state, action) => {
      state.accessToken = false;
      state.refreshToken = false;
      state.userInfo = false;
      state.lgn = false;
      localStorage.clear();
    },
  },
  extraReducers: {
    [signupApi.pending]: (state, action) => {
      state.loading = true;
    },
    [signupApi.rejected]: (state, action) => {
      state.loading = false;
      alert(`${action.error.code}: ${action.error.message}`);
    },
    [signupApi.fulfilled]: (state, action) => {
      const { username, email, created_at, _id, ads } = action.payload.resultObj;
      state.userInfo = { id: _id, userCreated: created_at, username, email, ads };
      state.accessToken = action.payload.accessToken;
      localStorage.setItem("access_token", action.payload.accessToken);
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem("refresh_token", action.payload.refreshToken);
      state.lgn = true;
      state.loading = false;
      console.log("AUTHSLICE CURRENTSTATE:", current(state));
    },
    [loginApi.pending]: (state, action) => {
      state.loading = true;
    },
    [loginApi.rejected]: (state, action) => {
      state.loading = false;
      alert(`${action.error.message}: ${action.payload}`);
    },
    [loginApi.fulfilled]: (state, action) => {
      const { username, email, created_at, _id, ads } = action.payload.resultObj;
      state.userInfo = { id: _id, userCreated: created_at, username, email, ads };
      state.accessToken = action.payload.accessToken;
      localStorage.setItem("access_token", action.payload.accessToken);
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem("refresh_token", action.payload.refreshToken);
      state.lgn = true;
      state.loading = false;
      console.log("AUTHSLICE CURRENTSTATE:", current(state));
    },
  },
});

export { signupApi, loginApi };

export const { logout } = authSlice.actions;

export default authSlice.reducer;
