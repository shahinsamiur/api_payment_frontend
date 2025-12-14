import { api } from "./baseQuery";

const topUserCatagoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserByCatagory: builder.query({
      query: () => ({
        url: "/top-users-category-wise/20",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserByCatagoryQuery } = topUserCatagoryApi;
