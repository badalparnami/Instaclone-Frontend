import React from "react";

const SearchUserCard = () => {
  return (
    <div className="user-container">
      <div className="user-card">
        <img
          src="https://res.cloudinary.com/drwb19czo/image/upload/v1598518448/aojk1xxosduzjftq0ue0.png"
          alt="Avatar"
        />
        <div className="user-details">
          <p className="username">army</p>
          <p className="name">Kuch Bhi</p>
        </div>
      </div>
      <p className="divider"></p>
    </div>
  );
};

export default SearchUserCard;
