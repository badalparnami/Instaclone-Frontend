import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
// import "../pages/Activity/Activity.css";
import { logoutAsync } from "../store/actions/auth";

import NavIcon from "./NavIcon";

const ProfilePopup = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutAsync(token));
  };

  return (
    <div
      style={{ width: "23rem", borderRadius: "6px" }}
      className="popup-card profile-popup noti"
    >
      <ul>
        <NavLink className="user-card" to="/profile">
          <NavIcon
            height={16}
            width={16}
            viewBox="0 0 32 32"
            isProfilePopup={true}
            ariaLabel="ProfilePP"
          />
          <span>Profile</span>
        </NavLink>
        <NavLink className="user-card" to="/profile/saved">
          <NavIcon
            height={16}
            width={16}
            viewBox="0 0 32 32"
            isProfilePopup={true}
            ariaLabel="SavedPP"
          />
          <span>Saved</span>
        </NavLink>
        <NavLink className="user-card" to="/accounts/edit">
          <NavIcon
            height={16}
            width={16}
            viewBox="0 0 32 32"
            isProfilePopup={true}
            ariaLabel="SettingsPP"
          />
          <span>Settings</span>
        </NavLink>
        <p className="divider"></p>
        <button onClick={logoutHandler}>Log Out</button>
      </ul>
    </div>
  );
};

export default ProfilePopup;
