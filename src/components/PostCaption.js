import React from "react";
import { NavLink } from "react-router-dom";

import Linkify from "linkifyjs/react";
import * as linkify from "linkifyjs";
import mention from "linkifyjs/plugins/mention";
import hashtag from "linkifyjs/plugins/hashtag";

import { formatDateComments } from "../utils/date";
import { linkifyOptions } from "../utils/linkify";

mention(linkify);
hashtag(linkify);

const PostCaption = ({ isHome, username, caption, date, avatar }) => {
  return (
    <div className="post-comment">
      {!isHome && (
        <NavLink className="user-avatar" to={`/${username}`}>
          <img
            alt=" "
            draggable="false"
            src={
              avatar
                ? avatar
                : `${process.env.PUBLIC_URL}/images/default-avatar.jpg`
            }
          />
        </NavLink>
      )}
      <div className="comment-details">
        <p>
          <NavLink to={`/${username}`} className="username">
            {username}
          </NavLink>
          {/* <span>{caption}</span> */}
          <Linkify options={linkifyOptions}>{caption}</Linkify>
        </p>
        {!isHome && (
          <div className="comment-stats">
            {/* <p className="time">1d</p> */}
            <p className="time">{formatDateComments(date)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCaption;
