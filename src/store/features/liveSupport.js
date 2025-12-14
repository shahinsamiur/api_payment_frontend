import { liveSupportApi } from "./baseQuery";

const supportApi = liveSupportApi.injectEndpoints({
  endpoints: (builder) => ({
    getMessage: builder.query({
      query: (id) => `/live-chat/conversation_by_user_id/${id}`,
      providesTags: ["liveSupport"],
      keepUnusedDataFor: 0,
    }),
    saveSupportFile: builder.mutation({
      query: (data) => ({
        url: "/files/upload",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetMessageQuery, useSaveSupportFileMutation } = supportApi;
