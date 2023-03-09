import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'profile',
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.profile = action.payload;
    },
    logout: (state, action) => {
      state.profile = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.profile;

export default userSlice.reducer;
