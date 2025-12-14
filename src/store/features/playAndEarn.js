import { api } from "./baseQuery";

export const playAndEarnApi = api.injectEndpoints({
  endpoints: (builder) => ({
    playAndEarn: builder.mutation({
      query: (body) => ({
        url: "/play-and-earn/V1/spin-store",
        method: "POST",
        body,
      }),
    }),
    checkSpin: builder.query({
      query: () => ({
        url: "/play-and-earn/V1/spin-check-for-today",
        method: "GET",
      }),
      providesTags: ["playAndEarn"],
    }),
  }),
});

export const { usePlayAndEarnMutation, useCheckSpinQuery } = playAndEarnApi;
