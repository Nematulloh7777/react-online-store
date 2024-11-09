import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api', 
  baseQuery: fetchBaseQuery({ baseUrl: 'https://4b28a9fe89ec9cd5.mokky.dev' }),
  tagTypes: ['Favorites'],
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      query: (params) => ({
        url: '/items',
        params,
      }),
    }),
    getProductById: builder.query({
      query: (id) => `/items/${id}`,
    }),
    fetchFavorites: builder.query({
      query: () => `/favorites`,
      providesTags: ['Favorites'],
    }),
    addToFavorites: builder.mutation({
      query: (item) => ({
        url: `/favorites`,
        method: 'POST',
        body: item,
      }),
      invalidatesTags: ['Favorites'],
    }),
    removeFromFavorites: builder.mutation({
      query: (id) => ({
        url: `/favorites/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Favorites'],
    }),

  }),
});


export const {
  useFetchProductsQuery,
  useGetProductByIdQuery,
  useFetchFavoritesQuery,
  useAddToFavoritesMutation,
  useRemoveFromFavoritesMutation,
} = apiSlice;
