import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice'
import cart from './slices/cartSlice'
import products from './slices/productsSlice'
import drawer from './slices/drawerSlice'
import { apiSlice } from './slices/api/apiProductsSlice'

export const store = configureStore({
    reducer: {
      filter,
      cart,
      products,
      drawer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
})