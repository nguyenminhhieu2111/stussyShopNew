import { publicRequest } from "../src/RequestMethod"
import { loginFailure, loginStart, loginSuccess } from "./UserRedux"

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
      const res = await publicRequest.post("/auth/login", user);
      dispatch(loginSuccess(res.data));
    } catch (err) {
      dispatch(loginFailure());
    }
  };
  export const registers = async (user, dispatch) => {
    dispatch(addUserStart());
    try {
      const res = await userRequest.post(`/auth/register`, user);
      dispatch(addUserSuccess(res.data));
    } catch (err) {
      dispatch(addUserFailure());
    }
  };