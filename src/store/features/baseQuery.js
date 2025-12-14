import { config } from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiFormDataUrl = [
  "/update-user-profile-image",
  "/advertisement/V1/store",
  "/verifications_manual",
  "/advertisement/V1/update",
  "/jobs/store",
  "/jobs/update",
  "/promotions/pin",
  "/job-submissions",
  "/deposit-withdraw-manual",
];

const isFormDataUrl = (formDataUrl, url) => {
  return formDataUrl.some((path) => {
    const pattern = new RegExp(`^${path}(/|$)`);
    return pattern.test(url);
  });
};

const baseQueryWithAuth = async (args, api, extraOptions) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: config.apiBaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      if (!isFormDataUrl(apiFormDataUrl, args?.url)) {
        headers.set("Content-Type", "application/json");
        headers.set("Accept", "application/json");
      }
      headers.set("Accept", "application/json");

      return headers;
    },
  });

  return rawBaseQuery(args, api, extraOptions);
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  tagTypes: [
    "countries",
    "profile",
    "ads",
    "deposit-history",
    "withdraw-history",
    "notification-count",
    "notifications",
    "jobs",
    "alljobs",
    "ads-cost",
    "accepted-tasks",
    "tasks",
    "deleteJob",
    "ticket",
    "generalData",
    "playAndEarn",
    "categories",
    "costCenter",
    "blogs",
    "blogs-categories",
    "payment-systems",
    "single-deposit-payment-systems",
    "currency-conversation-data",
    "single-withdraw-payment-systems",
    "single-passimpay-payment-systems",
    "passimpay-single-transaction",
    "getingSubmitedTaskProfs",
    "single-job",
  ],
  endpoints: () => ({}),
});

const supportFormDataUrl = ["/files/upload"];

const baseQueryLiveSupport = async (args, api, extraOptions) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: config.liveSupportApiBaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      if (!isFormDataUrl(supportFormDataUrl, args?.url)) {
        headers.set("Content-Type", "application/json");
        headers.set("Accept", "application/json");
      }
      headers.set("Accept", "application/json");

      return headers;
    },
  });

  return rawBaseQuery(args, api, extraOptions);
};

export const liveSupportApi = createApi({
  reducerPath: "liveSupportApi",
  baseQuery: baseQueryLiveSupport,
  tagTypes: ["liveSupport"],
  endpoints: () => ({}),
});
