import React, { useEffect, useState } from "react";

import postLogo from "../assets/posts-logo.png";
import ImageUploader from "./ImageUploader";

const ProfilePost = ({ isUser }) => {
  const [redirect, setRedirect] = useState(false);
  const [isImageUploaderOpen, setIsImageUploaderOpen] = useState(false);

  useEffect(() => {
    setRedirect(false);
  }, []);

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
            {/* <button>Share your first photo</button> */}
            <button
              onClick={() => {
                setRedirect(false);
                setIsImageUploaderOpen(true);
              }}
            >
              Share your first photo
            </button>
            <ImageUploader
              openPicker={isImageUploaderOpen}
              makeMeFalse={setIsImageUploaderOpen}
              redirect={redirect}
              setRedirect={setRedirect}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePost;
