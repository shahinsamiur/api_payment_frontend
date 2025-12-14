import {
  setAdvertisement,
  setCostCenter,
  setGeneralData,
} from "../slices/settings";
import { api } from "./baseQuery";

const generalApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGeneralData: builder.query({
      query: () => ({
        url: "/general-data",
        method: "GET",
      }),
      providesTags: ["generalData"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAdvertisement(data?.advertisements));
          dispatch(setGeneralData(data));
        } catch (error) {
          console.error("Register mutation error:", error);
        }
      },
    }),
    homeJobs: builder.query({
      query: () => ({
        url: "/home/jobs",
        method: "GET",
      }),
    }),

    getAllCost: builder.query({
      query: () => ({
        url: "/cost/center",
        method: "GET",
      }),
      providesTags: ["costCenter"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCostCenter(data.data));
        } catch (error) {
          console.error("Register mutation error:", error);
        }
      },
    }),

    submitEmailForNewsLetter: builder.mutation({
      query: (data) => ({
        url: "/subscribe-newsletter",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetGeneralDataQuery,
  useHomeJobsQuery,
  useGetAllCostQuery,
  useSubmitEmailForNewsLetterMutation,
} = generalApi;
