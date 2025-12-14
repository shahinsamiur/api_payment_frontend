import { api } from "./baseQuery";

const premiumApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPremiumPackages: builder.query({
      query: () => ({
        url: "/subscription-packages",
        method: "GET",
      }),
    }),
    buyPremium: builder.mutation({
      query: (data) => ({
        url: "/premium/V1/store",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["profile", "notification-count", "notifications"],
    }),
  }),
});

export const { useGetPremiumPackagesQuery, useBuyPremiumMutation } = premiumApi;
