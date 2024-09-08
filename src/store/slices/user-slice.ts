import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const getUserFromLocalStorage = () => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
};


interface UserState {
  user: { email: string, firstName: string, lastName: string, token: string|undefined } | null;
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
  user: getUserFromLocalStorage(),
  loading: false,
  error: null,
  isAuthenticated: !!getUserFromLocalStorage(),
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
      localStorage.setItem('user', JSON.stringify(action.payload)); // Save to localStorage
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
      localStorage.setItem('user', JSON.stringify(action.payload)); // Save to localStorage
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user'); // Remove from localStorage on logout
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
