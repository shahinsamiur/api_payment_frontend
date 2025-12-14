import { config } from "@/config";
import { api } from "./baseQuery";

const notificationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotificationCount: builder.query({
      query: () => ({
        url: "/notifications/unread-count",
        method: "GET",
      }),
      providesTags: ["notification-count"],
    }),
    getNotification: builder.query({
      query: ({ status, page }) => ({
        url: "/notifications",
        method: "POST",
        body: {
          status: status,
          per_page: config.dataLimit,
          page: page,
        },
      }),
      providesTags: ["notifications"],
    }),
    markSingleNotificationAsRead: builder.mutation({
      query: (notificationId) => ({
        url: `/notifications/${notificationId}/read`,
        method: "POST",
      }),
      invalidatesTags: ["notifications", "notification-count"],
    }),
    markMultipleNotificationsAsRead: builder.mutation({
      query: (notificationIds) => ({
        url: "/notifications/read-multiple",
        method: "POST",
        body: {
          notification_ids: notificationIds,
        },
      }),
      invalidatesTags: ["notifications", "notification-count"],
    }),
  }),
});

export const {
  useGetNotificationCountQuery,
  useGetNotificationQuery,
  useMarkSingleNotificationAsReadMutation,
  useMarkMultipleNotificationsAsReadMutation,
} = notificationApi;
