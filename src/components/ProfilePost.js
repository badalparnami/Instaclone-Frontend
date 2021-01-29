import React from "react";

const ProfilePost = () => {
  return (
    <div className="profile-display">
      <div className="profile-display-posts">
        <img src="./images/posts-logo.png" height="72px" width="64px" alt="" />
        <h1>Profile</h1>
        <p>When you share photos, they will appear on your profile.</p>
        <button>Share your first photo</button>
      </div>
    </div>
  );
};

export default ProfilePost;
