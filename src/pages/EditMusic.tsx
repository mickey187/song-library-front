/** @jsxImportSource @emotion/react */
import { addSongRequest, editSongRequest } from "../store/slices/song-slice";
import { z } from "zod";
import { css } from "@emotion/react";
import { useState } from "react";
import { RootState, AppDispatch } from "../store/store";
import {  useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';


function EditMusic() {
  const dispatch = useDispatch();

  const { loading, error, songs } = useSelector(
    (state: RootState) => state.songs
  );
  const { loading:userLoading, error:userError, user } = useSelector(
    (state: RootState) => state.user
  );
  const { trackId } = useParams<{ trackId: string }>(); // Get the trackId from URL params

  const track = songs.find(t => t._id === trackId);

  if (!track) return <p>Track not found</p>;
  const schema = z.object({
    title: z.string().min(1, "title be at least one character"),
    artist: z.string().min(1, "artist must be at least one character"),
    album: z.string().optional(),
    genre: z.string().min(1, "genre length must be at least one character"),
    artwork: z.any().optional(), 
   
  });

  const [formData, setFormData] = useState({
    _id: track._id,
    title: track.title,
    artist: track.artist || "",
    album: track.album || "",
    genre: track.genre || "",
    artwork: "",
  });
  const[artwork, setArtWork] = useState(null);
  const [errors, setErrors] = useState({
    title: null,
    artist: null,
    album: null,
    genre: null,
    artwork: null,
  });

  const handleChange = (e: any) => {
   const {name, value, type, files} = e.target
   if (type === "file" && files && files.length > 0) {
    setArtWork(files[0]);
  }
  

   
    setFormData({
      ...formData,
      [name]: type === "number" ? parseFloat(value) || "" : value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const parsedData = schema.parse(formData);
      
      // Dispatch only the serializable data
      dispatch(
        editSongRequest({
          token: user?.token,
          _id:  formData._id,
          title: parsedData.title,
          artist: parsedData.artist,
          album: parsedData.album || "",
          genre: parsedData.genre,
          artwork, // This is a File object
        })
      );
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
          <label htmlFor="title" css={labelStyle}>
            Title:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            css={inputStyle}
          />
          <small >
            {errors.title && (
              <span className={`${errorTextStyle}`}>{errors.title}</span>
            )}
          </small>
        </div>
        <div css={inputContainerStyle}>
          <label htmlFor="artist" css={labelStyle}>
            Artist:
          </label>
          <input
            type="text"
            name="artist"
            id="artist"
            css={inputStyle}
            value={formData.artist}
            onChange={handleChange}
          />
          <small className="">
              {errors.artist && <span className={`${errorTextStyle}`}>{errors.artist}</span>}
            </small>
        </div>
        <div css={inputContainerStyle}>
          <label htmlFor="album" css={labelStyle}>
            Album:
          </label>
          <input
            type="text"
            name="album"
            id="album"
            css={inputStyle}
            value={formData.album}
            onChange={handleChange}
          />
          <small className="">
              {errors.album && <span className={`${errorTextStyle}`}>{errors.album}</span>}
            </small>
        </div>
        <div css={inputContainerStyle}>
          <label htmlFor="genre" css={labelStyle}>
            Genre:
          </label>
          <input
            type="text"
            name="genre"
            id="genre"
            css={inputStyle}
            value={formData.genre}
            onChange={handleChange}
          />
          <small className="">
              {errors.genre && <span className={`${errorTextStyle}`}>{errors.genre}</span>}
            </small>
        </div>
        <div css={inputContainerStyle}>
          <label htmlFor="artwork" css={labelStyle}>
            Artwork:
          </label>
          <input
            type="file"
            name="artwork"
            id="artwork"
            css={inputStyle}
            value={formData.artwork}
            onChange={handleChange}
          />
          <small className="">
              {errors.artwork && <span className={`${errorTextStyle}`}>{errors.artwork}</span>}
            </small>
        </div>
        <div>
          <button css={buttonStyle} type="submit">
            Upload Music
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditMusic;
