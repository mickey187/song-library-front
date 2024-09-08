import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Song {
  _id: string | null;
  title: string | null;
  artist: string | null;
  album: string | null;
  genre: string | null;
  artwork: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

interface SongList {
  songs: Song[];
  loading: boolean;
  error: any;
}

const initialState: SongList = {
  songs: [],
  loading: false,
  error: null,
};

const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongsRequest: (state, payload: PayloadAction<{token:string}>) => {
      state.loading = true;
    },
    fetchSongsSuccess: (state, action: PayloadAction<Song[]>) => {
      state.loading = false;
      state.songs = action.payload;
    },
    fetchSongsFailure: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addSongRequest: (state, action: PayloadAction<{ token:string, title: string; artist: string; album: string; genre: string; artwork: File | null }>) => {
      state.loading = true;
    },
    addSongSuccess: (state, action: PayloadAction<Song>) => {
      state.loading = false;
      state.songs.push(action.payload);
    },
    addSongFailure: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
    editSongRequest: (state, action: PayloadAction<{ token: string|undefined, _id: string, title: string; artist: string; album: string; genre: string; artwork: File | null }>) => {
      state.loading = true;
    },
    editSongSuccess: (state, action: PayloadAction<Song>) => {
      state.loading = false;
      state.songs.push(action.payload);
    },
    editSongFailure: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSongRequest: (state, action: PayloadAction<any>) => {
      state.loading = true;
    },
    deleteSongSuccess: (state, action: PayloadAction<any>) => {
      console.log("ction.payload._id", action.payload.trackId);
      
      state.loading = false;
      state.songs = state.songs.filter(song => song._id !== action.payload._id);
    },
    
    deleteSongFailure: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSongRequest,
  addSongSuccess,
  addSongFailure,
  editSongRequest,
  editSongSuccess,
  editSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure
} = songSlice.actions;

export default songSlice.reducer;
