import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { logoutAsync } from "../store/actions/auth";
import { showAlert } from "../store/actions/alert";

const useReq = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const history = useHistory();

  const root = document.body;

  const startFetching = () => {
    setResponse(null);
    setLoading(true);
    setError(null);
  };

  const clear = () => {
    setResponse(null);
    setError(null);
  };

  const fetchedData = () => {
    setLoading(false);
    setError(null);
  };

  const requestData = (method, url, data) => {
    let config;
    if (token) {
      config = {
        method,
        url: `${process.env.REACT_APP_BACKEND_URL}/${url}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data,
      };
    } else {
      config = {
        method,
        url: `${process.env.REACT_APP_BACKEND_URL}/${url}`,
        data,
      };
    }

    startFetching();

    axios(config)
      .then((res) => {
        fetchedData();
        if (res.data.error) {
          const err = res.data.error;
          history.push(`/${err.split("/")[1]}`);
        } else {
          setResponse(res.data);
        }
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          if (err.response.status === 401) {
            dispatch(logoutAsync());
          } else if (err.response.status === 404) {
            history.push("/404");
          } else {
            // setError(err.response.data.message);
            dispatch(showAlert(err.response.data.message));
          }
        } else if (err.request) {
          // setError("Slow Network Speed. Try Again later.");
          dispatch(showAlert("Slow Network Speed. Try Again later."));
        } else {
          // setError("Oops!! Unusual error occurred");
          dispatch(showAlert("Oops!! Unusual error occurred"));
        }
      });
  };

  const alertHandler = (text, fn, disable) => {
    dispatch(showAlert(text));
    if (disable) {
      fn(false);
      root.style.overflow = "auto";
    }
  };

  return {
    loading,
    error,
    requestData,
    clear,
    response,
    setError,
    alertHandler,
  };
};

export default useReq;
