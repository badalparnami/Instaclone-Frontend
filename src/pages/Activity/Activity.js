import React from "react";
import "./Activity.css";

const Activity = () => {
  return (
    <div className="popup-card noti">
      <ul>
        <div className="noti-empty">
          <div className="activityHeartIcon"></div>
          <h2>Activity On Your Posts</h2>
          <h3>
            When someone likes or comments on one of your posts, you'll see it
            here.
          </h3>
        </div>
      </ul>
    </div>
  );
};

export default Activity;
