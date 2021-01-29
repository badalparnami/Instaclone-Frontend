import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Nav.css";
import Activity from "../Activity/Activity";
import Search from "../Search/Search";
import NavIcon from "../../components/NavIcon";
import PopupHelper from "../../components/PopupHelper";
import ProfilePopup from "../../components/ProfilePopup";
import ImageUploader from "../../components/ImageUploader";

const Nav = ({ isLoggedIn }) => {
  const [isActivityOpen, setIsActivityOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [isImageUploaderOpen, setIsImageUploaderOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const location = useLocation();
  const { pathname, key } = location;

  useEffect(() => {
    if (pathname === "/newpost") {
      setRedirect(false);
    }
  }, [pathname, key]);

  useEffect(() => {
    if (searchValue) {
      setIsSearchOpen(true);
    } else {
      setIsSearchOpen(false);
    }
  }, [searchValue]);

  return (
    <header>
      <div className="header-content">
        <NavLink exact to="/">
          <div className="header-logo"></div>
        </NavLink>
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
              <Search value={searchValue} />
            </PopupHelper>
          )}
        </div>

        {isLoggedIn && (
          <div className="header-icons">
            <NavLink exact to="/">
              <NavIcon ariaLabel="Home" />
            </NavLink>
            <NavLink to="/explore">
              <NavIcon ariaLabel="Find People" />
            </NavLink>
            <div className="activity-icon">
              <NavLink
                className={`${isActivityOpen ? "active" : ""}`}
                to="/activity"
                onClick={(e) => {
                  e.preventDefault();
                  setIsActivityOpen(!isActivityOpen);
                }}
              >
                <NavIcon ariaLabel="Activity Feed" />
              </NavLink>
              {isActivityOpen && (
                <PopupHelper
                  isPopupOpen={isActivityOpen}
                  setIsPopupOpen={setIsActivityOpen}
                >
                  <Activity />
                </PopupHelper>
              )}
            </div>
            <div className="activity-icon">
              <NavLink
                className={`${isProfileOpen ? "active" : ""}`}
                to="/profile"
                onClick={(e) => {
                  e.preventDefault();
                  setIsProfileOpen(!isProfileOpen);
                }}
              >
                <NavIcon
                  ariaLabel="Profile"
                  viewBox="0 0 512 512"
                  width={27}
                  height={27}
                />
              </NavLink>
              {isProfileOpen && (
                <PopupHelper
                  isPopupOpen={isProfileOpen}
                  setIsPopupOpen={setIsProfileOpen}
                  isProfile={true}
                >
                  <ProfilePopup />
                </PopupHelper>
              )}
            </div>

            <a
              onClick={() => {
                setRedirect(false);
                setIsImageUploaderOpen(true);
              }}
              className="upload"
              href="#"
            ></a>
            <ImageUploader
              openPicker={isImageUploaderOpen}
              makeMeFalse={setIsImageUploaderOpen}
              redirect={redirect}
              setRedirect={setRedirect}
            />
          </div>
        )}

        {!isLoggedIn && (
          <div className="header-cta">
            <NavLink className="login" to="/">
              <button>Log In</button>
            </NavLink>
            <NavLink className="signup" to="/signup">
              <button>Sign Up</button>
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
};

export default Nav;
