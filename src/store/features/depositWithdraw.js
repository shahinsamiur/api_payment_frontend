import { api } from "./baseQuery";

const depositWithdrawApi = api.injectEndpoints({
  endpoints: (builder) => ({
    depositeWithdraw: builder.mutation({
      query: (data) => ({
        url: "/deposit-withdraw-manual",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

export const { useDepositeWithdrawMutation } = depositWithdrawApi;
