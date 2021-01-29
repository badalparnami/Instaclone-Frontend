import React, { useState } from "react";
import Modal from "../components/Modal/Modal";

const PostHeader = ({ isHome }) => {
  const [openOptions, setOpenOptions] = useState(false);

  return (
    <div className="post-header">
      <a className="user-avatar" href="">
        <img
          alt="virat.kohli's profilePicture"
          draggable="false"
          src="https://instagram.fdel11-1.fna.fbcdn.net/v/t51.2885-19/s150x150/120097897_172397281086637_5031602793879746188_n.jpg?_nc_ht=instagram.fdel11-1.fna.fbcdn.net&amp;_nc_ohc=dBwUjVtwxNUAX-1aZEw&amp;tp=1&amp;oh=c49552f8616605bbce2acd9a255560ff&amp;oe=6032E336"
        />
      </a>
      <a href="#" className="username">
        virat.kohli
      </a>
      {!isHome && (
        <>
          <span>•</span>
          <button>Follow</button>
        </>
      )}
      <div
        onClick={() => setOpenOptions(!openOptions)}
        className="post-header-options"
      >
        <svg
          aria-label="More options"
          fill="#262626"
          height="16"
          viewBox="0 0 48 48"
          width="16"
        >
          <circle
            clipRule="evenodd"
            cx="8"
            cy="24"
            fillRule="evenodd"
            r="4.5"
          ></circle>
          <circle
            clipRule="evenodd"
            cx="24"
            cy="24"
            fillRule="evenodd"
            r="4.5"
          ></circle>
          <circle
            clipRule="evenodd"
            cx="40"
            cy="24"
            fillRule="evenodd"
            r="4.5"
          ></circle>
        </svg>
      </div>
      {openOptions && (
        <Modal onClick={setOpenOptions} isUser={true} isOptions={true}>
          {/* <button className="red-option">Unfollow</button> */}
          <button>Go to post</button>
          <button>Copy Link</button>
          <button className="red-option">Delete post</button>
        </Modal>
      )}
    </div>
  );
};

export default PostHeader;
