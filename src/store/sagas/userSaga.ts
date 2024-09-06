import { call, put, takeLatest } from 'redux-saga/effects';
import { registerSuccess, registerFailure, loginSuccess, loginFailure } from '../slices/user-slice';
import axios, { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';

interface UserPayload {
  email: string;
  password: string;
}

// Worker Saga: Handling user registration
function* handleRegister(action: PayloadAction<UserPayload>) {
  try {
    const response: AxiosResponse<{ email: string, firstName:string, lastName:string, token:string }> = yield call(axios.post, '/api/register', action.payload);
    yield put(registerSuccess(response.data));
  } catch (error: any) {
    yield put(registerFailure(error.response.data));
  }
}

// Worker Saga: Handling user login
function* handleLogin(action: PayloadAction<UserPayload>) {
  try {
    const response: AxiosResponse<{ email: string, firstName:string, lastName:string, token:string }> = yield call(axios.post, '/api/login', action.payload);
    yield put(loginSuccess(response.data));
  } catch (error: any) {
    yield put(loginFailure(error.response.data));
  }
}

// Watcher Saga
export default function* userSaga() {
  yield takeLatest('user/registerRequest', handleRegister);
  yield takeLatest('user/loginRequest', handleLogin);
}
