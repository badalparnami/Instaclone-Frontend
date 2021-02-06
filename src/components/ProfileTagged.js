import React from "react";

const ProfileTagged = ({ isUser }) => {
  return (
    <div className="profile-display">
      <div className="profile-display-tagged">
        <img
          src={`${process.env.PUBLIC_URL}/images/tagged-logo.png`}
          alt=""
          height="72px"
          width="64px"
        />
        <h1>{!isUser ? "Photos of you" : "No Photos"}</h1>
        {!isUser && <p>When people tag you in photos, they'll appear here.</p>}
      </div>
    </div>
  );
};

export default ProfileTagged;
