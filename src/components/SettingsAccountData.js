import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import InfiniteData from "./InfiniteData";
import InfiniteData3 from "./InfiniteData3";

const headingToShow = {
  like: "Post you've liked",
  archive: "Post you've archived",
  pendingPost: "Pending tagged post",
  block: "Accounts you've blocked",
  followReq: "Current follow requests",
};

const SettingsAccountData = ({ page }) => {
  const { likeCount, archivePostCount, blockedCount } = useSelector(
    (state) => state.profile
  );

  return (
    <div className="settings-content">
      <div className="img-container">
        <div className="img"></div>
        <div className="settings_username">
          <h1>{!page ? "Account Data" : headingToShow[page]}</h1>
        </div>
      </div>

      {!page && (
        <div className="settings-data">
          <div className="setting-data">
            <p>Post you've liked</p>
            <NavLink to="/accounts/data/like">View All</NavLink>
          </div>
          <div className="setting-data">
            <p>Post you've archived</p>
            <NavLink to="/accounts/data/archive">View All</NavLink>
          </div>
          <div className="setting-data">
            <p>Pending tagged post</p>
            <NavLink to="/accounts/data/pending_post">View All</NavLink>
          </div>
          <div className="setting-data">
            <p>Accounts you've blocked</p>
            <NavLink to="/accounts/data/block">View All</NavLink>
          </div>
          <div className="setting-data">
            <p>Current follow requests</p>
            <NavLink to="/accounts/data/pending_request">View All</NavLink>
          </div>
        </div>
      )}

      <div className="account-data-child">
        {((page === "like" && likeCount === 0) ||
          (page === "archive" && archivePostCount === 0) ||
          (page === "block" && blockedCount === 0)) && (
          <p>Your account doesn't have any information to show here.</p>
        )}

        {page === "like" && likeCount > 0 && (
          <InfiniteData detail="like" size={150} />
        )}

        {page === "archive" && archivePostCount > 0 && (
          <InfiniteData size={150} detail="archivePost" />
        )}

        {page === "pendingPost" && (
          <InfiniteData size={150} detail="pendingTaggedPost">
            <p>Your account doesn't have any information to show here.</p>
          </InfiniteData>
        )}

        {page === "followReq" && (
          <InfiniteData3 detail="pendingFollower">
            <p>Your account doesn't have any information to show here.</p>
          </InfiniteData3>
        )}

        {page === "block" && blockedCount > 0 && (
          <InfiniteData3 detail="blocked" />
        )}
      </div>
    </div>
  );
};

export default SettingsAccountData;
