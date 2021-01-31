import React from "react";

import { BackButtonIcon } from "./NewPost";

const NewPostAdvanced = ({ setPage, commentOff, setCommentOff }) => {
  return (
    <div className="new-post advanced">
      <div style={{ border: "1px solid #dbdbdb" }}>
        <div className="new-post__header">
          <button onClick={() => setPage("caption")} className="close back">
            <span
              style={{ display: "inline-block", transform: "rotate(270deg)" }}
            >
              <BackButtonIcon />
            </span>
          </button>
          <h3>Advanced Setting</h3>
        </div>
        <h4>Comments</h4>
        <div className="new-post__options">
          <button>
            <span>Turn Off Commenting</span>
            <div className="switch-container">
              <label>
                <input
                  checked={commentOff}
                  onChange={() => setCommentOff(!commentOff)}
                  className="switch"
                  type="checkbox"
                />
                <div>
                  <div></div>
                </div>
              </label>
            </div>
          </button>
          <p>
            You can change this later by going to the menu at the top of your
            post.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewPostAdvanced;
