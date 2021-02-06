import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import "./Profile.css";

import ProfilePost from "../../components/ProfilePost";
import ProfileSaved from "../../components/ProfileSaved";
import ProfileTagged from "../../components/ProfileTagged";
import Modal from "../../components/Modal/Modal";
import ProfileCategory from "../../components/ProfileCategory";
import NavIcon from "../../components/NavIcon";
import AvatarUploader from "../../components/AvatarUploader";
import InfiniteData from "../../components/InfiniteData";
import InfiniteData2 from "../../components/InfiniteData2";
import { logoutAsync } from "../../store/actions/auth";

const Profile = ({ page }) => {
  const { token } = useSelector((state) => state.auth);
  const profileData = useSelector((state) => state.profile);
  const [openFollowing, setOpenFollowing] = useState(false);
  const [openFollower, setOpenFollower] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);

  const [openPicker, setOpenPicker] = useState(false);
  const [avatarOptions, setAvatarOptions] = useState(false);

  const history = useHistory();
  const root = document.body;
  const dispatch = useDispatch();

  const openFollowingHandler = () => {
    setOpenFollowing(!openFollowing);
  };

  const openFollowerHandler = () => {
    setOpenFollower(!openFollower);
  };

  const logOutHandler = () => {
    dispatch(logoutAsync(token));
  };

  return (
    <>
      {profileData && (
        <main className="profile-page">
          <div className="profile-header">
            <img
              src={
                profileData.avatar
                  ? profileData.avatar
                  : `${process.env.PUBLIC_URL}/images/default-avatar.jpg`
              }
              alt="Avatar"
              onClick={() =>
                profileData.avatar
                  ? setAvatarOptions(true)
                  : setOpenPicker(true)
              }
            />
            <AvatarUploader
              openPicker={openPicker}
              makeMeFalse={setOpenPicker}
              avatarOptions={avatarOptions}
              setAvatarOptions={setAvatarOptions}
            />
            <div className="profile-header__details">
              <div className="profile-1">
                <h1>{profileData.username}</h1>
                <NavLink to="/accounts/edit">
                  <button>Edit Profile</button>
                </NavLink>

                {/* <button className="profile-follow">Follow</button>  */}

                {/* <button className="profile-following">
              <span></span>
            </button>  */}
                <div
                  onClick={() => {
                    setOpenOptions(!openOptions);
                  }}
                  className="options-icon"
                  style={{ cursor: "pointer" }}
                >
                  <NavIcon ariaLabel="Options" height={24} width={24} />
                </div>
              </div>
              <div className="profile-2">
                <p>
                  <span>{profileData.postCount}</span> {` posts`}
                </p>
                <p onClick={openFollowerHandler}>
                  <span>{profileData.follower} </span> {` followers`}
                </p>
                <p onClick={openFollowingHandler}>
                  <span>{profileData.following}</span>
                  {` following`}
                </p>
              </div>
              <div className="profile-3">
                <p>{profileData.name}</p>
                {profileData.bio && <span>{profileData.bio}</span>}
                {profileData.website && (
                  <a
                    href={profileData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {profileData.website}
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="profile-categories">
            <ProfileCategory to="/profile" ariaLabel="Posts" />
            <ProfileCategory to="/profile/saved" ariaLabel="Saved" />
            <ProfileCategory to="/profile/tagged" ariaLabel="Tagged" />
          </div>

          {page === "saved" && profileData.savedCount === 0 && <ProfileSaved />}

          {page === "post" && (
            <InfiniteData detail="post">
              <ProfilePost />
            </InfiniteData>
          )}

          {page === "tagged" && (
            <InfiniteData detail="taggedPost">
              <ProfileTagged />
            </InfiniteData>
          )}

          {page === "saved" && profileData.savedCount >= 0 && (
            <InfiniteData detail="saved">
              <ProfileTagged />
            </InfiniteData>
          )}

          {openFollower && profileData.follower === 0 && (
            <Modal
              onClick={setOpenFollower}
              headingMain="Followers"
              headingSub="Followers"
              content="You'll see all the people who follow you here."
              isUser={false}
            />
          )}

          {openFollowing && profileData.following === 0 && (
            <Modal
              onClick={setOpenFollowing}
              headingMain="Following"
              headingSub="People you follow"
              content="Once you follow people, you'll see them here."
              isUser={false}
            />
          )}

          {openFollower && profileData.follower > 0 && (
            <InfiniteData2
              detail="follower"
              onClickFn={setOpenFollower}
              headingMain="Followers"
            />
          )}

          {openFollowing && profileData.following > 0 && (
            <InfiniteData2
              detail="following"
              onClickFn={setOpenFollowing}
              headingMain="Following"
            />
          )}

          {openOptions && (
            <Modal onClick={setOpenOptions} isUser={true} isOptions={true}>
              <button
                onClick={() => {
                  root.style.overflow = "auto";
                  history.push("/accounts/password/change");
                }}
              >
                Change Password
              </button>
              <button
                onClick={() => {
                  root.style.overflow = "auto";
                  history.push("/accounts/privacy_and_security");
                }}
              >
                Privacy and Security
              </button>
              <button
                onClick={() => {
                  root.style.overflow = "auto";
                  logOutHandler();
                }}
              >
                Log Out
              </button>
            </Modal>
          )}
        </main>
      )}
    </>
  );
};

export default Profile;
