import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../constants/apiConstants";

export const enrollmentApi = createApi({
  reducerPath: "enrollmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    enrollment: builder.mutation({
      query: (enrollmentData) => ({
        url: "/api/enrollment/checkoutSession",
        method: "POST",
        body: enrollmentData,
      }),
    }),
    getUserEnrollments: builder.query({
      query: () => ({
        url: "/api/enrollment/getUserEnrollments",
        method: "GET",
      }),
    }),
    getCustomerEnrollments: builder.query({
      query: () => ({
        url: "/api/enrollment/getCustomerEnrollments",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useEnrollmentMutation,
  useGetUserEnrollmentsQuery,
  useGetCustomerEnrollmentsQuery,
} = enrollmentApi;
