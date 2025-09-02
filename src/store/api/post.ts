import type { Posts } from "@/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (build) => ({
    getPost: build.query<Posts, string>({
      query: (id) => ({
        url: `/posts/${id}`,
      }),
    }),
  }),
});

export const { useGetPostQuery } = postApi;
