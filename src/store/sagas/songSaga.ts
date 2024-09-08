import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchSongsSuccess,
  fetchSongsFailure,
  addSongSuccess,
  addSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
} from "../slices/song-slice";
import axios, { AxiosResponse } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";

const baseUrl = "http://localhost:3000";

function* handleFetchSongs(action: PayloadAction<{ token: string }>) {
  try {
    const { token } = action.payload;
    const response: AxiosResponse<any> = yield call(
      axios.get,
      `${baseUrl}/api/songs`,
      {
        headers: {
          Authorization: `${token}`,
          Accept: "application/json",
        },
      }
    );
    yield put(fetchSongsSuccess(response.data.data));
  } catch (error: any) {
    yield put(fetchSongsFailure(error.response.data));
  }
}

function* handleAddSong(
  action: PayloadAction<{
    token: string|undefined;
    title: string;
    artist: string;
    album: string;
    genre: string;
    artwork: File | null;
  }>
) {
  try {
    const { token, title, artist, album, genre, artwork } = action.payload;

    const data = new FormData();
    data.append("title", title);
    data.append("artist", artist);
    if (album) {
      data.append("album", album);
    }
    data.append("genre", genre);
    if (artwork) {
      data.append("artwork", artwork);
    }

    const response: AxiosResponse<any> = yield call(
      axios.post,
      `${baseUrl}/api/songs`,
      data,
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    yield put(addSongSuccess(response.data.data));
  } catch (error: any) {
    yield put(addSongFailure(error.response.data));
  }
}

function* handleEditSong(
  action: PayloadAction<{
    token: string|undefined;
    _id: string;
    title: string;
    artist: string;
    album: string;
    genre: string;
    artwork: File | null;
  }>
) {
  try {
    const { token, _id, title, artist, album, genre, artwork } = action.payload;

    const data = new FormData();
    data.append("title", title);
    data.append("artist", artist);
    if (album) {
      data.append("album", album);
    }
    data.append("genre", genre);
    if (artwork) {
      data.append("artwork", artwork);
    }

    const response: AxiosResponse<any> = yield call(
      axios.put,
      `${baseUrl}/api/songs/${_id}`,
      data,
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    yield put(addSongSuccess(response.data.data));
  } catch (error: any) {
    yield put(addSongFailure(error.response.data));
  }
}

function* handleDeleteSong(
  action: PayloadAction<{ token: string|undefined; trackId: string }>
) {
  try {
    const { token, trackId } = action.payload;

    const response: AxiosResponse<any> = yield call(
      axios.delete,
      `${baseUrl}/api/songs/${trackId}`,
      {
        headers: {
          Authorization: `${token}`,
          Accept: "application/json",
        },
      }
    );
    yield put(deleteSongSuccess(response));
  } catch (error: any) {
    yield put(deleteSongFailure(error.response.data));
  }
}

// Watcher Saga
export default function* songSaga() {
  yield takeLatest("songs/fetchSongsRequest", handleFetchSongs);
  yield takeLatest("songs/addSongRequest", handleAddSong);
  yield takeLatest("songs/editSongRequest", handleEditSong);
  yield takeLatest("songs/deleteSongRequest", handleDeleteSong);
}
