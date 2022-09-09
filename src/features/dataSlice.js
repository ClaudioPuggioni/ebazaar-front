import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axiosClient from "../apiconfig";

function priceConvert(price) {
  let numStr = price.toString();
  let count = 0;
  if (numStr.length > 3) {
    let output = "";
    let index = numStr.length - 1;
    while (index >= 0) {
      if (count === 3) {
        output = `'${output}`;
        count = 0;
      }
      output = numStr[index] + output;
      index--;
      count++;
    }
    return output;
  } else {
    return price;
  }
}

const getCategoriesApi = createAsyncThunk("dataSlice/getCategoriesApi", async (accessToken, thunkAPI) => {
  const URL = "/category";
  //   console.log("THUNKAPI:", thunkAPI);
  // const response = await axios({ loading: false, method: "GET", url: URL, headers: { Authorization: `Bearer ${accessToken}` } });
  const response = await axiosClient({ method: "GET", url: URL });
  return response.data;
});

const getListingsApi = createAsyncThunk("dataSlice/getListingsApi", async ({ accessToken }, thunkAPI) => {
  const URL = "/ads";
  const response = await axiosClient({
    method: "GET",
    url: URL,
  });
  return response.data;
});

const addListingApi = createAsyncThunk("dataSlice/addListingApi", async ({ values, accessToken }, thunkAPI) => {
  const URL = "/ads";
  const newListing = new FormData();
  Object.keys(values).forEach((key) => newListing.append(key, values[key]));
  const response = await axiosClient({
    method: "POST",
    url: URL,
    data: newListing,
    // headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "multipart/form-data" },
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
});

const getSingleAdApi = createAsyncThunk("dataSlice/getSingleAdApi", async (adId, thunkAPI) => {
  const URL = `/ads/${adId}`;
  const response = await axiosClient({
    method: "GET",
    url: URL,
  });
  return response.data;
});

const buyerInterestApi = createAsyncThunk("dataSlice/buyerInterest", async ({ adId, userId }, thunkAPI) => {
  console.log(userId);
  const URL = `/ads/${adId}/interest`;
  const response = await axiosClient({
    method: "POST",
    url: URL,
    data: { userId: userId },
  });
  return response.data;
});

const deleteAdApi = createAsyncThunk("dataSlice/deleteAdApi", async ({ adId, userId, password }, thunkAPI) => {
  console.log(adId, userId, password);
  const URL = `/ads/${adId}`;
  const response = await axiosClient({
    method: "DELETE",
    url: URL,
    data: { userId: userId, password: password },
  });
  return response.data;
});

const dataSlice = createSlice({
  name: "dataSlice",
  initialState: { loading: false, categories: false, listings: [], adSingles: {}, myListings: [] },
  reducers: {
    getMyListings: (state, action) => {
      state.myListings = state.listings.filter((ele) => ele.seller === action.payload);
      console.log("MYLISTINGS:", current(state));
    },
  },
  extraReducers: {
    // GET CATEGORIES
    [getCategoriesApi.pending]: (state, action) => {
      state.loading = true;
    },
    [getCategoriesApi.rejected]: (state, action) => {
      alert(`${action.error.code}: ${action.error.message}`);
      state.loading = false;
    },
    [getCategoriesApi.fulfilled]: (state, action) => {
      let labeledCategories = {};
      for (const obj of action.payload) {
        labeledCategories[obj._id] = obj;
      }
      console.log("LABELED:", labeledCategories);
      state.categories = labeledCategories;
      console.log("DATASLICE CURRENTSTATE:", current(state));
      state.loading = false;
    },

    // GET ALL LISTING
    [getListingsApi.pending]: (state, action) => {
      state.loading = true;
    },
    [getListingsApi.rejected]: (state, action) => {
      alert(`${action.error.code}: ${action.error.message}`);
      state.loading = false;
    },
    [getListingsApi.fulfilled]: (state, action) => {
      console.log("getListingsApi fulfilled");
      state.listings = [];
      state.listings = action.payload;
      state.listings = state.listings.map((ele) => ({
        ...ele,
        price: priceConvert(ele.price),
        interested_buyers: ele.interested_buyers.map((ele) => ele._id),
        imageUrl: ele.imageUrl.map((ele) => `https://ebazaar-back.herokuapp.com/${ele}`),
      }));
      state.listings.forEach((ele) => {
        state.categories[ele.category._id].ads = !state.categories[ele.category._id].ads
          ? { [ele._id]: ele }
          : { ...state.categories[ele.category._id].ads, [ele._id]: ele };
      });
      console.log(action.payload);
      console.log("DATASLICE CURRENTSTATE:", current(state));
      state.loading = false;
    },

    // GET SINGLE AD
    [getSingleAdApi.pending]: (state, action) => {
      state.loading = true;
    },
    [getSingleAdApi.rejected]: (state, action) => {
      alert(`${action.error.code}: ${action.error.message}`);
      state.loading = false;
    },
    [getSingleAdApi.fulfilled]: (state, action) => {
      console.log("GETSINGLEADFULFILLED", action.payload);
      state.adSingles[action.payload._id] = { ...action.payload, price: priceConvert(action.payload.price) };
      state.loading = false;
    },

    // BUYER INTEREST TOGGLE
    [buyerInterestApi.pending]: (state, action) => {
      state.loading = true;
    },
    [buyerInterestApi.rejected]: (state, action) => {
      alert(`${action.error.code}: ${action.error.message}`);
      state.loading = false;
    },
    [buyerInterestApi.fulfilled]: (state, action) => {
      console.log("RETURNED BUYERINTEREST PAYLOAD:", action.payload);
      state.listings = state.listings.map((ele) => (ele._id === action.payload._id.toString() ? action.payload : ele));

      console.log("BUYERINTEREST CURRENTSTATE:", current(state));
      state.loading = false;
    },

    // DELETE AD
    [deleteAdApi.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteAdApi.rejected]: (state, action) => {
      alert(`${action.error.code}: ${action.error.message}`);
      state.loading = false;
    },
    [deleteAdApi.fulfilled]: (state, action) => {
      console.log("deleteAdApi PAYLOAD:", action.payload);
      state.myListings = state.myListings.filter((ele) => ele._id !== action.payload.adId);
      alert("Ad Deleted Successfully");
      console.log("deleteAdApi CURRENTSTATE:", current(state));
      state.loading = false;
    },
  },
});

export { getCategoriesApi, getListingsApi, addListingApi, getSingleAdApi, buyerInterestApi, deleteAdApi };

export const { getMyListings } = dataSlice.actions;

export default dataSlice.reducer;
