import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerRequest, loginRequest } from "../store/slices/user-slice";
import { RootState, AppDispatch } from "../store/store";
const Signin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 

  const handleLogin = () => {
    dispatch(loginRequest({ email, password }));
  };
  return (
    <>
      <div>
        
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <div>
            <button onClick={handleLogin} disabled={loading}>
              Login
            </button>
          </div>
     
      </div>
    </>
  );
};

export default Signin;
