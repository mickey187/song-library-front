/** @jsxImportSource @emotion/react */
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { addSongRequest } from "../store/slices/song-slice";
import { z } from "zod";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";

function UploadMusic() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading: songLoading, error: songError, songs } = useSelector((state: RootState) => state.songs);
  const { loading: userLoading, error: userError, user } = useSelector((state: RootState) => state.user);

  const schema = z.object({
    title: z.string().min(1, "Title must be at least one character"),
    artist: z.string().min(1, "Artist must be at least one character"),
    album: z.string().optional(),
    genre: z.string().min(1, "Genre must be at least one character"),
    artwork: z.any().optional(),
  });

  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
    artwork: null,
  });
  const [errors, setErrors] = useState({
    title: null,
    artist: null,
    album: null,
    genre: null,
    artwork: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === "file" && files && files.length > 0) {
      setFormData({
        ...formData,
        artwork: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "number" ? parseFloat(value) || "" : value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const parsedData = schema.parse(formData);
      dispatch(
        addSongRequest({
          token: user?.token,
          title: parsedData.title,
          artist: parsedData.artist,
          album: parsedData.album || "",
          genre: parsedData.genre,
          artwork: formData.artwork, // This is a File object
        })
      );

      if (!songError) {
        alert("Track uploaded!")
        setFormData({
          title: "",
          artist: "",
          album: "",
          genre: "",
          artwork: null,
        });
      }
    } catch (error: any) {
      setErrors(error.formErrors.fieldErrors);
      console.error("Error submitting form", error);
    }
  };



  // Emotion styles
  const containerStyle = css`
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
  `;

  const headingStyle = css`
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
  `;

  const inputContainerStyle = css`
    margin-bottom: 15px;
  `;

  const labelStyle = css`
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #555;
  `;

  const inputStyle = css`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    box-sizing: border-box;
    margin-top: 5px;
  `;
  const buttonStyle = css`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    box-sizing: border-box;
    margin-top: 5px;
    background-color: #3b82f6;
    color: white;
  `;
  const errorTextStyle = css`
    color: red;
    font-size: 12px;
    margin-left: 5px;
  `;

  return (
    <div css={containerStyle}>
      <h1 css={headingStyle}>Upload Music</h1>
      <form onSubmit={handleSubmit}>
        <div css={inputContainerStyle}>
          <label htmlFor="title" css={labelStyle}>Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            css={inputStyle}
          />
          <small>
            {errors.title && <span css={errorTextStyle}>{errors.title}</span>}
          </small>
        </div>
        <div css={inputContainerStyle}>
          <label htmlFor="artist" css={labelStyle}>Artist:</label>
          <input
            type="text"
            name="artist"
            id="artist"
            value={formData.artist}
            onChange={handleChange}
            css={inputStyle}
          />
          <small>
            {errors.artist && <span css={errorTextStyle}>{errors.artist}</span>}
          </small>
        </div>
        <div css={inputContainerStyle}>
          <label htmlFor="album" css={labelStyle}>Album:</label>
          <input
            type="text"
            name="album"
            id="album"
            value={formData.album}
            onChange={handleChange}
            css={inputStyle}
          />
          <small>
            {errors.album && <span css={errorTextStyle}>{errors.album}</span>}
          </small>
        </div>
        <div css={inputContainerStyle}>
          <label htmlFor="genre" css={labelStyle}>Genre:</label>
          <input
            type="text"
            name="genre"
            id="genre"
            value={formData.genre}
            onChange={handleChange}
            css={inputStyle}
          />
          <small>
            {errors.genre && <span css={errorTextStyle}>{errors.genre}</span>}
          </small>
        </div>
        <div css={inputContainerStyle}>
          <label htmlFor="artwork" css={labelStyle}>Artwork:</label>
          <input
            type="file"
            name="artwork"
            id="artwork"
            onChange={handleChange}
            css={inputStyle}
          />
          <small>
            {errors.artwork && <span css={errorTextStyle}>{errors.artwork}</span>}
          </small>
        </div>
        <button css={buttonStyle} type="submit" disabled={songLoading}>
          Upload Music
        </button>
      </form>
    </div>
  );
}

export default UploadMusic;
