import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCategories as getCategories,
  fetchPage as getPage,
  generateLink,
} from "../../services";

export const fetchCategories = createAsyncThunk(
  "mrcong/fetchCategories",
  async (_, { dispatch }) => {
    try {
      const data = await getCategories();
      return data;
    } catch (error) {
      dispatch(setErrorConnection(true));
    }
  }
);

export const fetchPage = createAsyncThunk(
  "mrcong/fetchPage",
  async ({ name, page }) => {
    try {
      const data = await getPage(name, page);
      return data;
    } catch (error) {
      dispatch(setErrorConnection(true));
    }
  }
);

export const fetchLink = createAsyncThunk(
  "mrcong/fetchLink",
  async ({ link, category, page }) => {
    try {
      const downloadLink = await generateLink(link);
      return {
        category,
        page,
        downloadLink,
        link,
      };
    } catch (error) {
      dispatch(setErrorConnection(true));
    }
  }
);

const initialState = {
  isLoading: false,
  categories: [],
  pageItems: [], // Contain all data
  errorConnection: false,
};

export const mrcongSlide = createSlice({
  name: "mrcong",
  initialState,
  reducers: {
    setErrorConnection(state, action) {
      state.errorConnection = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    });

    builder.addCase(fetchPage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.pageItems.push(...action.payload);
    });

    builder.addCase(fetchLink.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLink.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      const item = state.pageItems.find(
        (x) =>
          x.page === payload.page &&
          x.category === payload.category &&
          x.href === payload.link
      );

      if (item) {
        item.downloadLink = payload.downloadLink;
      }
    });
  },
});

// Action creators are generated for each case reducer function
export const { setErrorConnection } = mrcongSlide.actions;

export const categoriesSelector = (rootState) =>
  rootState.mrcongReducer.categories;

export const pageItemsSelector = (category, page) => (rootState) => {
  return rootState.mrcongReducer.pageItems.filter(
    (x) => x.page === page && x.category === category
  );
};

export const isLoadingSelector = (rootState) =>
  rootState.mrcongReducer.isLoading;

export const errorConnectionSelector = (rootState) =>
  rootState.mrcongReducer.errorConnection;

export default mrcongSlide.reducer;
