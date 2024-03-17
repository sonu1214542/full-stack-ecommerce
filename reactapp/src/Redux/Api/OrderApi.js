import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/order/",
  }),
  tagTypes: ["order"],
  endpoints: (builder) => ({
    newOrder: builder.mutation({
      query: (order) => ({
        url: "/neworder",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["order"],
    }),
    myOrders: builder.query({
      query: (id) => `myorders?id=${id}`,
      providesTags: ["order"],
    }),
    allOrders: builder.query({
      query: ({ category,status,fromdate,todate}) => {
        let basequery=`allorders?category=${category}`
        if (fromdate) {
          basequery+=`&fromdate=${fromdate}`;
        };
        if (todate) {
          basequery+=`&todate=${todate}`
        }
        if (status) {
          basequery+=`&status=${status}`
        }
        return basequery
      },
      providesTags: ["order"],
    }),
    updateOrderStatus:builder.mutation({
      query:(orderid)=>({
        url:`updateorderstatus/${orderid}`,
        method:"PUT",
        body:orderid,
      }),
      invalidatesTags:["order"]
    })
  }),
});

export const { useNewOrderMutation, useMyOrdersQuery, useAllOrdersQuery, useUpdateOrderStatusMutation } =
  orderApi;
