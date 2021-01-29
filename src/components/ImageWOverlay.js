import React from "react";
import { NavLink } from "react-router-dom";

const ImageWOverlay = () => {
  return (
    <NavLink to="/post/7">
      <div className="profile-image">
        <img
          className="image"
          decoding="auto"
          alt=" "
          src="https://res.cloudinary.com/drwb19czo/image/upload/w_640,h_640,c_thumb/v1608567702/a78zenflhuq0zap16nxg.png"
        />
        <div className="profile-image__overlay">
          <div className="image-overlay__content">
            <img
              src="./images/profile-overlay-heart.png"
              alt=""
              width="23"
              height="19"
              style={{ objectFit: "cover" }}
            />
            <span>0</span>
          </div>
          <div className="image-overlay__content">
            <img
              src="./images/profile-overlay-comment.png"
              width="20"
              height="25"
              alt=""
              style={{ objectFit: "cover" }}
            />
            <span>0</span>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default ImageWOverlay;
