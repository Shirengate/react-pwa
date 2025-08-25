import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const favoritePosts = createSlice({
  name: "favorite",
  initialState: {
    postsId: [] as Array<number>,
  },
  reducers: {
    toggleFavorite(
      state,
      action: PayloadAction<{
        id: number;
        favorite: boolean;
      }>
    ) {
      if (action.payload.favorite) {
        state.postsId.push(action.payload.id);
      } else {
        state.postsId = state.postsId.filter((id) => id !== action.payload.id);
      }
    },
  },
});
export const { toggleFavorite } = favoritePosts.actions;
