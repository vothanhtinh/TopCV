import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // isAuthenticated: false,
  isAuthenticated: false,
  isLoading: true,
  isRefreshToken: false,
  errorRefreshToken: '',
  user: {
    email: '',
    name: '',
    phone: '',
    _id: '',
    role: '',
  },
  activeMenu: 'home',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLoginInfo: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
    setLogoutAction: (state, action) => {
      localStorage.removeItem('access_token');
      state.isAuthenticated = false;
      state.user = {
        email: '',
        phone: '',
        _id: '',
        role: '',
        name: '',
      };
    },
    setRefreshTokenAction: (state, action) => {
      state.isRefreshToken = action.payload?.status ?? false;
      state.errorRefreshToken = action.payload?.message ?? '';
    },
  },
});

export const { setUserLoginInfo, setLogoutAction, setRefreshTokenAction } =
  userSlice.actions;

export default userSlice.reducer;
