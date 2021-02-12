import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  useEffect(() => {
    document.title = "Content Unavailable";
  }, []);

  return (
    <div className="not-found">
      <h2>Sorry, this page isn't available.</h2>
      <p>
        The link you followed may be broken, or the page may have been removed.
        <NavLink exact to="/">
          {" "}
          Go back to Homepage.
        </NavLink>
      </p>
    </div>
  );
};

export default NotFound;
