import axios from "axios";

const authStart = () => {
  return {
    type: "AUTH_START",
  };
};

const authSuccess = (idToken) => {
  return {
    type: "AUTH_SUCCESS",
    idToken: idToken,
  };
};

const authFail = (error) => {
  return {
    type: "AUTH_FAIL",
    error: error,
  };
};

export const clearError = () => {
  return {
    type: "CLEAR",
  };
};

const logoutStart = () => {
  return {
    type: "LOGOUT_START",
  };
};

const logoutFail = (error) => {
  return {
    type: "LOGOUT_FAIL",
    error,
  };
};

export const logoutAsync = (token) => {
  return (dispatch) => {
    dispatch(logoutStart());
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(logout());
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 401 || err.response.status === 403) {
            dispatch(logout());
          } else {
            dispatch(logoutFail(err.response.data.message));
          }
        } else if (err.request) {
          dispatch(logoutFail("Slow Network Speed. Try Again later."));
        } else {
          dispatch(logoutFail("Oops!! Unusual error occurred"));
        }
      });
  };
};

const logout = () => {
  localStorage.removeItem("token");
  return {
    type: "AUTH_LOGOUT",
  };
};

const unAuth = () => {
  return {
    type: "UNAUTH",
  };
};

export const auth = (email, password, isLogin, username, name) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      username,
      name,
    };
    let url = `${process.env.REACT_APP_BACKEND_URL}/auth/login`;
    if (!isLogin) {
      url = `${process.env.REACT_APP_BACKEND_URL}/auth/signup`;
    }
    axios
      .post(url, authData)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        dispatch(authSuccess(res.data.token));
      })
      .catch((err) => {
        if (err.response) {
          dispatch(authFail(err.response.data.message));
        } else if (err.request) {
          dispatch(authFail("Slow Network Speed. Try Again later."));
        } else {
          dispatch(authFail("Oops!! Unusual error occurred"));
        }
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    dispatch(authStart());
    const token = localStorage.getItem("token");
    if (!token) {
      // dispatch(logout());
      dispatch(unAuth());
    } else dispatch(authSuccess(token));
  };
};
