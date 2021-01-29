import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Modal from "./Modal/Modal";

import { updateProfile } from "../store/actions/profile";

const ProfilePopupUserCard = ({ username, name, relation }) => {
  const [relationship, setRelationship] = useState(relation);
  const [openPopup, setOpenPopup] = useState(false);
  const [error, setError] = useState(null);
  const [cleanup, setCleanup] = useState(false);

  const { token } = useSelector((state) => state.auth);
  const { following } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const openPopupHandler = () => {
    setOpenPopup(!openPopup);
  };

  useEffect(() => {
    if (cleanup) {
      return () => dispatch(updateProfile({ following: following - 1 }));
    }
  }, [cleanup]);

  const changeRelation = () => {
    let url = `${process.env.REACT_APP_BACKEND_URL}/user/follow`;

    if (relationship === "Unblock") {
      url`${process.env.REACT_APP_BACKEND_URL}/user/toggleBlock`;
    }

    axios
      .post(
        url,
        { username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (relationship === "Following") {
          setCleanup(true);
        }
        setRelationship(res.data.relation);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message);
        } else if (err.request) {
          setError("Slow Network Speed. Try Again later.");
        } else {
          setError("Oops!! Unusual error occurred");
        }
      });
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
          <button className="red-option" onClick={changeRelation}>
            Unfollow
          </button>
        </Modal>
      )}
    </div>
  );
};

export default ProfilePopupUserCard;
