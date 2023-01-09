import {createSlice} from '@reduxjs/toolkit';

export type CartState = {
  cartItems: any;
  cartTotalQuantity: number;
  cartTotalAmount: number;
};

const initialState: CartState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state: any, action) => {
      const existingIndex = state.cartItems.findIndex(
        item => item.BarCode === action.payload.BarCode,
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
        };
      } else {
        let selectedItem = {...action.payload, cartQuantity: 1};
        state.cartItems.push(selectedItem);
      }
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        item => item.BarCode === action.payload.BarCode,
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          item => item.BarCode !== action.payload.BarCode,
        );

        state.cartItems = nextCartItems;
      }
    },
    getTotals(state, action) {
      let {total, quantity} = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const {UnitPrice, cartQuantity} = cartItem;
          const itemTotal = UnitPrice * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        },
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    removeItem: (state, action) => {
      const removedItem = state.cartItems.filter(
        item => item.BarCode !== action.payload.BarCode,
      );
      state.cartItems = removedItem;
    },
    clearCart(state, action) {
      state.cartItems = [];
    },
  },
});

export default cartSlice;

export const {addToCart, decreaseCart, getTotals, removeItem, clearCart} =
  cartSlice.actions;
