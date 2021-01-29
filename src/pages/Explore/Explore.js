import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import "./Explore.css";

import ImageWOverlay from "../../components/ImageWOverlay";

const Explore = () => {
  const { token } = useSelector((state) => state.auth);
  const [isTokenRendered, setIsTokenRendered] = useState(false);

  useEffect(() => {
    setIsTokenRendered(true);
  }, []);

  if (!token && isTokenRendered) {
    return <Redirect to="/" />;
  } else if (!isTokenRendered) {
    return <div></div>;
  }
  return (
    <main className="explore-page profile-images">
      <ImageWOverlay />
      <ImageWOverlay />
      <ImageWOverlay />
    </main>
  );
};

export default Explore;
