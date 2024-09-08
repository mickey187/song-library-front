import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../store/slices/user-slice";
import { RootState, AppDispatch } from "../store/store";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { css } from "@emotion/css";

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

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const parsedData = schema.parse(formData);
      const authPayload: AuthPayload = {
        email: parsedData.email ?? null,
        password: parsedData.password ?? null,
      };
      dispatch(loginRequest(authPayload));
      console.log(parsedData);

    // if (isAuthenticated) {
    //     navigate('/my-library')

    // }
    } catch (error:any) {
        setErrors(error.formErrors.fieldErrors);
      //   setErrors(error.formErrors.fieldErrors);
    }
  };
  
  useEffect(()=>{
    if (isAuthenticated) {
      navigate('/my-library');
    }
  },[isAuthenticated]);
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
    margin-left: 5px;
  `;
//   const handleLogin = () => {
//     dispatch(loginRequest({ email, password }));
//   };
  return (
    <>
      <div className={`${formContainerStyle}`}>
        <form onSubmit={handleSubmit}>
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
          <small className=" text-sm ml-2 text-red-500">
            {errors.email && <span className={`${errorTextStyle}`}>{errors.email}</span>}
          </small>
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className={`${inputStyle}`}
          />
          <small className=" text-sm ml-2 text-red-500">
            {errors.password && <span className={`${errorTextStyle}`}>{errors.password}</span>}
          </small>
        </div>
        <div>
          <button type="submit" disabled={loading} className={`${buttonStyle}`}>
            Login
          </button>
        </div>
        <h4>
          Don't have an account?{" "}
          <Link to="/sign-up" className="">
            SIGNUP
          </Link>
        </h4>
        </form>
      </div>
    </>
  );
};

export default Signin;
