import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SongStatsData {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
  songsPerGenre: any[]; // Specify proper types here if needed
  songsAndAlbumsPerArtist: any[]; // Specify proper types here if needed
  songsPerAlbum: any[]; // Specify proper types here if needed
}

interface SongStatsState {
  stats: SongStatsData | null;
  loading: boolean;
  error: string | null;
}

const initialState: SongStatsState = {
  stats: {
    totalSongs: 0,
    totalArtists: 0,
    totalAlbums: 0,
    totalGenres: 0,
    songsPerGenre: [],
    songsAndAlbumsPerArtist: [],
    songsPerAlbum: [],
  },
  loading: false,
  error: null,
};

const songStatSlice = createSlice({
  name: "songStat",
  initialState,
  reducers: {
    fetchSongStatRequest: (state, payload: PayloadAction<{token:string}>) => {
      state.loading = true;
    },
    fetchSongStatSuccess: (state, action: PayloadAction<SongStatsData>) => {
      state.loading = false;
      state.stats = action.payload; // Update all stats under the `stats` property
    },
    fetchSongStatFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSongStatRequest,
  fetchSongStatSuccess,
  fetchSongStatFailure,
} = songStatSlice.actions;

export default songStatSlice.reducer;
