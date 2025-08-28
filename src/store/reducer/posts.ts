import type { Posts } from "@/types/types";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { type RootState } from "../store";

export const getPosts = createAsyncThunk<Posts, void, { state: RootState }>(
  "post/getPosts",
  async (_, { rejectWithValue }) => {
    try {
      const data = await axios.get<Posts>(
        `https://jsonplaceholder.typicode.com/posts?page=1&_limit=10`
      );
      if (data.status < 200 && data.status >= 300) {
        throw new Error(String(data.status));
      }
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addPosts = createAsyncThunk<Posts, void, { state: RootState }>(
  "post/addPosts",
  async (_, { getState, rejectWithValue }) => {
    const state = getState().posts;
    if (state.data.length >= 100) {
      // Используем rejectWithValue для передачи конкретной ошибки
      return rejectWithValue("limit");
    }
    const page = state.currentPage + 1;
    try {
      const data = await axios.get<Posts>(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
      );
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface PostState {
  data: Posts;
  fetchLoading: boolean;
  fetchError: string | boolean;
  loading: boolean;
  hasMore: boolean;
  moreError: string | boolean;
  currentPage: number;
}

const initialState: PostState = {
  data: [] as Posts,
  fetchLoading: false,
  fetchError: false,
  loading: false,
  hasMore: true,
  moreError: false,
  currentPage: 1,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    updatePage(state) {
      state.currentPage += 1;
    },
    cancelPage(state) {
      state.currentPage -= 1;
    },
    // Добавляем редюсер для сброса ошибки limit
    resetMoreError(state) {
      state.moreError = false;
    },
    setOfflineData(state, action) {
      state.data = action.payload;
      state.hasMore = false;
      state.loading = false;
      state.fetchLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getPosts.fulfilled,
      (state, action: PayloadAction<Posts>) => {
        state.fetchError = false;
        state.data.push(...action.payload);
        state.fetchLoading = false;
      }
    );
    builder.addCase(getPosts.pending, (state) => {
      state.fetchError = false;
      state.fetchLoading = true;
    });
    builder.addCase(
      getPosts.rejected,
      (state, action: PayloadAction<unknown>) => {
        if (action.payload instanceof AxiosError) {
          if (action.payload.code) {
            state.fetchError = action.payload.code;
          } else {
            state.fetchError = true;
          }
        } else if (action.payload instanceof Error) {
          state.fetchError = action.payload.message;
        } else {
          state.fetchError = true;
        }
      }
    );
    builder.addCase(addPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.moreError = false;
      state.data.push(...action.payload);
      state.currentPage += 1;
      if (action.payload.length < 10) {
        state.hasMore = false;
      }
    });
    builder.addCase(addPosts.rejected, (state, action) => {
      state.loading = false;

      if (action.payload === "limit") {
        state.moreError = "limit";
        state.hasMore = false;
      } else if (action.payload instanceof AxiosError) {
        if (action.payload.code) {
          state.moreError = action.payload.code;
        } else {
          state.moreError = true;
        }
      } else if (action.payload instanceof Error) {
        state.moreError = action.payload.message;
      } else {
        state.moreError = true;
      }
    });
    builder.addCase(addPosts.pending, (state) => {
      state.moreError = false;
      state.loading = true;
    });
  },
});

export const { updatePage, cancelPage, resetMoreError, setOfflineData } =
  postSlice.actions;
export default postSlice.reducer;
