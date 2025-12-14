import { api } from "./baseQuery";

const verificationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    manualVarification: builder.mutation({
      query: (data) => ({
        url: "/verifications_manual",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),
    updateVerificationType: builder.mutation({
      query: (data) => ({
        url: "/updateVerificationType",
        method: "POST",
        body: data,
      }),
    }),
    instansVerification: builder.mutation({
      query: () => ({
        url: "/verifications_instant",
        method: "POST",
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

export const {
  useManualVarificationMutation,
  useInstansVerificationMutation,
  useUpdateVerificationTypeMutation,
} = verificationsApi;
