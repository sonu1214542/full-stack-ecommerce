import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const PaymentApi = createApi({
  reducerPath: "PaymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/payment/",
  }),
  tagTypes: ["payment"],
  endpoints: (builder) => ({
    Payment: builder.mutation({
      query: (amount) => ({
        url: "/checkout",
        method: "POST",
        body: amount,
      }),
    }),
  }),
});

export const {
 usePaymentMutation
} = PaymentApi;
