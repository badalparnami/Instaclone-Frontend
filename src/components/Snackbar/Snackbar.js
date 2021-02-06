import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import "./Snackbar.css";

const Snackbar = () => {
  const wrapperRef = useRef();
  const { text, ticks } = useSelector((state) => state.alert);

  useEffect(() => {
    if (text !== null) {
      wrapperRef.current.classList.add("show");
      setTimeout(() => {
        wrapperRef.current.classList.remove("show");
      }, 2900);
    }
  }, [ticks]);

  return (
    <>
      <div ref={wrapperRef} id="wrapper">
        <div className="data">{text}</div>
      </div>
    </>
  );
};

export default Snackbar;
