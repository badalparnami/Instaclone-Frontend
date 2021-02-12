import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import ProfilePost from "../../components/ProfilePost";
import ProfileTagged from "../../components/ProfileTagged";
import Modal from "../../components/Modal/Modal";
import ProfileCategory from "../../components/ProfileCategory";
import ProfilePopupUserCard from "../../components/ProfilePopupUserCard";
import useReq from "../../hooks/useReq";
import { updateProfile } from "../../store/actions/profile";
import LoginModal from "../../components/LoginModal";
import InfiniteData from "../../components/InfiniteData";
import InfiniteData2 from "../../components/InfiniteData2";

import defaultAvatar from "../../assets/default-avatar.jpg";

const notAllowedUsernames = [
  "signup",
  "profile",
  "explore",
  "post",
  "newpost",
  "404",
];

const User = ({ page }) => {
  const { loggedIn } = useSelector((state) => state.auth);

  const [openFollowing, setOpenFollowing] = useState(false);
  const [openFollower, setOpenFollower] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [openBlock, setOpenBlock] = useState(false);

  const [fetchPost, setFetchPost] = useState(false);
  const [fetchTaggedPost, setFetchTaggedPost] = useState(false);
  const [fetchFollowing, setFetchFollowing] = useState(false);
  const [fetchFollower, setFetchFollower] = useState(false);

  const root = document.body;
  const history = useHistory();
  const { requestData, response, clear } = useReq();

  const dispatch = useDispatch();
  const { blockedCount } = useSelector((state) => state.profile);

  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openMutualsHandler, setOpenMutualsHandler] = useState(false);

  const {
    requestData: requestDataBlock,
    response: responseBlock,
    alertHandler,
  } = useReq();

  const { id } = useParams();

  useEffect(() => {
    if (response !== null) {
      document.title = `${response.user.name} (@${response.user.username}) • Instagram photos`;
    }
  }, [response]);

  useEffect(() => {
    if (loggedIn !== undefined) {
      fetchData();
    }
  }, [loggedIn, id]);

  useEffect(() => {
    if (responseBlock !== null) {
      dispatch(updateProfile({ blockedCount: blockedCount + 1 }));
      alertHandler("User blocked. To unblock go to settings");
      history.push("/profile");
    }
  }, [responseBlock]);

  useEffect(() => {
    if (response) {
      if (
        (response.user.private && response.relation === "Following") ||
        !response.user.private
      ) {
        if (page === "post" && response.user.postCount > 0) {
          setFetchPost(true);
        } else {
          setFetchPost(false);
        }
        if (page === "tagged" && response.user.taggedPostCount > 0) {
          setFetchTaggedPost(true);
        } else {
          setFetchTaggedPost(false);
        }
      }
    }
  }, [page, response]);

  const fetchData = () => {
    clear();
    if (notAllowedUsernames.includes(id.toString().toLowerCase())) {
      history.push("/404");
      return;
    }
    requestData("get", `user/detail/${id}`);
  };

  const openFollowingHandler = () => {
    setOpenFollowing(!openFollowing);

    if (response.user.followingCount > 0) {
      if (
        (response.user.private && response.relation === "Following") ||
        !response.user.private
      ) {
        setFetchFollowing(true);
      } else {
        setFetchFollowing(false);
      }
    }
  };

  const openFollowerHandler = () => {
    setOpenFollower(!openFollower);

    if (response.user.followerCount > 0) {
      if (
        (response.user.private && response.relation === "Following") ||
        !response.user.private
      ) {
        setFetchFollower(true);
      } else {
        setFetchFollower(false);
      }
    }
  };

  const blockUser = () => {
    requestDataBlock("post", "user/toggleblock", {
      username: response.user.username,
    });
  };

  return (
    <>
      {response && response.user && (
        <main className="profile-page">
          <div className="profile-header">
            <img
              src={
                response.user.avatar
                  ? response.user.avatar
                  : // : `${process.env.PUBLIC_URL}/images/default-avatar.jpg`
                    defaultAvatar
              }
              alt="Avatar"
              style={{ cursor: "default" }}
            />
            <div className="profile-header__details">
              <div className="profile-1">
                <h1>{response.user.username}</h1>

                <ProfilePopupUserCard
                  isPostHeader={true}
                  relation={response.relation || "Follow"}
                  username={response.user.username}
                  fetchData={fetchData}
                  isPrivate={response.user.private}
                  alwaysFetch={true}
                />

                <div
                  onClick={() => {
                    setOpenOptions(!openOptions);
                  }}
                  className="options-icon"
                  style={{ cursor: "pointer", display: "flex" }}
                >
                  <svg
                    aria-label="Options"
                    fill="#262626"
                    height="24"
                    viewBox="0 0 48 48"
                    width="24"
                  >
                    <circle cx="8" cy="24" r="4.5"></circle>
                    <circle cx="24" cy="24" r="4.5"></circle>
                    <circle cx="40" cy="24" r="4.5"></circle>
                  </svg>
                </div>
              </div>
              <div className="profile-2">
                <p>
                  <span>{response.user.postCount}</span>
                  {response.user.postCount <= 1 ? ` post` : ` posts`}
                </p>
                <p onClick={openFollowerHandler}>
                  <span>{response.user.followerCount} </span>
                  {response.user.followerCount <= 1
                    ? ` follower`
                    : ` followers`}
                </p>
                <p onClick={openFollowingHandler}>
                  <span>{response.user.followingCount}</span>
                  {` following`}
                </p>
              </div>
              <div className="profile-3">
                <p>{response.user.name}</p>
                {response.user.bio && <span>{response.user.bio}</span>}
                {response.user.website && (
                  <a
                    href={response.user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {response.user.website}
                  </a>
                )}
              </div>
              {response.mutuals && response.mutuals.length > 0 && (
                <div
                  onClick={() => setOpenMutualsHandler(true)}
                  className="profile-4"
                >
                  {response.mutuals.length === 1 && (
                    <span>
                      Followed by <span>{response.mutuals[0].username}</span>
                    </span>
                  )}
                  {response.mutuals.length === 2 && (
                    <span>
                      Followed by <span>{response.mutuals[0].username}</span>{" "}
                      and <span>{response.mutuals[1].username}</span>
                    </span>
                  )}
                  {response.mutuals.length > 2 && (
                    <span>
                      Followed by <span>{response.mutuals[0].username}</span>,{" "}
                      <span>{response.mutuals[1].username}</span> and{" "}
                      <span>{response.mutuals.length - 2} others.</span>
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
          {((response.user.private && response.relation === "Following") ||
            !response.user.private) && (
            <div className="profile-categories">
              <ProfileCategory to={`/${id}`} ariaLabel="Posts" />
              <ProfileCategory to={`/${id}/tagged`} ariaLabel="Tagged" />
            </div>
          )}

          {((response.user.private && response.relation === "Following") ||
            !response.user.private) && (
            <>
              {page === "post" && response.user.postCount === 0 && (
                <ProfilePost isUser={true} />
              )}

              {page === "tagged" && response.user.taggedPostCount === 0 && (
                <ProfileTagged isUser={true} />
              )}

              {page === "post" && response.user.postCount > 0 && fetchPost && (
                <InfiniteData
                  size={250}
                  isUser={true}
                  detail="post"
                  username={id}
                />
              )}

              {page === "tagged" &&
                response.user.taggedPostCount > 0 &&
                fetchTaggedPost && (
                  <InfiniteData
                    size={250}
                    isUser={true}
                    detail="taggedPost"
                    username={id}
                  />
                )}
            </>
          )}

          {response.user.private && response.relation !== "Following" && (
            <div className="profile-display">
              <div className="profile-display-tagged">
                <h1>This Account is Private</h1>
                <p>Follow to see their photos.</p>
              </div>
            </div>
          )}

          {openFollower && response.user.followerCount === 0 && (
            <Modal
              onClick={setOpenFollower}
              headingMain="Followers"
              headingSub="Followers"
              content="No Users Found"
              isUser={false}
            />
          )}

          {openFollowing && response.user.followingCount === 0 && (
            <Modal
              onClick={setOpenFollowing}
              headingMain="Following"
              headingSub="People who follow user"
              content="No Users Found"
              isUser={false}
            />
          )}

          {response.user.followingCount > 0 &&
            fetchFollowing &&
            openFollowing && (
              <InfiniteData2
                detail="following"
                headingMain="Following"
                isUser={true}
                onClickFn={setOpenFollowing}
                username={id}
              />
            )}

          {response.user.followerCount > 0 && fetchFollower && openFollower && (
            <InfiniteData2
              detail="follower"
              headingMain="Followers"
              isUser={true}
              onClickFn={setOpenFollower}
              username={id}
            />
          )}

          {openMutualsHandler &&
            response.mutuals &&
            response.mutuals.length > 0 && (
              <Modal
                onClick={setOpenMutualsHandler}
                headingMain="Followed by you"
                isOptions={false}
                isUser={true}
              >
                {response.mutuals.map((f) => (
                  <ProfilePopupUserCard
                    name={f.name}
                    username={f.username}
                    relation="Following"
                    key={f.username}
                    avatar={f.avatar}
                    // alwaysFetch={true}
                    // fetchData={fetchData}
                  />
                ))}
              </Modal>
            )}

          {openOptions && (
            <Modal onClick={setOpenOptions} isUser={true} isOptions={true}>
              <button
                className="red-option"
                onClick={() => {
                  if (!loggedIn) {
                    setOpenLoginModal(true);
                    setOpenOptions(false);
                    return;
                  }
                  setOpenBlock(true);
                }}
              >
                Block this user
              </button>
            </Modal>
          )}

          {openBlock && (
            <Modal
              onClick={setOpenBlock}
              isUser={true}
              isOptions={true}
              closeOnClick={true}
            >
              <h4 className="unfollow-popup">
                <b>{`Block ${response.user.username}?`}</b> <br /> <br />
                They won't be able to find your profile and posts. We won't let
                them know you blocked them.
              </h4>
              <button
                onClick={() => {
                  root.style.overflow = "auto";
                  blockUser();
                }}
                className="blue-option"
              >
                Okay
              </button>
            </Modal>
          )}

          {openLoginModal && <LoginModal setModal={setOpenLoginModal} />}
        </main>
      )}
    </>
  );
};

export default User;
