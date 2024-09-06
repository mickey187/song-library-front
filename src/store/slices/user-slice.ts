import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: { email: string, firstName: string, lastName: string, token: string } | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

interface AuthPayload {
  email: string;
  password: string;
}

interface RegisterPayload{
  firstName:string,
  lastName: string,
  email:string,
  password: string
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerRequest: (state, action:PayloadAction<RegisterPayload>) => {
      state.loading = true;
    },
    registerSuccess: (state, action: PayloadAction<{ email: string, firstName:string, lastName:string, token:string }>) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    loginRequest: (state, action: PayloadAction<AuthPayload>) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<{ email: string, firstName:string, lastName:string, token:string }>) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const {
  registerRequest,
  registerSuccess,
  registerFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
