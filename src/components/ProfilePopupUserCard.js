import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import Modal from "./Modal/Modal";
import LoginModal from "./LoginModal";

import { updateProfile } from "../store/actions/profile";
import useReq from "../hooks/useReq";
import Loader from "./Loader/Loader";

const ProfilePopupUserCard = ({
  username,
  name,
  relation,
  isPostHeader,
  fetchData,
  isPrivate,
  avatar,
  alwaysFetch,
}) => {
  const [relationship, setRelationship] = useState(relation);
  const [openPopup, setOpenPopup] = useState(false);
  const [followingNum, setFollowingNum] = useState(0);
  const [followNum, setFollowNum] = useState(0);

  const [openLoginModal, setOpenLoginModal] = useState(false);

  const { following, follower, blockedCount } = useSelector(
    (state) => state.profile
  );
  const { loggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { requestData, response, clear, loading } = useReq();

  const root = document.body;

  const openPopupHandler = () => {
    setOpenPopup(!openPopup);
  };

  useEffect(() => {
    if (followingNum !== 0) {
      return () =>
        dispatch(
          updateProfile({
            following: following + followingNum,
          })
        );
    }
  }, [followingNum]);

  useEffect(() => {
    if (followNum !== 0) {
      return () =>
        dispatch(
          updateProfile({
            follower: follower + followNum,
          })
        );
    }
  }, [followNum]);

  useEffect(() => {
    if (response !== null) {
      if ((fetchData && isPrivate) || alwaysFetch) {
        fetchData();
      }

      if (relationship === "Following") {
        setFollowingNum((prev) => prev - 1);
      } else if (
        relationship === "Follow" &&
        response.relation === "Following"
      ) {
        setFollowingNum((prev) => prev + 1);
      } else if (relationship === "Approve") {
        setFollowNum((prev) => prev + 1);
      }

      if (relationship === "Unblock") {
        dispatch(updateProfile({ blockedCount: blockedCount - 1 }));
      }
      setRelationship(response.relation);
      clear();
    }
  }, [response, relationship]);

  const changeRelation = () => {
    if (!loggedIn) {
      setOpenLoginModal(true);
      return;
    }
    setOpenPopup(false);
    root.style.overflow = "auto";
    let url = `user/follow`;

    if (relationship === "Unblock") {
      url = `user/toggleBlock`;
    }

    requestData("post", url, { username });
  };

  return (
    <div className="user-card">
      {!isPostHeader && (
        <>
          <NavLink className="avatar" to={`/${username}`}>
            <img
              className="avatar avatar--small"
              src={
                avatar
                  ? avatar
                  : `${process.env.PUBLIC_URL}/images/default-avatar.jpg`
              }
              alt="Avatar"
            />
          </NavLink>
          <div className="user-card__details">
            <NavLink to={`/${username}`}>{username}</NavLink>
            <p>{name}</p>
          </div>
        </>
      )}
      {relationship !== "Self" && (
        <button
          disabled={loading}
          onClick={
            relationship == "Requested" || relationship == "Following"
              ? openPopupHandler
              : changeRelation
          }
          className={
            relationship === "Follow" || relationship === "Approve"
              ? "profile-follow"
              : "profile-following"
          }
        >
          {relationship} {loading && <Loader />}
        </button>
      )}

      {openPopup && (
        <Modal
          closeOnClick={false}
          onClick={setOpenPopup}
          isUser={true}
          isOptions={true}
          styles={{ paddingTop: "13rem" }}
        >
          <div className="unfollow-avatar">
            <img
              src={
                avatar
                  ? avatar
                  : `${process.env.PUBLIC_URL}/images/default-avatar.jpg`
              }
              alt="Avatar"
            />
          </div>
          <h4 className="unfollow-popup">
            {isPrivate
              ? `If you change your mind, you'll have to request to follow @${username} again.`
              : `Unfollow @${username}?`}
          </h4>
          <button className="red-option" onClick={changeRelation}>
            Unfollow
          </button>
        </Modal>
      )}
      {openLoginModal && <LoginModal setModal={setOpenLoginModal} />}
    </div>
  );
};

export default ProfilePopupUserCard;
