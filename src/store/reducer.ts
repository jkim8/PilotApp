import {combineReducers} from '@reduxjs/toolkit';
import cartSlice from '../slices/cart';
import userSlice from '../slices/user';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  cart: cartSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
