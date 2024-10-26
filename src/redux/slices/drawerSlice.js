import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
  };
  
  const drawerSlice = createSlice({
    name: 'drawer',
    initialState,
    reducers: {
      openDrawer: (state) => {
        state.isOpen = true;
      },
      closeDrawer: (state) => {
        state.isOpen = false;
      },
      toggleDrawer: (state) => {
        state.isOpen = !state.isOpen;
      },
    },
  });
  
  export const { openDrawer, closeDrawer, toggleDrawer } = drawerSlice.actions;
  export default drawerSlice.reducer;