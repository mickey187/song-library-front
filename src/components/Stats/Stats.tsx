/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';



const Stats = ({ stats }) => {
  // Emotion CSS styles
  const containerStyle = css`
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  `;

  const statSectionStyle = css`
    margin-bottom: 20px;
  `;

  const sectionTitleStyle = css`
    font-size: 20px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
  `;

  const statItemStyle = css`
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;

    &:last-child {
      border-bottom: none;
    }
  `;

  const statLabelStyle = css`
    font-weight: bold;
    color: #555;
  `;

  const statValueStyle = css`
    color: #333;
  `;

  return (
    <div css={containerStyle}>
      {/* Total Stats */}
      <div css={statSectionStyle}>
        <h3 css={sectionTitleStyle}>Overall Stats</h3>
        <div css={statItemStyle}>
          <span css={statLabelStyle}>Total Songs</span>
          <span css={statValueStyle}>{stats.totalSongs}</span>
        </div>
        <div css={statItemStyle}>
          <span css={statLabelStyle}>Total Artists</span>
          <span css={statValueStyle}>{stats.totalArtists}</span>
        </div>
        <div css={statItemStyle}>
          <span css={statLabelStyle}>Total Albums</span>
          <span css={statValueStyle}>{stats.totalAlbums}</span>
        </div>
        <div css={statItemStyle}>
          <span css={statLabelStyle}>Total Genres</span>
          <span css={statValueStyle}>{stats.totalGenres}</span>
        </div>
      </div>

      {/* Songs Per Genre */}
      <div css={statSectionStyle}>
        <h3 css={sectionTitleStyle}>Songs Per Genre</h3>
        {stats.songsPerGenre.map((genre) => (
          <div key={genre._id} css={statItemStyle}>
            <span css={statLabelStyle}>{genre._id}</span>
            <span css={statValueStyle}>{genre.count}</span>
          </div>
        ))}
      </div>

      {/* Songs and Albums Per Artist */}
      <div css={statSectionStyle}>
        <h3 css={sectionTitleStyle}>Songs and Albums Per Artist</h3>
        {stats.songsAndAlbumsPerArtist.map((artist) => (
          <div key={artist._id} css={statItemStyle}>
            <span css={statLabelStyle}>
              {artist._id} (Albums: {artist.albumCount})
            </span>
            <span css={statValueStyle}>Songs: {artist.songs}</span>
          </div>
        ))}
      </div>

      {/* Songs Per Album */}
      <div css={statSectionStyle}>
        <h3 css={sectionTitleStyle}>Songs Per Album</h3>
        {stats.songsPerAlbum.map((album, index) => (
          <div key={album._id || index} css={statItemStyle}>
            <span css={statLabelStyle}>{album._id || 'Unknown Album'}</span>
            <span css={statValueStyle}>{album.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;


