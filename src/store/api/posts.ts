import type { Posts } from "@/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (build) => ({
    getAllPosts: build.query<Posts, string>({
      query: () => ({
        url: "/posts",
      }),
    }),
  }),
});

export const { useGetAllPostsQuery } = postApi;
