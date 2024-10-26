import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchProducts = createAsyncThunk('product/fetchProductsStatus', async (params) => {
    const { data } = await axios.get(`https://4b28a9fe89ec9cd5.mokky.dev/items`, {
        params
    })
    return data
})

const initialState = {
  items: [],
  status: 'loading',
}

const productsSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      // builder.addCase(fetchProducts.pending, (state) => {
      //     state.status = 'loading'
      // })

      builder.addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = 'success'
      })

      builder.addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message
        state.items = []
        console.error('Была ошибка:', action.error.message)
      })
      
    },
  })


export default productsSlice.reducer