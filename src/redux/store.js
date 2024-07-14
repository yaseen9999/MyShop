// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userslice';
import cartReducer from './cartslice';
import filterReducer from './filterslice';
const store = configureStore({
  reducer: {
    user: userReducer,
   cart: cartReducer,
   filter:filterReducer,
  },
});

export default store;
