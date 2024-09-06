import axios from "axios";
const backendUrl = import.meta.env.VITE_API_URL_LOCAL;
const userData = JSON.parse(localStorage.getItem("userData")?? '');
let apiToken = null;
if (userData && userData.token) {
   apiToken = userData.token;

}
const baseUrl = `${backendUrl}`;

export const createUserApi = async(userData: any) => {
    try {
        const response = await axios.post(`${baseUrl}/auth/register`, userData, {
          headers: {
            Accept: "application/json",
          },
        });
        return response;
      } catch (error) {
        console.error("Error creating user:", error);
        throw error;
      }
};
export const signinUserApi = async(signInData: any) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/login`, signInData, {
      headers: {
        Accept: "application/json",
      },
    });
    console.log("log in response: ", response);
    return response;
  } catch (error) {
    console.error("Error signing in user:", error);
    throw error;
  }
};
export const signoutUserApi = async(apiToken:any) => {
  try {
    console.log("apiToken: ",apiToken);
    const response = await axios.post(`${baseUrl}/auth/logout`, {}, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${apiToken}` 
      },
    });

    return response;
  } catch (error) {
    console.error("Error signing in user:", error);
    throw error;
  }
};
