import { config } from "@/config";
import { api } from "./baseQuery";

const paymentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDepositTransactionHistory: builder.query({
      query: ({ page, status }) => ({
        url: `/transaction-history-deposit?per_page=${config.dataLimit}&page=${page}&status=${status}`,
        method: "GET",
      }),
      providesTags: ["deposit-history"],
    }),
    getWithdrawTransactionHistory: builder.query({
      query: ({ page, status }) => ({
        url: `/transaction-history-withdraw?per_page=${config.dataLimit}&page=${page}&status=${status}`,
        method: "GET",
      }),
      providesTags: ["withdraw-history"],
    }),
    getPaymentSystems: builder.query({
      query: () => ({
        url: "/payment_systems",
        method: "GET",
      }),
      providesTags: ["payment-systems"],
    }),
    getSingleDepositPaymentSystem: builder.query({
      query: (id) => ({
        url: `/payment_systems/deposit/${id}`,
        method: "GET",
      }),
      providesTags: ["single-deposit-payment-systems"],
    }),
    getSinglePassimpayGateway: builder.query({
      query: (id) => ({
        url: `/passimpay-payment-gateways/show/${id}`,
        method: "GET",
      }),
      providesTags: ["single-passimpay-payment-systems"],
    }),
    getSingleWithdrawPaymentSystem: builder.query({
      query: (id) => ({
        url: `/payment_systems/withdraw/${id}`,
        method: "GET",
      }),
      providesTags: ["single-withdraw-payment-systems"],
    }),
    apayDeposit: builder.mutation({
      query: (data) => ({
        url: "/apay/deposit",
        method: "POST",
        body: data,
      }),
    }),
    apayWithdraw: builder.mutation({
      query: (data) => ({
        url: "/apay/withdraw",
        method: "POST",
        body: data,
      }),
    }),
    getPaymentInfo: builder.query({
      query: (token) => ({
        url: `/payment-payload?token=${token}`,
        method: "GET",
      }),
    }),
    getCurrencyConversationData: builder.query({
      query: () => ({
        url: "/currency-conversion-rate/index",
        method: "GET",
      }),
      providesTags: ["currency-conversation-data"],
    }),
    depositWithPassimpay: builder.mutation({
      query: (data) => ({
        url: "/passimpay/make-deposit",
        method: "POST",
        body: data,
      }),
    }),
    withdrawWithPassimpay: builder.mutation({
      query: (data) => ({
        url: "/passimpay/make-withdraw",
        method: "POST",
        body: data,
      }),
    }),
    getPassimpayPaymentInfo: builder.query({
      query: (id) => ({
        url: `/passimpay/deposit-info/${id}`,
        method: "GET",
      }),
      providesTags: ["passimpay-single-transaction"],
    }),
  }),
});

export const {
  useGetDepositTransactionHistoryQuery,
  useGetWithdrawTransactionHistoryQuery,
  useGetPaymentSystemsQuery,
  useGetSingleDepositPaymentSystemQuery,
  useApayDepositMutation,
  useGetPaymentInfoQuery,
  useGetCurrencyConversationDataQuery,
  useGetSingleWithdrawPaymentSystemQuery,
  useGetSinglePassimpayGatewayQuery,
  useApayWithdrawMutation,
  useDepositWithPassimpayMutation,
  useWithdrawWithPassimpayMutation,
  useGetPassimpayPaymentInfoQuery,
} = paymentApi;
