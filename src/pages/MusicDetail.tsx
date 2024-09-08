/** @jsxImportSource @emotion/react */
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { RootState, AppDispatch } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { deleteSongRequest } from '../store/slices/song-slice';

const MusicDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, songs } = useSelector((state: RootState) => state.songs);
  const { loading: userLoading, error: userError, user } = useSelector((state: RootState) => state.user);
  const { trackId } = useParams<{ trackId: string }>();

  const track = songs.find(t => t._id === trackId);

  if (!track) return <p>Track not found</p>;

  const handleDelete = () => {
    dispatch(deleteSongRequest({trackId: trackId, token:user?.token}));
    if (songs) {
      alert("track deleted!");
      navigate("/my-library");

    }
  };

  // CSS Styles
  const containerStyle = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 20px;
    margin-top: 40px;
  `;

  const artworkStyle = css`
    width: 250px;
    height: 250px;
    object-fit: cover;
    border-radius: 15px;
    margin-bottom: 20px;
  `;

  const trackTitleStyle = css`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  `;

  const trackInfoStyle = css`
    font-size: 18px;
    color: #555;
    margin-bottom: 5px;
  `;

  const buttonStyle = css`
    margin-top: 20px;
    button {
      padding: 10px 20px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      background-color: #3b82f6;
      color: white;
      font-size: 16px;
      margin-right: 10px;
      &:hover {
        background-color: #2563eb;
      }
    }
  `;

  return (
    <div css={containerStyle}>
      <img css={artworkStyle} src={track.artwork} alt={track.title} />
      <h2 css={trackTitleStyle}>{track.title}</h2>
      <p css={trackInfoStyle}>Artist: {track.artist}</p>
      <p css={trackInfoStyle}>Album: {track.album}</p>

      <div css={buttonStyle}>
        <Link to={`/track/edit/${track._id}`}>
          <button>Edit</button>
        </Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default MusicDetail;
