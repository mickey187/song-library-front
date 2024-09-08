import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerRequest } from "../store/slices/user-slice";
import { RootState, AppDispatch } from "../store/store";
import { z } from "zod";
import { css } from "@emotion/css";
import { useNavigate } from "react-router-dom";

const schema = z
  .object({
    firstName: z.string().min(2, "first name must be at least two characters"),
    lastName: z.string().min(2, "last name must be at least two characters"),
    email: z.string().email(),
    password: z
      .string()
      .min(8, "password length must be at least 8 characters"),
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
  interface RegisterPayload{
    firstName: string|null|undefined,
    lastName: string|null|undefined,
    email: string|null|undefined,
    password: string|null|undefined,
    
  }

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({  firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null,});

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
      console.log("Form submitted:", parsedData);
      const registerPayload:RegisterPayload = {
        firstName: parsedData.firstName,
        lastName: parsedData.lastName,
        email: parsedData.email,
        password: parsedData.password,
      }
      dispatch(registerRequest(registerPayload));
      if (isAuthenticated) {
        navigate("/my-library");
      }
 
  
    } catch (error:any) {
      setErrors(error.formErrors.fieldErrors);
      console.error("error submitting signup form ", error);
    }
  };

    // Emotion styles
    const formContainerStyle = css`
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
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
    margin-left: 5px;
  `;

//   const handleRegister = () => {
//     dispatch(registerRequest({ email, password }));
//   };
  return (
    <>
      <div className={`${formContainerStyle}`}>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className={`${inputStyle}`}
            />
            <small className="">
              {errors.firstName && <span className={`${errorTextStyle}`}>{errors.firstName}</span>}
            </small>
          </div>
          <div>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className={`${inputStyle}`}
            />
            <small className="">
              {errors.lastName && <span className={`${errorTextStyle}`}>{errors.lastName}</span>}
            </small>
          </div>
          <div>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={`${inputStyle}`}
            />
            <small className="">
              {errors.email && <span className={`${errorTextStyle}`}>{errors.email}</span>}
            </small>
          </div>

          <div>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className={`${inputStyle}`}
            />
            <small className="">
              {errors.password && <span className={`${errorTextStyle}`}>{errors.password}</span>}
            </small>
          </div>

          <div>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className={`${inputStyle}`}
            />
            <small className="">
              {errors.confirmPassword && <span className={`${errorTextStyle}`}>{errors.confirmPassword}</span>}
            </small>
          </div>
          <div>
            <button type="submit" disabled={loading} className={`${buttonStyle}`}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
