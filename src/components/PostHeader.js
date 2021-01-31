import React, { useState, useEffect } from "react";
import Modal from "../components/Modal/Modal";
import useReq from "../hooks/useReq";

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
}) => {
  const [openOptions, setOpenOptions] = useState(false);
  const [openTagOptions, setOpenTagOptions] = useState(false);
  const [pendingTagList, setPendingTagList] = useState(pendingTag); // approve or remove
  const [taggedList, setTaggedList] = useState(tagged); // remove

  const {
    requestData: requestDataComment,
    clear: clearComment,
    response: responseComment,
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

  useEffect(() => {
    if (responseComment !== null) {
      setAllowComment(!allowComment);
      clearComment();
    }
  }, [responseComment]);

  useEffect(() => {
    if (responseArchive !== null) {
      setIsArchived(!isArchived);
      clearArchive();
    }
  }, [responseArchive]);

  useEffect(() => {
    if (responsePendingTag !== null) {
      setPendingTagList(!pendingTagList);
      clearPendingTag();
    }
  }, [responsePendingTag]);

  useEffect(() => {
    if (responseRemoveTag !== null) {
      setTaggedList(!taggedList);
      clearRemoveTag();
    }
  }, [responseRemoveTag]);

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

  return (
    <div className="post-header">
      <a className="user-avatar" href="">
        <img
          alt="virat.kohli's profilePicture"
          draggable="false"
          src="https://instagram.fdel11-1.fna.fbcdn.net/v/t51.2885-19/s150x150/120097897_172397281086637_5031602793879746188_n.jpg?_nc_ht=instagram.fdel11-1.fna.fbcdn.net&amp;_nc_ohc=dBwUjVtwxNUAX-1aZEw&amp;tp=1&amp;oh=c49552f8616605bbce2acd9a255560ff&amp;oe=6032E336"
        />
      </a>
      <a href="#" className="username">
        {username}
      </a>
      {!isHome && relation !== "Creator" && (
        <>
          <span>•</span>
          <button>{relation}</button>
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
          {isHome && <button>Go to post</button>}
          <button>Copy Link</button>
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
            <button className="red-option">Delete post</button>
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
