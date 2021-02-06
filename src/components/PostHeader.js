import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Modal from "../components/Modal/Modal";
import useReq from "../hooks/useReq";
import ProfilePopupUserCard from "./ProfilePopupUserCard";
import { updateProfile } from "../store/actions/profile";

const PostHeader = ({
  isHome,
  username,
  relation,
  allowComment,
  setAllowComment,
  isArchived,
  setIsArchived,
  postId,
  pendingTag,
  tagged,
  isPrivate,
  fetchData,
  avatar,
}) => {
  const [openOptions, setOpenOptions] = useState(false);
  const [openTagOptions, setOpenTagOptions] = useState(false);
  const [pendingTagList, setPendingTagList] = useState(pendingTag); // approve or remove
  const [taggedList, setTaggedList] = useState(tagged); // remove
  const history = useHistory();
  const root = document.body;

  const {
    requestData: requestDataComment,
    clear: clearComment,
    response: responseComment,
    alertHandler,
  } = useReq();

  const {
    requestData: requestDataArchive,
    clear: clearArchive,
    response: responseArchive,
  } = useReq();

  const {
    requestData: requestDataPendingTag,
    clear: clearPendingTag,
    response: responsePendingTag,
  } = useReq();

  const {
    requestData: requestDataRemoveTag,
    clear: clearRemoveTag,
    response: responseRemoveTag,
  } = useReq();

  const {
    requestData: requestDataDeletePost,
    clear: clearDeletePost,
    response: responseDeletePost,
  } = useReq();

  const dispatch = useDispatch();
  const { archivePostCount, postCount } = useSelector((state) => state.profile);

  useEffect(() => {
    if (responseComment !== null) {
      if (allowComment) {
        alertHandler("Disabled comment section", setOpenOptions, true);
      } else {
        alertHandler("Enabled comment section", setOpenOptions, true);
      }
      setAllowComment(!allowComment);
      clearComment();
    }
  }, [responseComment]);

  useEffect(() => {
    if (responseArchive !== null) {
      if (isArchived) {
        alertHandler("Post Unarchived", setOpenOptions, true);
        dispatch(updateProfile({ archivePostCount: archivePostCount - 1 }));
      } else {
        alertHandler("Post Archived", setOpenOptions, true);
        dispatch(updateProfile({ archivePostCount: archivePostCount + 1 }));
      }
      setIsArchived(!isArchived);
      clearArchive();
    }
  }, [responseArchive]);

  useEffect(() => {
    if (responsePendingTag !== null) {
      alertHandler("Added post in your profile.", setOpenOptions, true);
      setPendingTagList(!pendingTagList);
      clearPendingTag();
    }
  }, [responsePendingTag]);

  useEffect(() => {
    if (responseRemoveTag !== null) {
      alertHandler("Removed you from the post.", setOpenOptions, true);
      setTaggedList(!taggedList);
      clearRemoveTag();
    }
  }, [responseRemoveTag]);

  useEffect(() => {
    if (responseDeletePost !== null) {
      alertHandler("Deleted post", setOpenOptions, true);
      dispatch(updateProfile({ postCount: postCount - 1 }));
      history.push("/profile");

      return () => clearDeletePost();
    }
  }, [responseDeletePost]);

  const toggleAllowCommentHandler = () => {
    requestDataComment("post", `post/allowcomment`, { postId });
  };

  const toggleArchiveHandler = () => {
    requestDataArchive("post", `post/togglearchive`, { postId });
  };

  const showPostInProfileHandler = () => {
    requestDataPendingTag("post", "user/approveTag", { postId });
  };

  const removePostTagHandler = () => {
    requestDataRemoveTag("post", "post/removetag", { postId, username });
  };

  const deletePostHandler = () => {
    requestDataDeletePost("delete", "post/delete", { id: postId });
  };

  return (
    <div className="post-header">
      <NavLink className="user-avatar" to={`/${username}`}>
        <img
          alt="virat.kohli's profilePicture"
          draggable="false"
          src={
            avatar
              ? avatar
              : `${process.env.PUBLIC_URL}/images/default-avatar.jpg`
          }
        />
      </NavLink>
      <NavLink to={`/${username}`} className="username">
        {username}
      </NavLink>
      {!isHome && relation !== "Creator" && (
        <>
          <span>•</span>
          {/* <button style={{ color: relationColor }}>{relation}</button> */}
          <ProfilePopupUserCard
            isPostHeader={true}
            relation={relation}
            username={username}
            fetchData={fetchData}
            isPrivate={isPrivate}
          />
        </>
      )}
      <div
        onClick={() => setOpenOptions(!openOptions)}
        className="post-header-options"
      >
        <svg
          aria-label="More options"
          fill="#262626"
          height="16"
          viewBox="0 0 48 48"
          width="16"
        >
          <circle
            clipRule="evenodd"
            cx="8"
            cy="24"
            fillRule="evenodd"
            r="4.5"
          ></circle>
          <circle
            clipRule="evenodd"
            cx="24"
            cy="24"
            fillRule="evenodd"
            r="4.5"
          ></circle>
          <circle
            clipRule="evenodd"
            cx="40"
            cy="24"
            fillRule="evenodd"
            r="4.5"
          ></circle>
        </svg>
      </div>
      {openOptions && (
        <Modal onClick={setOpenOptions} isUser={true} isOptions={true}>
          {/* <button className="red-option">Unfollow</button> */}
          {isHome && (
            <button
              onClick={() => {
                root.style.overflow = "auto";
                history.push(`/post/${postId}`);
              }}
            >
              Go to post
            </button>
          )}
          <button
            onClick={() => {
              navigator.clipboard.writeText(document.URL);
              alertHandler("Link copied to clipboard.", setOpenOptions, true);
            }}
          >
            Copy Link
          </button>
          {relation === "Creator" && (
            <button onClick={toggleArchiveHandler}>
              {isArchived ? "Unarchive" : "Archive"}
            </button>
          )}
          {relation === "Creator" && (
            <button onClick={toggleAllowCommentHandler}>
              {allowComment ? "Turn Off Comments" : "Turn On Comments"}
            </button>
          )}
          {(taggedList || pendingTagList) && (
            <button onClick={() => setOpenTagOptions(!openTagOptions)}>
              Tag Options
            </button>
          )}
          {relation === "Creator" && (
            <button onClick={deletePostHandler} className="red-option">
              Delete post
            </button>
          )}
        </Modal>
      )}
      {openTagOptions && (
        <Modal
          onClick={setOpenTagOptions}
          isUser={true}
          isOptions={true}
          closeOnClick={true}
        >
          <button className="red-option" onClick={removePostTagHandler}>
            Remove Me From Post
          </button>
          {pendingTagList && (
            <button onClick={showPostInProfileHandler}>
              Show in My Profile
            </button>
          )}
        </Modal>
      )}
    </div>
  );
};

export default PostHeader;
