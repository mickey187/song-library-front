import { call, put, takeLatest } from "redux-saga/effects";
import {
  registerSuccess,
  registerFailure,
  loginSuccess,
  loginFailure,
} from "../slices/user-slice";
import axios, { AxiosResponse } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
const baseUrl = "http://localhost:3000";

interface UserPayload {
  email: string;
  password: string;
}
interface LoginApiResponse {
  data: {
    user:{
    email: string;
    firstName: string;
    lastName: string;
    token: string;}
  };
}

// Worker Saga: Handling user registration
function* handleRegister(action: PayloadAction<UserPayload>) {
  try {
    const response: AxiosResponse<{
      email: string;
      firstName: string;
      lastName: string;
      token: string;
    }> = yield call(axios.post, `${baseUrl}/api/auth/sign-up`, action.payload);
    console.log(response);

    yield put(registerSuccess(response.data));
  } catch (error: any) {
    yield put(registerFailure(error.response.data));
  }
}

// Worker Saga: Handling user login
function* handleLogin(action: PayloadAction<UserPayload>) {
  try {
    const response: AxiosResponse<LoginApiResponse> = yield call(
      axios.post,
      `${baseUrl}/api/auth/sign-in`,
      action.payload
    );
    const data = response.data.data.user;
    yield put(loginSuccess(data));
  } catch (error: any) {
    yield put(loginFailure(error.response?.data || "Login Failed"));
  }
}

// Watcher Saga
export default function* userSaga() {
  yield takeLatest("user/registerRequest", handleRegister);
  yield takeLatest("user/loginRequest", handleLogin);
}
