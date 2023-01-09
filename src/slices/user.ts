import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    validationCode: 123456,
    verified: true,
    cart: [],
    loading: false,
    phoneToken: '',
    pushModalTitle: '',
    pushModalBody: '',
  },
  reducers: {
    verifyCode: (state, action) => {
      state.verified = true;
    },
    setGlobalLoadingTrue: (state, action) => {
      state.loading = true;
    },
    setGlobalLoadingFalse: (state, action) => {
      state.loading = false;
    },
    setPhoneToken(state, action) {
      state.phoneToken = action.payload;
    },
    setPushNotificationModal: (state, action) => {
      state.pushModalTitle = action.payload.title;
      state.pushModalBody = action.payload.body;
      console.log(state.pushModalTitle);
      console.log(state.pushModalBody);
    },
    setResetPushNotification: (state, action) => {
      state.pushModalTitle = '';
      state.pushModalBody = '';
    },
  },
  extraReducers: builder => {},
});

export default userSlice;
export const {
  verifyCode,
  setGlobalLoadingTrue,
  setGlobalLoadingFalse,
  setPhoneToken,
  setPushNotificationModal,
  setResetPushNotification,
} = userSlice.actions;
