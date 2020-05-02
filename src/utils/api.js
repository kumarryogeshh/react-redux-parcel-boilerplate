import axios from "axios";
import { host } from "./constants";

// const headers = {
//   Accept: "application/json"
// };

export const login = async ({ username, password }) => {
  try {
    const res = await axios.post(`${host}/auth/local`, {
      identifier: username,
      password,
    });
    return res.data;
  } catch (err) {
    return err.response;
  }
};

export const register = async ({
  name,
  email,
  company,
  username,
  password,
}) => {
  try {
    const res = await axios.post(`${host}/users/register`, {
      name,
      email,
      company,
      username,
      password,
    });
    return res.data;
  } catch (err) {
    return err.response;
  }
};
