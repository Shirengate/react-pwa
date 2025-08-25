import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { taskApi } from "./api/tasks";
import { postApi } from "./api/posts";
import { favoritePosts } from "./reducer/favorite";

export const store = configureStore({
  reducer: {
    [taskApi.reducerPath]: taskApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    favoritePosts: favoritePosts.reducer,
  },
  middleware: (fn) => {
    return fn().concat(taskApi.middleware).concat(postApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>();

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
