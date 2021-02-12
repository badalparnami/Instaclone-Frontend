import React from "react";

import savedLogo from "../assets/saved-logo.png";

const ProfileSaved = () => {
  return (
    <div className="profile-display">
      <div className="profile-display-saved">
        <img
          // src={`${process.env.PUBLIC_URL}/images/saved-logo.png`}
          src={savedLogo}
          height="72px"
          width="64px"
          alt=""
        />
        <h1>Save</h1>
        <p>
          Save photos and videos that you want to see again. No one is notified,
          and only you can see what you've saved.
        </p>
      </div>
    </div>
  );
};

export default ProfileSaved;
