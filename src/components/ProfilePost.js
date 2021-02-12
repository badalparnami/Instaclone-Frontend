import React from "react";

import postLogo from "../assets/posts-logo.png";

const ProfilePost = ({ isUser }) => {
  return (
    <div className="profile-display">
      <div className="profile-display-posts">
        <img
          // src={`${process.env.PUBLIC_URL}/images/posts-logo.png`}
          src={postLogo}
          height="72px"
          width="64px"
          alt=""
        />
        <h1>{!isUser ? "Profile" : "No Posts Yet"}</h1>
        {!isUser && (
          <>
            <p>When you share photos, they will appear on your profile.</p>
            <button>Share your first photo</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePost;
