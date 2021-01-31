import React from "react";

const PostCaption = ({ isHome, username, caption }) => {
  return (
    <div className="post-comment">
      {!isHome && (
        <a className="user-avatar" href="">
          <img
            alt="virat.kohli's profilePicture"
            draggable="false"
            src="https://instagram.fdel11-1.fna.fbcdn.net/v/t51.2885-19/s150x150/120097897_172397281086637_5031602793879746188_n.jpg?_nc_ht=instagram.fdel11-1.fna.fbcdn.net&amp;_nc_ohc=dBwUjVtwxNUAX-1aZEw&amp;tp=1&amp;oh=c49552f8616605bbce2acd9a255560ff&amp;oe=6032E336"
          />
        </a>
      )}
      <div className="comment-details">
        <p>
          <a href="#" className="username">
            {username}
          </a>
          <span>{caption}</span>
        </p>
        {!isHome && (
          <div className="comment-stats">
            <p className="time">1d</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCaption;
