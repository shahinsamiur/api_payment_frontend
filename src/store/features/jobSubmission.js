import { config } from "@/config";
import { api } from "./baseQuery";

export const checkTaskProfsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTaskSubmissionByJob: builder.query({
      query: ({ id, page, status }) => ({
        url: `/jobs/v1/my-jobs/${id}?paginate=${config.dataLimit}&page=${page}&status=${status}`,
        method: "GET",
      }),
      providesTags: ["getingSubmitedTaskProfs"],
    }),

    getSingleTaskById: builder.query({
      query: (id) => ({
        url: `/submissionDetails/${id}`,
        method: "GET",
      }),
    }),

    giveTips: builder.mutation({
      query: (data) => ({
        url: "/submittedjob/tips",
        method: "POST",
        body: data,
      }),
    }),

    giveRatingToWorker: builder.mutation({
      query: (data) => ({
        url: "/submittedjob/star",
        method: "POST",
        body: data,
      }),
    }),

    satisfySingleTask: builder.mutation({
      query: (data) => ({
        url: "/submittedjob/setisfiction",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getingSubmitedTaskProfs"],
    }),

    unsatisfySingleTask: builder.mutation({
      query: (data) => ({
        url: "/submittedjob/unsetisfiction",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getingSubmitedTaskProfs"],
    }),

    satisfyMultipleTask: builder.mutation({
      query: (data) => ({
        url: "/submittedjob/setisfiction/multiple",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getingSubmitedTaskProfs"],
    }),

    unSatisfyMultipleTask: builder.mutation({
      query: (data) => ({
        url: "/submittedjob/unsetisfiction/multiple",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getingSubmitedTaskProfs"],
    }),
  }),
});

export const {
  useGetSubmitedTaskByIdProfsQuery,
  useGiveTipsMutation,
  useGiveRatingToWorkerMutation,
  useGetTaskSubmissionByJobQuery,
  useGetSingleTaskByIdQuery,
  useSatisfyMultipleTaskMutation,
  useUnSatisfyMultipleTaskMutation,
  useSatisfySingleTaskMutation,
  useUnsatisfySingleTaskMutation,
} = checkTaskProfsApi;
