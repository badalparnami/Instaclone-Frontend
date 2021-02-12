import React, { useRef } from "react";
import song from "../assets/placeholder-song.mp3";

const PlaceholderPage = () => {
  const songRef = useRef();

  const playSongHandler = () => {
    songRef.current.play();
  };

  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={playSongHandler}
      className="not-found"
    >
      <h2>Coming Soon...</h2>
      <p>
        Currently Instagram is supported on devices having width of 768px and
        above.
      </p>
      <audio ref={songRef}>
        <source src={song}></source>
      </audio>
    </div>
  );
};

export default PlaceholderPage;
