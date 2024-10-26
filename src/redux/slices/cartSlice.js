import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const createOrder = createAsyncThunk(
  'product/createOrderStatus', 
  async (_, { getState }) => {
    const state = getState().cart;
    const { data } = await axios.post(`https://4b28a9fe89ec9cd5.mokky.dev/orders`, {
      items: state.items,
      totalPrice: state.totalPrice,
    });
    return data.id
})

const saveToLocalStorage = (state) => {
  localStorage.setItem('cartItems', JSON.stringify(state.items));
  localStorage.setItem('totalPrice', JSON.stringify(state.totalPrice));
};

const initialState = {
  items: JSON.parse(localStorage.getItem('cartItems')) || [],
  totalPrice: JSON.parse(localStorage.getItem('totalPrice')) || 0,
  orderId: null,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action) {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (!existingItem) {
        state.items.push(action.payload);
      }

      state.totalPrice = state.items.reduce((sum, item) => sum + item.price, 0);

      saveToLocalStorage(state);
    },
    removeProduct(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload.id)

      state.totalPrice = state.items.reduce((sum, item) => sum + item.price, 0)

      saveToLocalStorage(state)
    },
    clearCart(state) {
      state.items  = []
      state.totalPrice = 0
      saveToLocalStorage(state)
    },
    clickOrderId(state, action) {
      state.orderId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.items = []
      state.totalPrice = 0
      state.orderId = action.payload
      saveToLocalStorage(state)
    });
  }
})

export const {addProduct, removeProduct, clearCart, clickOrderId} = cartSlice.actions

export default cartSlice.reducer