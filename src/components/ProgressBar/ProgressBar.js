import React from "react";
import "./ProgressBar.css";

const ProgressBar = () => {
  return (
    <div className="progressbar">
      <div className="progress">
        <div className="indeterminate"></div>
      </div>
    </div>
  );
};

export default ProgressBar;
