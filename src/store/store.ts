import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userReducer from './slices/user-slice';
import songReducer from './slices/song-slice';
import songStatReducer from './slices/stat-slice';
import userSaga from './sagas/userSaga';
import songSaga from './sagas/songSaga';
import songStatSaga from './sagas/songStatSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userReducer,
    songs: songReducer,
    songStat: songStatReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(userSaga);
sagaMiddleware.run(songSaga);
sagaMiddleware.run(songStatSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
