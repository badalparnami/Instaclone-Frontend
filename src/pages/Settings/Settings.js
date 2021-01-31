import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";

import SettingsEditProfile from "../../components/SettingsEditProfile";
import SettingsPassword from "../../components/SettingsPassword";
import SettingsPrivacyAndSecurity from "../../components/SettingsPrivacyAndSecurity";

import "./Settings.css";

const Settings = ({ page }) => {
  const { token } = useSelector((state) => state.auth);
  const profileData = useSelector((state) => state.profile);
  const [isTokenRendered, setIsTokenRendered] = useState(false);

  useEffect(() => {
    setIsTokenRendered(true);
  }, []);

  if (!token && isTokenRendered) {
    return <Redirect to="/" />;
  } else if (!isTokenRendered) {
    return <div></div>;
  }
  return (
    <div className="settings-page">
      <div className="settings-page-grid">
        <div className="settings_sidebar">
          <ul>
            <NavLink to="/accounts/edit">
              {/* className="active" */}
              <li>Edit Profile</li>
            </NavLink>
            <NavLink to="/accounts/password/change">
              <li>Change Password</li>
            </NavLink>
            <NavLink to="/accounts/privacy_and_security">
              <li>Privacy and Security</li>
            </NavLink>
          </ul>
        </div>
        {page === "edit" && (
          <SettingsEditProfile
            nameP={profileData.name}
            usernameP={profileData.username}
            websiteP={profileData.website}
            bioP={profileData.bio}
            emailP={profileData.email}
            lastUsername={profileData.lastUsername}
            isUsernameChangeAllowed={profileData.isUsernameChangeAllowed}
            avatar={profileData.avatar}
          />
        )}
        {page === "password" && (
          <SettingsPassword
            username={profileData.username}
            avatar={profileData.avatar}
          />
        )}
        {page === "privacy" && (
          <SettingsPrivacyAndSecurity
            privateP={profileData.private}
            manuallyApproveTag={profileData.manuallyApproveTag}
            tag={profileData.tag}
            mention={profileData.mention}
          />
        )}
      </div>
    </div>
  );
};

export default Settings;
