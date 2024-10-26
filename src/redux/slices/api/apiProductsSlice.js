import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api', 
  baseQuery: fetchBaseQuery({ baseUrl: 'https://4b28a9fe89ec9cd5.mokky.dev' }),
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      query: (params) => ({
        url: '/items',
        params,
      }),
    }),
  }),
});


export const { useFetchProductsQuery } = apiSlice;
