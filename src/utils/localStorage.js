import jwt_decode from "jwt-decode";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (error) {
    console.error(error);
  }
};

export const getToken = () => {
  try {
    const token = localStorage.getItem("jwtToken");
    if (token === null) {
      return undefined;
    }
    // verify token
    const decoded = jwt_decode(token);

    return token;
  } catch (error) {
    return undefined;
  }
};
