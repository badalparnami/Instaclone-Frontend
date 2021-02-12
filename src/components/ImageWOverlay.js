import React from "react";
import { NavLink } from "react-router-dom";

import heartIcon from "../assets/profile-overlay-heart.png";
import commentIcon from "../assets/profile-overlay-comment.png";

const ImageWOverlay = ({ commentCount, likeCount, media, styles, id }) => {
  return (
    <NavLink to={`/post/${id}`}>
      <div className="profile-image">
        <img
          className="image"
          decoding="auto"
          alt=" "
          // src="https://res.cloudinary.com/drwb19czo/image/upload/w_640,h_640,c_thumb/v1608567702/a78zenflhuq0zap16nxg.png"
          src={media}
          // src="https://res.cloudinary.com/dydziegke/image/upload/w_640,h_640,c_thumb/v1612002421/ezmswvqi6xaydoja92mk.jpg"
          style={styles}
        />
        <div className="profile-image__overlay">
          <div className="image-overlay__content">
            <img
              // src={`${process.env.PUBLIC_URL}/images/profile-overlay-heart.png`}
              src={heartIcon}
              alt=""
              width="23"
              height="19"
              style={{ objectFit: "cover" }}
            />
            <span>{likeCount}</span>
          </div>
          <div className="image-overlay__content">
            <img
              // src={`${process.env.PUBLIC_URL}/images/profile-overlay-comment.png`}
              src={commentIcon}
              width="20"
              height="25"
              alt=""
              style={{ objectFit: "cover" }}
            />
            <span>{commentCount}</span>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default ImageWOverlay;
