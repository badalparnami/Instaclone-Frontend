import React, { useState, useEffect } from "react";

import { BackButtonIcon } from "./NewPost";
import Loader from "../../components/Loader/Loader";
import PopupHelper from "../../components/PopupHelper";
import Search from "../Search/Search";
import useReq from "../../hooks/useReq";

import defaultAvatar from "../../assets/default-avatar.jpg";

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
  loading,
}) => {
  const { alertHandler } = useReq();
  const [mention, setMention] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    if (mention !== null) {
      setIsSearchOpen(true);
    } else {
      setIsSearchOpen(false);
    }
  }, [mention]);

  const valueHandler = (e) => {
    setCaption(e.target.value);

    let isMention = e.target.value.match(new RegExp(/@[a-zA-Z0-9]+$/));

    if (isMention) {
      setMention(isMention[0].substring(1));
    }
  };

  const selectedUser = (username, m, t, r) => {
    if (m === "everyone" || (m === "follow" && r === true)) {
      setCaption(caption.replace(mention, username));
      setMention(null);
    } else {
      alertHandler(`Can not mention ${username} as it is not allowed.`);
    }
  };

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
        <button disabled={loading} onClick={onSubmitHandler} className="next">
          Share {loading && <Loader />}
        </button>
      </div>
      <div className="new-post__caption">
        <div className="post-avatar">
          <img
            src={
              avatar
                ? avatar
                : // : `${process.env.PUBLIC_URL}/images/default-avatar.jpg`
                  defaultAvatar
            }
            alt="Avatar"
          />
        </div>
        <textarea
          onChange={valueHandler}
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
        {isSearchOpen && (
          <PopupHelper
            isPopupOpen={isSearchOpen}
            setIsPopupOpen={setIsSearchOpen}
            isProfile={true}
          >
            <Search value={mention} onClick={selectedUser} />
          </PopupHelper>
        )}
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
