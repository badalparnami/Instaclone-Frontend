import React from "react";

const SearchUserCard = ({
  username,
  name,
  onClick,
  avatar,
  mention,
  tag,
  relation,
}) => {
  return (
    <div className="user-container">
      <div
        className="user-card"
        onClick={() => onClick(username, mention, tag, relation)}
      >
        <img
          src={
            avatar
              ? avatar
              : `${process.env.PUBLIC_URL}/images/default-avatar.jpg`
          }
          alt=""
        />
        <div className="user-details">
          <p className="username">{username}</p>
          <p className="name">{name}</p>
        </div>
      </div>
      <p className="divider"></p>
    </div>
  );
};

export default SearchUserCard;
