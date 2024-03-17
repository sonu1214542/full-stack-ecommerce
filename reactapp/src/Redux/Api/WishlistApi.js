import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

export const WishlistApi = createApi({
  reducerPath: "wishlist",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api/v1/order/" }),
  tagTypes: ["wishlist"],
  endpoints: (builder) => ({
    addToWishlist: builder.mutation({
      query: (product) => ({
        url: "addtowishlist",
        method: "POST",
        body: product,
      }),
      invalidatesTags:["wishlist"]
    }),
    getMyWishlist: builder.query({
      query: (userid) => `mywishlist?user=${userid}`,
      providesTags: ["wishlist"],
    }),
  }),
});

export const { useAddToWishlistMutation, useGetMyWishlistQuery } = WishlistApi;
