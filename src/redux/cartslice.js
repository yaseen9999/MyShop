// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartstatus: false,
  },
  reducers: {
    showcart: (state, action) => {
      state.cartstatus = action.payload;
   
    },
   hidecart: (state, action) => {
      state.cartstatus = action.payload;
    },
  },
});

export const { showcart,  hidecart} = cartSlice.actions;

export default cartSlice.reducer;
