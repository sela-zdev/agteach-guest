//  https://api.agteach.site
//  http://localhost:3001

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../constants/apiConstants";

export const userApi = createApi({
  reducerPath: "userApi",
  // tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    updatePassword: builder.mutation({
      query: (passwordData) => ({
        url: "/api/users/updatePassword",
        method: "PATCH",
        body: passwordData,
      }),
      invalidatesTags: ["User"],
    }),

    updateInfo: builder.mutation({
      query: (infoData) => ({
        url: "/api/customer/updateMe",
        method: "PATCH",
        body: infoData,
      }),
      invalidatesTags: ["User"],
    }),

    getUserInfo: builder.query({
      query: () => ({
        url: "/api/customer/getMe/additionalInfo",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useUpdatePasswordMutation,
  useGetUserInfoQuery,
  useUpdateInfoMutation,
} = userApi;
