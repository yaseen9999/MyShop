// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    filterproducts: [],
  },
  reducers: {
    setfilterproducts: (state, action) => {
      state.filterproducts = action.payload;
   
    },
   
  },
});

export const { setfilterproducts} = filterSlice.actions;

export default filterSlice.reducer;
