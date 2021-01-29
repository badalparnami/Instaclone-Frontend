import React from "react";
import { NavLink } from "react-router-dom";

import NavIcon from "./NavIcon";

const ProfileCategory = ({ to, ariaLabel }) => {
  return (
    <div className="profile-category">
      <NavLink exact to={to}>
        <NavIcon ariaLabel={ariaLabel} height={12} width={12} fill="#8e8e8e" />
        <p>{ariaLabel.toUpperCase()}</p>
      </NavLink>
    </div>
  );
};

export default ProfileCategory;
