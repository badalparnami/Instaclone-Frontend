import React, { useEffect, useState } from "react";
import PopupHelper from "../../components/PopupHelper";
import Search from "../Search/Search";

import { BackButtonIcon } from "./NewPost";

const NewPostTagged = ({ setPage, taggedUser, setTaggedUser }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (searchValue) {
      setIsSearchOpen(true);
    } else {
      setIsSearchOpen(false);
    }
  }, [searchValue]);

  const taggedUserHandler = (username) => {
    const isUserAlreadyTagged = taggedUser.find((u) => u === username);
    if (isUserAlreadyTagged) {
      return;
    }
    setTaggedUser([...taggedUser, username]);
  };

  const removeTaggedUser = (username) => {
    const users = taggedUser.filter((u) => u !== username);
    setTaggedUser(users);
  };

  return (
    <div className="new-post advanced tag">
      <div style={{ border: "1px solid #dbdbdb", minHeight: "50rem" }}>
        <div className="new-post__header">
          <button onClick={() => setPage("caption")} className="close back">
            <span
              style={{ display: "inline-block", transform: "rotate(270deg)" }}
            >
              <BackButtonIcon />
            </span>
          </button>
          <h3>Tag People</h3>
          <button onClick={() => setPage("caption")}>Done</button>
        </div>
        <div className="activity-icon">
          <form action="">
            <input
              required
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <span></span>
          </form>
          {isSearchOpen && (
            <PopupHelper
              isPopupOpen={isSearchOpen}
              setIsPopupOpen={setIsSearchOpen}
            >
              <Search value={searchValue} onClick={taggedUserHandler} />
            </PopupHelper>
          )}
          <div className="tagged-users">
            {taggedUser.length > 0 &&
              taggedUser.map((u) => (
                <span key={u}>
                  {u}
                  <button onClick={() => removeTaggedUser(u)}>
                    <span></span>
                  </button>
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPostTagged;
