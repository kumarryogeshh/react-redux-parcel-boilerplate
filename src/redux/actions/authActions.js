import jwt_decode from "jwt-decode";

import { USER_REGISTERED, USER_LOGGEDIN, GET_ERRORS } from "./types";
import { register, login } from "../../utils/api";
import setAuthToken from "../../utils/setAuthToken";

export const userRegistered = user => ({
  type: USER_REGISTERED,
  payload: user
});

export const userLoggedIn = user => ({
  type: USER_LOGGEDIN,
  payload: user
});

export const authError = data => ({
  type: GET_ERRORS,
  payload: data
});

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(userLoggedIn({}));
};

export const registerUser = (userData, history) => dispatch =>
  register(userData)
    .then(user => {
      if (user.success) {
        history.push("/dashboard");
      } else {
        if (user !== undefined && !user.success) {
          dispatch(authError(user));
        } else {
          dispatch(authError({ success: false, msg: "Registration error!" }));
        }
      }
    })
    .catch(error => {
      dispatch(authError(error.response.data));
    });

export const loginUser = userData => dispatch =>
  login(userData)
    .then(user => {
      if (user !== undefined && user.success) {
        // Get token
        const { token } = user;
        // Save token to ls
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token get user
        const decoded = jwt_decode(token);
        dispatch(userLoggedIn(decoded));
      } else {
        if (user !== undefined && !user.success) {
          dispatch(authError(user));
        } else {
          dispatch(authError({ success: false, msg: "Authentication error!" }));
        }
      }
    })
    .catch(error => {
      if (error) {
        console.log(error);

        dispatch(authError(error.response));
      }
    });
