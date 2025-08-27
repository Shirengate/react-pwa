import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { taskApi } from "./api/tasks";
import postSlice from "./reducer/posts";
import { favoritePosts } from "./reducer/favorite";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "favorites",
  storage,
};

const persistedFavoriteReducer = persistReducer(
  persistConfig,
  favoritePosts.reducer
);
export const store = configureStore({
  reducer: {
    [taskApi.reducerPath]: taskApi.reducer,
    posts: postSlice,
    favoritePosts: persistedFavoriteReducer,
  },
  middleware: (fn) => {
    return fn({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(taskApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>();

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
}>();
export const persister = persistStore(store);
