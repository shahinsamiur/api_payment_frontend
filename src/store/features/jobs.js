import { config } from "@/config";
import { api } from "./baseQuery";

const jobsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: () => ({
        url: "/countries",
        method: "GET",
      }),
      providesTags: ["countries"],
    }),

    getCatagory: builder.query({
      query: () => ({
        url: "/job-categories",
        method: "GET",
      }),
      providesTags: ["countries"],
    }),

    getJobsSubCategory: builder.query({
      query: () => ({
        url: `/job-sub-categories`,
        method: "GET",
      }),
    }),

    createJob: builder.mutation({
      query: (data) => ({
        url: "/jobs/store",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["jobs"],
    }),

    findJobs: builder.query({
      query: (data) => ({
        url: `/jobs/find-jobs?paginate=${config.dataLimit}`,
        method: "POST",
        body: data,
      }),
      providesTags: ["alljobs"],
    }),

    getJobBySlug: builder.query({
      query: (id) => ({
        url: `/jobs/job/${id}`,
        method: "GET",
      }),
      providesTags: ["single-job"],
    }),

    getJobsByCategory: builder.query({
      query: () => ({
        url: `/job-categories`,
        method: "GET",
      }),
      providesTags: ["categories"],
    }),

    updateJob: builder.mutation({
      query: (data) => ({
        url: "/jobs/update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["jobs"],
    }),
    updateDaysAndWorker: builder.mutation({
      query: (data) => ({
        url: "/jobs/add-worker",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["jobs"],
    }),
    getMyJobs: builder.query({
      query: ({ page, status }) => ({
        url: `/jobs/my-jobs?paginate=${config.dataLimit}&page=${page}&status=${status}`,
        method: "GET",
      }),
      providesTags: ["jobs"],
    }),

    deleteJob: builder.mutation({
      query: (data) => ({
        url: `/jobs/destroy`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["jobs"],
    }),
    boostJob: builder.mutation({
      query: (data) => ({
        url: `/promotions/boost`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["jobs", "profile", "alljobs"],
    }),

    pinJob: builder.mutation({
      query: (data) => ({
        url: `/promotions/pin`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["jobs", "profile", "alljobs"],
    }),
    jobSubmission: builder.mutation({
      query: (data) => ({
        url: "/job-submissions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["alljobs", "tasks"],
    }),
    getcontinent: builder.query({
      query: () => ({
        url: "/country-categories",
        method: "GET",
      }),
    }),
    getcountry: builder.query({
      query: () => ({
        url: "/countries",
        method: "GET",
      }),
    }),

    playAndPauseJob: builder.mutation({
      query: (id) => ({
        url: `jobs/toggle-pause/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["alljobs", "jobs", "getingSubmitedTaskProfs"],
    }),

    reportJob: builder.mutation({
      query: (data) => ({
        url: "/reports/store/job",
        method: "POST",
        body: data,
      }),
    }),
    reportSubmission: builder.mutation({
      query: (data) => ({
        url: "/reports/store/job-submission",
        method: "POST",
        body: data,
      }),
    }),
    expiredJobExtend: builder.mutation({
      query: (data) => ({
        url: "/jobs/expired_job/extend",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["alljobs", "jobs", "getingSubmitedTaskProfs"],
    }),
    makeJobCompleted: builder.mutation({
      query: (data) => ({
        url: "/jobs/status/update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["alljobs", "jobs", "getingSubmitedTaskProfs"],
    }),
    jobImpressionAndClick: builder.mutation({
      query: ({ jobId, data }) => ({
        url: `/jobs/impression-click-count/${jobId}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetCountriesQuery,
  useCreateJobMutation,
  useGetMyJobsQuery,
  useDeleteJobMutation,
  useUpdateJobMutation,
  useGetCatagoryQuery,
  useGetJobsByCategoryQuery,
  useGetJobsSubCategoryQuery,
  useBoostJobMutation,
  usePinJobMutation,
  useFindJobsQuery,
  useJobSubmissionMutation,
  useGetcontinentQuery,
  useGetcountryQuery,
  usePlayAndPauseJobMutation,
  useReportJobMutation,
  useReportSubmissionMutation,
  useUpdateDaysAndWorkerMutation,
  useExpiredJobExtendMutation,
  useMakeJobCompletedMutation,
  useGetJobBySlugQuery,
  useJobImpressionAndClickMutation,
} = jobsApi;
