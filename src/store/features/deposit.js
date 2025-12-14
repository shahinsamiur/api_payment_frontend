import { api } from "./baseQuery";

export const depositApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getmanualPaymentMethods: builder.query({
      query: (type) => ({
        url: `/available-payment-methods?type=${type}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetmanualPaymentMethodsQuery } = depositApi;
