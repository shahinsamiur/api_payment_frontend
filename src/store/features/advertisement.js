import { api } from "./baseQuery";

const advertisementApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createAd: builder.mutation({
      query: (data) => ({
        url: "/advertisement/V1/store",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ads"],
    }),
    getAds: builder.query({
      query: ({ status, page }) => ({
        url: `/advertisement/V1/search-by-status?search=${status}&page=${page}`,
        method: "GET",
      }),
      providesTags: ["ads"],
    }),
    getAdCosts: builder.query({
      query: () => ({
        url: "/ads-cost",
        method: "GET",
      }),
      providesTags: ["ads-cost"],
    }),
    updateAdvertisement: builder.mutation({
      query: ({ data, id }) => ({
        url: `/advertisement/V1/update/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ads"],
    }),
    deleteAdvertisement: builder.mutation({
      query: (id) => ({
        url: `/advertisement/V1/delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["ads"],
    }),
    updateAdsStatus: builder.mutation({
      query: ({ data, id }) => ({
        url: `/advertisement/V1/${id}/status`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ads"],
    }),
    updateAdsClickCount: builder.mutation({
      query: (id) => ({
        url: `/clickCount/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useCreateAdMutation,
  useGetAdsQuery,
  useGetAdCostsQuery,
  useUpdateAdvertisementMutation,
  useDeleteAdvertisementMutation,
  useUpdateAdsStatusMutation,
  useUpdateAdsClickCountMutation,
} = advertisementApi;
