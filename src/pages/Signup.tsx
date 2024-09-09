import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerRequest } from "../store/slices/user-slice";
import { RootState, AppDispatch } from "../store/store";
import { z } from "zod";
import { css } from "@emotion/css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";

// Zod schema for form validation
const schema = z
  .object({
    firstName: z.string().min(2, "First name must be at least two characters"),
    lastName: z.string().min(2, "Last name must be at least two characters"),
    email: z.string().email(),
    password: z
      .string()
      .min(8, "Password length must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );

  interface RegisterPayload {
    firstName: string | null | undefined;
    lastName: string | null | undefined;
    email: string | null | undefined;
    password: string | null | undefined;
  }

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null,
  });

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
      const registerPayload: RegisterPayload = {
        firstName: parsedData.firstName,
        lastName: parsedData.lastName,
        email: parsedData.email,
        password: parsedData.password,
      };
      dispatch(registerRequest(registerPayload));
      // if (isAuthenticated) {
      //   navigate("/my-library");
      // }
    } catch (error: any) {
      setErrors(error.formErrors.fieldErrors);
      console.error("Error submitting signup form", error);
    }
  };

  useEffect(()=>{
    if (isAuthenticated) {
      navigate("/my-library");
    }
  },[isAuthenticated])

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
    background-color: #28a745;
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
                id="firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className={inputStyle}
              />
              {errors.firstName && (
                <span className={errorTextStyle}>{errors.firstName}</span>
              )}
            </div>
            <div>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className={inputStyle}
              />
              {errors.lastName && (
                <span className={errorTextStyle}>{errors.lastName}</span>
              )}
            </div>
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
                id="password"
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
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className={inputStyle}
              />
              {errors.confirmPassword && (
                <span className={errorTextStyle}>
                  {errors.confirmPassword}
                </span>
              )}
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className={buttonStyle}
              >
                Sign Up
              </button>
            </div>
            <h4>
              Already have an account?{" "}
              <Link to="/sign-in">Sign In</Link>
            </h4>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
