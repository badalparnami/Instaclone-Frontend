import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, NavLink, useHistory } from "react-router-dom";
import "./Profile.css";

import ImageWOverlay from "../../components/ImageWOverlay";
import ProfilePost from "../../components/ProfilePost";
import ProfileSaved from "../../components/ProfileSaved";
import ProfileTagged from "../../components/ProfileTagged";
import Modal from "../../components/Modal/Modal";
import ProfileCategory from "../../components/ProfileCategory";
import ProfilePopupUserCard from "../../components/ProfilePopupUserCard";
import NavIcon from "../../components/NavIcon";
import useReq from "../../hooks/useReq";
import AvatarUploader from "../../components/AvatarUploader";

const Profile = ({ page }) => {
  const { token } = useSelector((state) => state.auth);
  const profileData = useSelector((state) => state.profile);
  const [isTokenRendered, setIsTokenRendered] = useState(false);
  const [openFollowing, setOpenFollowing] = useState(false);
  const [openFollow, setOpenFollow] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);

  const [followingUsers, setFollowingUsers] = useState([]);

  const { requestData, response } = useReq();
  const { requestData: requestDataSaved, response: responseSaved } = useReq();
  const { requestData: requestDataTagged, response: responseTagged } = useReq();

  const { savedCount, taggedPostCount } = profileData;

  const [openPicker, setOpenPicker] = useState(false);
  const [avatarOptions, setAvatarOptions] = useState(false);

  const history = useHistory();
  const root = document.body;

  useEffect(() => {
    setIsTokenRendered(true);
  }, []);

  useEffect(() => {
    if (response !== null && openFollowing) {
      setFollowingUsers(response.detail);
    }
  }, [response, openFollowing]);

  useEffect(() => {
    if (page === "saved" && savedCount > 0) {
      requestDataSaved("get", "user/details/saved");
    }
    if (page === "tagged" && taggedPostCount > 0) {
      requestDataTagged("get", "user/details/taggedPost");
    }
  }, [page, savedCount, taggedPostCount]);

  if (!token && isTokenRendered) {
    return <Redirect to="/" />;
  } else if (!isTokenRendered) {
    return <div></div>;
  }

  const openFollowingHandler = () => {
    setOpenFollowing(!openFollowing);

    if (profileData.following > 0) {
      requestData("get", "user/details/following");
    }
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
                {profileData.post && (
                  <p>
                    <span>{profileData.post.length}</span> {` posts`}
                  </p>
                )}
                <p onClick={() => setOpenFollow(!openFollow)}>
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

          {page === "post" &&
            profileData.post &&
            profileData.post.length === 0 && <ProfilePost />}
          {page === "saved" && profileData.savedCount === 0 && <ProfileSaved />}
          {page === "tagged" && profileData.taggedPostCount === 0 && (
            <ProfileTagged />
          )}

          {page === "post" && profileData.post && profileData.post.length > 0 && (
            <div className="profile-images">
              {profileData.post.map((p) => (
                <ImageWOverlay
                  commentCount={p.commentCount}
                  likeCount={p.likeCount}
                  media={
                    p.media.slice(0, 50) +
                    "w_640,h_640,c_thumb/" +
                    p.media.slice(50)
                  }
                  styles={p.styles}
                  key={p.id}
                  id={p.id}
                />
              ))}
            </div>
          )}

          {page === "saved" &&
            profileData.savedCount > 0 &&
            responseSaved &&
            responseSaved.detail &&
            responseSaved.detail.length > 0 && (
              <div className="profile-images">
                {responseSaved.detail.map((p) => (
                  <ImageWOverlay
                    commentCount={p.commentCount}
                    likeCount={p.likeCount}
                    media={
                      p.media.slice(0, 50) +
                      "w_640,h_640,c_thumb/" +
                      p.media.slice(50)
                    }
                    styles={p.styles}
                    key={p.id}
                    id={p.id}
                  />
                ))}
              </div>
            )}

          {page === "tagged" &&
            profileData.taggedPostCount > 0 &&
            responseTagged &&
            responseTagged.detail.length > 0 && (
              <div className="profile-images">
                {responseTagged.detail.map((p) => (
                  <ImageWOverlay
                    commentCount={p.commentCount}
                    likeCount={p.likeCount}
                    media={
                      p.media.slice(0, 50) +
                      "w_640,h_640,c_thumb/" +
                      p.media.slice(50)
                    }
                    styles={p.styles}
                    key={p.id}
                    id={p.id}
                  />
                ))}
              </div>
            )}

          {openFollow && profileData.follower === 0 && (
            <Modal
              onClick={setOpenFollow}
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

          {openFollowing &&
            profileData.following > 0 &&
            followingUsers.length > 0 && (
              <Modal
                onClick={setOpenFollowing}
                headingMain="Following"
                isOptions={false}
                isUser={true}
              >
                {followingUsers.map((f) => (
                  <ProfilePopupUserCard
                    name={f.name}
                    username={f.username}
                    relation={f.relation}
                    key={f.username}
                  />
                ))}
              </Modal>
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
              <button>Log Out</button>
            </Modal>
          )}
        </main>
      )}
    </>
  );
};

export default Profile;
