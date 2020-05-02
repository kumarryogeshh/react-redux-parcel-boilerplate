import { USER_REGISTERED, USER_LOGGEDIN } from "../actions/types";
import isEmpty from "../../utils/isEmpty";
const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_REGISTERED:
      return {
        ...state,
        user: action.payload,
      };
    case USER_LOGGEDIN:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    default:
      return state;
  }
}
