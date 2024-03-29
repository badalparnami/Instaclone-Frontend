import React from "react";
import { NavLink } from "react-router-dom";
import ProfilePopupUserCard from "./ProfilePopupUserCard";

import defaultAvatar from "../assets/default-avatar.jpg";

const SuggestionCard = ({ avatar, username, name, relation }) => {
  return (
    <div className="suggestion-card">
      <NavLink to={`/${username}`} className="avatar">
        <img
          src={
            avatar
              ? avatar
              : // : `${process.env.PUBLIC_URL}/images/default-avatar.jpg`
                defaultAvatar
          }
          alt="Avatar"
        />
      </NavLink>
      <div className="user-details">
        <NavLink to={`/${username}`}>{username}</NavLink>
        <p>{name}</p>
      </div>
      <ProfilePopupUserCard
        isPostHeader={true}
        username={username}
        relation={relation ? relation : "Follow"}
        avatar={avatar}
      />
      {/* className = "active" || changed to 'profile-following' */}
    </div>
  );
};

export default SuggestionCard;
