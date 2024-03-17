import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/product",
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    products: builder.query({
      query: () => "allproducts",
      providesTags: ["product"],
    }),
    categories: builder.query({
      query: () => "allcategory",
      providesTags: ["product"],
    }),
    searchProducts: builder.query({
      query: ({ category, price, search, page, sort }) => {
        let base = `allproducts?search=${search}&page=${page}`;
        if (price) {
          base += `&price=${price}`;
        }
        if (category) {
          base += `&category=${category}`;
        }
        if (sort) {
          base += `&sort=${sort}`;
        }
        return base;
      },
      providesTags: ["product"],
    }),
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/new",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useProductsQuery,
  useCategoriesQuery,
  useSearchProductsQuery,
  useCreateProductMutation,
} = productApi;
