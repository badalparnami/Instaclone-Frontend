import axios from "axios";
import { logoutAsync } from "./auth";

const getProfileDataStart = () => {
  return {
    type: "GET_PROFILE_DATA_START",
  };
};

const getProfileDataSuccess = (user) => {
  return {
    type: "GET_PROFILE_DATA_SUCCESS",
    data: { ...user },
  };
};

export const updateProfile = (updates) => {
  return {
    type: "UPDATE",
    changes: updates,
  };
};

const getProfieDataFail = () => {
  return {
    type: "GET_PROFILE_DATA_FAIL",
  };
};

export const clearError = () => {
  return {
    type: "CLEAR",
  };
};

export const getProfile = (token) => {
  return (dispatch) => {
    dispatch(getProfileDataStart());
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => dispatch(getProfileDataSuccess(res.data.user)))
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 401) {
            dispatch(logoutAsync(token));
          } else {
            dispatch(getProfieDataFail(err.response.data.message));
          }
        } else if (err.request) {
          dispatch(getProfieDataFail("Slow Network Speed. Try Again later."));
        } else {
          dispatch(getProfieDataFail("Oops!! Unusual error occurred"));
        }
      });
  };
};
