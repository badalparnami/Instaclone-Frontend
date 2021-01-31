import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Modal from "./Modal/Modal";

import { updateProfile } from "../store/actions/profile";
import useReq from "../hooks/useReq";

const ProfilePopupUserCard = ({ username, name, relation }) => {
  const [relationship, setRelationship] = useState(relation);
  const [openPopup, setOpenPopup] = useState(false);
  const [followingNum, setFollowingNum] = useState(0);
  const [followNum, setFollowNum] = useState(0);

  const { following, follower } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const { requestData, response, clear } = useReq();

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
      setRelationship(response.relation);
      clear();
    }
  }, [response, relationship]);

  const changeRelation = () => {
    let url = `user/follow`;

    if (relationship === "Unblock") {
      url = `user/toggleBlock`;
    }

    requestData("post", url, { username });
  };

  return (
    <div className="user-card">
      <a className="avatar" href="#">
        <img
          className="avatar avatar--small"
          src="https://res.cloudinary.com/drwb19czo/image/upload/v1592143124/hkhrolzqz4zkama4uf5m.png"
          alt="Avatar"
        />
      </a>
      <div className="user-card__details">
        <a href="#">{username}</a>
        <p>{name}</p>
      </div>
      <button
        onClick={
          relationship == "Requested" || relationship == "Following"
            ? openPopupHandler
            : changeRelation
        }
        className={relationship === "Follow" ? "inactive" : ""}
      >
        {relationship}
      </button>

      {openPopup && (
        <Modal
          closeOnClick={true}
          onClick={setOpenPopup}
          isUser={true}
          isOptions={true}
        >
          <h4 className="unfollow-popup">Unfollow @{username}?</h4>
          <button className="red-option" onClick={changeRelation}>
            Unfollow
          </button>
        </Modal>
      )}
    </div>
  );
};

export default ProfilePopupUserCard;
