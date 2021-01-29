import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import "./Profile.css";
import axios from "axios";

import ImageWOverlay from "../../components/ImageWOverlay";
import ProfilePost from "../../components/ProfilePost";
import ProfileSaved from "../../components/ProfileSaved";
import ProfileTagged from "../../components/ProfileTagged";
import Modal from "../../components/Modal/Modal";
import ProfileCategory from "../../components/ProfileCategory";
import ProfilePopupUserCard from "../../components/ProfilePopupUserCard";

const Profile = ({ page }) => {
  const { token } = useSelector((state) => state.auth);
  const profileData = useSelector((state) => state.profile);
  const [isTokenRendered, setIsTokenRendered] = useState(false);
  const [openFollowing, setOpenFollowing] = useState(false);
  const [openFollow, setOpenFollow] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);

  const [followingUsers, setFollowingUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsTokenRendered(true);
  }, []);

  if (!token && isTokenRendered) {
    return <Redirect to="/" />;
  } else if (!isTokenRendered) {
    return <div></div>;
  }

  const openFollowingHandler = () => {
    setOpenFollowing(!openFollowing);

    if (profileData.following > 0) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/user/details/following`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setFollowingUsers(res.data.detail))
        .catch((err) => {
          if (err.response) {
            setError(err.response.data.message);
          } else if (err.request) {
            setError("Slow Network Speed. Try Again later.");
          } else {
            setError("Oops!! Unusual error occurred");
          }
        });
    }
  };
  return (
    <main className="profile-page">
      <div className="profile-header">
        <img src="./images/default-avatar.jpg" alt="Avatar" />
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
              <svg
                aria-label="Options"
                className="_8-yf5"
                fill="#262626"
                height="24"
                viewBox="0 0 48 48"
                width="24"
              >
                <path
                  clipRule="evenodd"
                  d="M46.7 20.6l-2.1-1.1c-.4-.2-.7-.5-.8-1-.5-1.6-1.1-3.2-1.9-4.7-.2-.4-.3-.8-.1-1.2l.8-2.3c.2-.5 0-1.1-.4-1.5l-2.9-2.9c-.4-.4-1-.5-1.5-.4l-2.3.8c-.4.1-.8.1-1.2-.1-1.4-.8-3-1.5-4.6-1.9-.4-.1-.8-.4-1-.8l-1.1-2.2c-.3-.5-.8-.8-1.3-.8h-4.1c-.6 0-1.1.3-1.3.8l-1.1 2.2c-.2.4-.5.7-1 .8-1.6.5-3.2 1.1-4.6 1.9-.4.2-.8.3-1.2.1l-2.3-.8c-.5-.2-1.1 0-1.5.4L5.9 8.8c-.4.4-.5 1-.4 1.5l.8 2.3c.1.4.1.8-.1 1.2-.8 1.5-1.5 3-1.9 4.7-.1.4-.4.8-.8 1l-2.1 1.1c-.5.3-.8.8-.8 1.3V26c0 .6.3 1.1.8 1.3l2.1 1.1c.4.2.7.5.8 1 .5 1.6 1.1 3.2 1.9 4.7.2.4.3.8.1 1.2l-.8 2.3c-.2.5 0 1.1.4 1.5L8.8 42c.4.4 1 .5 1.5.4l2.3-.8c.4-.1.8-.1 1.2.1 1.4.8 3 1.5 4.6 1.9.4.1.8.4 1 .8l1.1 2.2c.3.5.8.8 1.3.8h4.1c.6 0 1.1-.3 1.3-.8l1.1-2.2c.2-.4.5-.7 1-.8 1.6-.5 3.2-1.1 4.6-1.9.4-.2.8-.3 1.2-.1l2.3.8c.5.2 1.1 0 1.5-.4l2.9-2.9c.4-.4.5-1 .4-1.5l-.8-2.3c-.1-.4-.1-.8.1-1.2.8-1.5 1.5-3 1.9-4.7.1-.4.4-.8.8-1l2.1-1.1c.5-.3.8-.8.8-1.3v-4.1c.4-.5.1-1.1-.4-1.3zM24 41.5c-9.7 0-17.5-7.8-17.5-17.5S14.3 6.5 24 6.5 41.5 14.3 41.5 24 33.7 41.5 24 41.5z"
                  fillRule="evenodd"
                ></path>
              </svg>
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

      {page === "post" && <ProfilePost />}
      {page === "saved" && <ProfileSaved />}
      {page === "tagged" && <ProfileTagged />}

      {/* <div className="profile-images">
        <ImageWOverlay />
      </div> */}
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
      {openFollowing && profileData.following > 0 && followingUsers.length > 0 && (
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
          <button>Change Password</button>
          <button>Privacy and Security</button>
          <button>Log Out</button>
        </Modal>
      )}
    </main>
  );
};

export default Profile;
