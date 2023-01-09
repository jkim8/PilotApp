import {configureStore} from '@reduxjs/toolkit';
import cartSlice from '../slices/cart';
import userSlice from '../slices/user';

const store = configureStore({
  reducer: {user: userSlice.reducer, cart: cartSlice.reducer},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
