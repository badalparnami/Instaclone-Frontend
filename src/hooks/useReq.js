import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { logoutAsync } from "../store/actions/auth";

const useReq = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

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
        setResponse(res.data);
        if (res.data.error) {
          setError(res.data.error);
        }
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          if (err.response.status === 401) {
            dispatch(logoutAsync());
          } else {
            setError(err.response.data.message);
          }
        } else if (err.request) {
          setError("Slow Network Speed. Try Again later.");
        } else {
          setError("Oops!! Unusual error occurred");
        }
      });
  };

  return {
    loading,
    error,
    requestData,
    clear,
    response,
    setError,
  };
};

export default useReq;
