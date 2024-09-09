import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../store/slices/user-slice";
import { RootState, AppDispatch } from "../store/store";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { css } from "@emotion/css";
import logo from "../assets/img/logo.png";

// Validation schema using Zod
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Please enter your password"),
});

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );
  interface AuthPayload {
    email: string | null | undefined;
    password: string | null | undefined;
  }
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({ email: null, password: null });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const parsedData = schema.parse(formData);
      const authPayload: AuthPayload = {
        email: parsedData.email ?? null,
        password: parsedData.password ?? null,
      };
      dispatch(loginRequest(authPayload));
    } catch (error: any) {
      setErrors(error.formErrors.fieldErrors);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/my-library");
    }
  }, [isAuthenticated]);

  // Emotion styles
  const pageContainerStyle = css`
    display: flex;
    height: 100vh;
  `;

  const leftSectionStyle = css`
  background-color: #0a1d4d;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const logoContainerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const imgStyle = css`
  max-width: 40%; /* Adjust this value as needed */
  height: auto;
`;

  const rightSectionStyle = css`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const formContainerStyle = css`
    width: 80%;
    max-width: 400px;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  `;

  const inputStyle = css`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    box-sizing: border-box;
  `;

  const buttonStyle = css`
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    &:disabled {
      background-color: #999;
    }
  `;

  const errorTextStyle = css`
    color: red;
    font-size: 12px;
  `;

  return (
    <div className={pageContainerStyle}>
      {/* Left Section with Logo */}
      <div className={leftSectionStyle}>
        <div className={logoContainerStyle}>
          <img src={logo} className={`${imgStyle}`} alt="My Tunes Logo" />
        </div>
      </div>

      {/* Right Section with Form */}
      <div className={rightSectionStyle}>
        <div className={formContainerStyle}>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={inputStyle}
              />
              {errors.email && (
                <span className={errorTextStyle}>{errors.email}</span>
              )}
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={inputStyle}
              />
              {errors.password && (
                <span className={errorTextStyle}>{errors.password}</span>
              )}
            </div>
            <div>
              <button type="submit" disabled={loading} className={buttonStyle}>
                Login
              </button>
            </div>
            <h4>
              Don't have an account? <Link to="/sign-up">Sign up</Link>
            </h4>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
