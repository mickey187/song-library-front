/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { Link } from "react-router-dom";

const gridStyles = css`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f8f8f8;
  height: 100%; /* Set height to auto to allow scrolling if necessary */

  h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  .trackGrid {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(200px, 1fr)
    ); /* Adjusted grid for 200px images */
    gap: 20px;
    overflow-y: auto;
    height: 100%;
    padding-right: 10px;

    /* Optional: Hide scrollbar for a cleaner look (on WebKit browsers like Chrome/Safari) */
    ::-webkit-scrollbar {
      width: 6px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 10px;
    }
  }

  .track {
    background-color: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    padding: 0; /* Removed padding to eliminate space between image and card */

    img {
      width: 200px; /* Set image width to 200px */
      height: 200px; /* Set image height to 200px */
      object-fit: cover; /* Ensure the image fits without distortion */
      border-radius: 0; /* Remove any border-radius if you don't want rounded corners */
    }

    .track-info {
      margin-top: 8px;
      font-size: 0.9rem;
      color: #333;

      .track-title {
        font-weight: bold;
        margin-bottom: 5px;
      }

      .track-count {
        font-size: 0.8rem;
        color: #666;
      }
    }
  }
`;

const TrackCard = ({ artwork, title, album, artist, genre }) => {
  return (
    <div className="track">
      <img src={artwork} alt={title} />
      <div className="track-info">
        <div className="track-title">Title: {title}</div>
        <div className="track-count">Album: {album}</div>
        <div className="track-count">Artist: {artist}</div>
        <div className="track-count">Genre: {genre}</div>
      </div>
    </div>
  );
};

const TrackListGrid = ({ tracks }) => {
  console.log("tracks",tracks);
  
  return (
    <div css={gridStyles}>
      <h2>Songs</h2>
      <div className="trackGrid">
        {tracks.map((track, index) => (
          <Link to={`/track/${track._id}`}>
            
            <TrackCard
              key={track._id}
              artwork={track.artwork}
              title={track.title}
              album={track.album}
              artist={track.artist}
              genre={track.genre}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrackListGrid;
