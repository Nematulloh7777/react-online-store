import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sort: 'title',
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSort: (state, action) => {
      state.sort = action.payload
    }
  }
})

export const {setSort} = filterSlice.actions

export default filterSlice.reducer