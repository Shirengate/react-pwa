import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type Task, type TaskBody, type Tasks } from "@/types/types";
export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://787be8514e49ce67.mokky.dev",
  }),
  tagTypes: ["tasks"],
  endpoints: (build) => ({
    getAllTaks: build.query<Tasks, "">({
      query: () => ({
        url: "/tasks",
      }),
      providesTags: ["tasks"],
    }),
    postTask: build.mutation<Tasks, TaskBody>({
      query: (body) => ({
        url: "/tasks",
        body,
        method: "POST",
      }),
      invalidatesTags: ["tasks"],
    }),
    completeTask: build.mutation<
      Task,
      { complete: boolean; id: number; date: string }
    >({
      query: ({ id, complete, date }) => ({
        url: `/tasks/${id}`,
        body: {
          complete,
          date,
        },
      }),
    }),
  }),
});

export const {
  useGetAllTaksQuery,
  usePostTaskMutation,
  useCompleteTaskMutation,
} = taskApi;
