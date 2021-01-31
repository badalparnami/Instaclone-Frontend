import React from "react";

import { BackButtonIcon } from "./NewPost";

const NewPostCaption = ({
  setPage,
  setCaption,
  image,
  rotateImage,
  imageFilter,
  taggedUser,
  onSubmitHandler,
  caption,
  avatar,
}) => {
  return (
    <div className="new-post options">
      <div className="new-post__header">
        <button onClick={() => setPage("filters")} className="close back">
          <span
            style={{ display: "inline-block", transform: "rotate(270deg)" }}
          >
            <BackButtonIcon />
          </span>
        </button>
        <h3>New Post</h3>
        <button onClick={onSubmitHandler} className="next">
          Share
        </button>
      </div>
      <div className="new-post__caption">
        <div className="post-avatar">
          <img
            src={
              avatar
                ? avatar
                : `${process.env.PUBLIC_URL}/images/default-avatar.jpg`
            }
            alt="Avatar"
          />
        </div>
        <textarea
          onChange={(e) => setCaption(e.target.value)}
          autoFocus
          placeholder="Write a caption..."
          value={caption}
        ></textarea>
        <div className="post-preview">
          <img
            src={image}
            alt=""
            style={{
              transform: `rotate(${rotateImage}deg)`,
              filter: imageFilter,
            }}
          />
        </div>
      </div>
      <div className="new-post__options">
        <button className="tag-people" onClick={() => setPage("tagged")}>
          <span>Tag People</span>
          <span>
            {taggedUser.length > 0
              ? taggedUser.length === 1
                ? taggedUser[0]
                : `${taggedUser.length} people`
              : ""}
          </span>
          <span style={{ display: "inline-block", transform: "rotate(90deg)" }}>
            <BackButtonIcon />
          </span>
        </button>
        <p onClick={() => setPage("advanced")} className="advanced">
          Advanced Setting
        </p>
      </div>
    </div>
  );
};

export default NewPostCaption;
