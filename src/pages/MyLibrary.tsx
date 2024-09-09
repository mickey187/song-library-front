/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TrackListGrid from "../components/TrackList/TrackListGrid";
import { VscAdd } from "react-icons/vsc";
import { RootState, AppDispatch } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchSongsRequest } from "../store/slices/song-slice";
import { useNavigate } from "react-router-dom";

const MyLibrary = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, songs } = useSelector(
    (state: RootState) => state.songs
  );
  const { loading:userLoading, error:userError, user } = useSelector(
    (state: RootState) => state.user
  );
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState(""); // State to store the search input
  const [filteredSongs, setFilteredSongs] = useState(songs); // State to store the filtered songs

  useEffect(() => {
    console.log("token",user.token);
    
    dispatch(fetchSongsRequest({token: user?.token})); // Fetch songs on component mount
  }, [dispatch]);

  useEffect(() => {
    // Filter songs when searchQuery or songs change
    if (songs) {
      setFilteredSongs(
        songs.filter((song) => {
          // Safely check for the album field if it exists
          return (
            song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (song.album &&
              song.album.toLowerCase().includes(searchQuery.toLowerCase())) || // Check if album exists before searching
            song.genre.toLowerCase().includes(searchQuery.toLowerCase())
          );
        })
      );
    }
  }, [searchQuery, songs]);

  const navigateToUploadMusic = () => {
    navigate("/upload-music");
  };

  const searchAndAddContainer = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background-color: #f4f4f4;
  `;

  const buttonStyle = css`
    padding: 8px;
    border-radius: 15px;
    background-color: #3b82f6;
    color: white;
    width: 150px;
    margin-left: 20px;
    cursor:pointer;
  `;

  const searchInputStyle = css`
    margin: 20px;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #ddd;
    width: 100%;
    max-width: 300px;
  `;

  return (
    <>
      <div css={searchAndAddContainer}>
        <div>
          <button css={buttonStyle} onClick={navigateToUploadMusic}>
            <span>
              <VscAdd />
              Add Music
            </span>
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by title, artist, album, or genre"
          css={searchInputStyle}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
        />
      </div>

      {loading && <p>Loading songs...</p>}
      {error && <p>Error loading songs: {error.message}</p>}

      {/* Pass filteredSongs instead of songs */}
      <TrackListGrid tracks={filteredSongs} />
    </>
  );
};

export default MyLibrary;
