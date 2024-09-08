/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchSongStatRequest } from "../store/slices/stat-slice";
import { css } from "@emotion/react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const containerStyle = css`
  margin: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const titleStyle = css`
  font-size: 20px;
  margin-bottom: 15px;
`;

// Chart container style for responsiveness
const chartContainerStyle = css`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const SongStats = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, stats } = useSelector((state: RootState) => state.songStat);
  console.log("stats",stats);
  
  const { loading:userLoading, error:userEror, user } = useSelector((state: RootState) => state.user);

  // Fetch song stats when the component mounts
  useEffect(() => {
    dispatch(fetchSongStatRequest({token: user?.token}));
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Data for Total Counts Pie Chart
  const totalCountsData = {
    labels: ["Total Songs", "Total Artists", "Total Albums", "Total Genres"],
    datasets: [
      {
        label: "Total Count",
        data: [
          stats?.totalSongs || 0,
          stats?.totalArtists || 0,
          stats?.totalAlbums || 0,
          stats?.totalGenres || 0
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]
      }
    ]
  };

  // Data for Songs Per Genre Bar Chart
  const songsPerGenreData = {
    labels: stats?.songsPerGenre.map(genre => genre._id) || [],
    datasets: [
      {
        label: "Songs",
        data: stats?.songsPerGenre.map(genre => genre.count) || [],
        backgroundColor: "#36A2EB"
      }
    ]
  };

  // Data for Songs and Albums Per Artist Grouped Bar Chart
  const songsAndAlbumsPerArtistData = {
    labels: stats?.songsAndAlbumsPerArtist.map(artist => artist._id) || [],
    datasets: [
      {
        label: "Songs",
        data: stats?.songsAndAlbumsPerArtist.map(artist => artist.songs) || [],
        backgroundColor: "#FF6384"
      },
      {
        label: "Albums",
        data: stats?.songsAndAlbumsPerArtist.map(artist => artist.albumCount) || [],
        backgroundColor: "#FFCE56"
      }
    ]
  };

  // Data for Songs Per Album Bar Chart
  const songsPerAlbumData = {
    labels: stats?.songsPerAlbum.map(album => album._id || "Unknown") || [],
    datasets: [
      {
        label: "Songs",
        data: stats?.songsPerAlbum.map(album => album.count) || [],
        backgroundColor: "#4BC0C0"
      }
    ]
  };

  return (
    <div css={containerStyle}>
      <h2 css={titleStyle}>Song Statistics</h2>

      {stats ? (
        <>
          {/* Total Counts Pie Chart */}
          <div css={chartContainerStyle}>
            <h3>Total Counts</h3>
            <Pie data={totalCountsData} />
          </div>

          {/* Songs Per Genre Bar Chart */}
          <div css={chartContainerStyle}>
            <h3>Songs Per Genre</h3>
            <Bar data={songsPerGenreData} />
          </div>

          {/* Songs and Albums Per Artist Grouped Bar Chart */}
          <div css={chartContainerStyle}>
            <h3>Songs and Albums Per Artist</h3>
            <Bar
              data={songsAndAlbumsPerArtistData}
              options={{
                scales: {
                  x: { stacked: false },
                  y: { beginAtZero: true }
                }
              }}
            />
          </div>

          {/* Songs Per Album Bar Chart */}
          <div css={chartContainerStyle}>
            <h3>Songs Per Album</h3>
            <Bar data={songsPerAlbumData} />
          </div>
        </>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default SongStats;
