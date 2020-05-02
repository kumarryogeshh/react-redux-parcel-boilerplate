import jwt_decode from "jwt-decode";

import { USER_REGISTERED, USER_LOGGEDIN, GET_ERRORS } from "./types";
import { register, login } from "../../utils/api";
import setAuthToken from "../../utils/setAuthToken";

export const userRegistered = (user) => ({
  type: USER_REGISTERED,
  payload: user,
});

export const userLoggedIn = (user) => ({
  type: USER_LOGGEDIN,
  payload: user.user,
});

export const authError = (data) => ({
  type: GET_ERRORS,
  payload: data,
});

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(userLoggedIn({}));
};

export const registerUser = (userData, history) => (dispatch) =>
  register(userData)
    .then((user) => {
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
    .catch((error) => {
      dispatch(authError(error.response.data));
    });

export const loginUser = (userData) => (dispatch) =>
  login(userData)
    .then((user) => {
      if (user !== undefined && user.jwt) {
        // Get token
        const { jwt } = user;
        // Save token to ls
        localStorage.setItem("jwtToken", jwt);
        // Set token to Auth header
        setAuthToken(jwt);
        // // Decode token get user
        // const decoded = jwt_decode(jwt);

        dispatch(userLoggedIn(user));
      } else {
        if (user !== undefined && !user.jwt) {
          dispatch(authError(user));
        } else {
          dispatch(authError({ success: false, msg: "Authentication error!" }));
        }
      }
    })
    .catch((error) => {
      if (error) {
        console.error(error);

        dispatch(authError(error.response));
      }
    });
