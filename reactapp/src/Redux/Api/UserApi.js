import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios"

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:4000/api/v1/user/` }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user) => ({
        url: "new",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const getUser=async(id)=>{
  try {
    const res = await axios.get(`http://localhost:4000/api/v1/user/getuser/${id}`);
    const data = res.data;
    console.log(data)
    return data;
  } catch (error) {
    console.log(error)
  }
}

export const {useLoginMutation}=userApi;
