import { call, put, takeLatest } from "redux-saga/effects";
import { 
  fetchSongStatRequest,
  fetchSongStatSuccess,
  fetchSongStatFailure
} from "../slices/stat-slice";
import axios, { AxiosResponse } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";

const baseUrl = "http://localhost:3000";

function* handleFetchSongStats(action: PayloadAction<{token: string}>) {
  const{token}= action.payload;
  try {
    const response: AxiosResponse<any> = yield call(axios.get, `${baseUrl}/api/songs/stats/all`, {
      headers: {
        Authorization: `${token}`,
        Accept: "application/json",
      },
    });
    yield put(fetchSongStatSuccess(response.data.data));
  } catch (error: any) {
    yield put(fetchSongStatFailure(error.response.data));
  }
}



// Watcher Saga
export default function* songStatSaga() {
  yield takeLatest("songStat/fetchSongStatRequest", handleFetchSongStats);

}
