import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import Linkify from "linkifyjs/react";
import * as linkify from "linkifyjs";
import mention from "linkifyjs/plugins/mention";
import hashtag from "linkifyjs/plugins/hashtag";

import useReq from "../hooks/useReq";
import { formatDateComments } from "../utils/date";
import Modal from "./Modal/Modal";
import { linkifyOptions } from "../utils/linkify";
import LoginModal from "./LoginModal";

mention(linkify);
hashtag(linkify);

const PostComment = ({
  isHome,
  isReply,
  avatar,
  username,
  text,
  isCommentLiked,
  likeCount,
  commentReplyCount,
  commentRepliesNum,
  id,
  isCreator,
  replyOptionHandler,
  deleteComment,
  commentRepliesHandler,
  showComment,
  repliesLikeHandler,
  date,
  allowComment,
}) => {
  const [commentLiked, setCommentLiked] = useState(isCommentLiked);
  const [likesCount, setLikesCount] = useState(likeCount);
  const {
    requestData: requestDataLike,
    response: responseLike,
    clear: clearLike,
  } = useReq();

  const [deleteModal, setDeleteModal] = useState(false);

  const { requestData: requestDataDelete, response: responseDelete } = useReq();

  const { loggedIn } = useSelector((state) => state.auth);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const root = document.body;

  useEffect(() => {
    if (responseLike !== null) {
      if (commentLiked) {
        setLikesCount((prev) => prev - 1);
        isReply && repliesLikeHandler(id, -1);
      } else {
        setLikesCount((prev) => prev + 1);
        isReply && repliesLikeHandler(id, +1);
      }
      setCommentLiked(!commentLiked);
      clearLike();
    }
  }, [responseLike]);

  const toggleLike = () => {
    if (!loggedIn) {
      setOpenLoginModal(true);
      return;
    }
    if (isReply) {
      requestDataLike("post", "commentreply/togglelike", { commentId: id });
    } else {
      requestDataLike("post", "comment/togglelike", { commentId: id });
    }
  };

  const deleteCommentHandler = () => {
    root.style.overflow = "auto";
    if (!isReply) {
      requestDataDelete("delete", "comment/delete", { commentId: id });
    } else {
      requestDataDelete("delete", "commentreply/delete", { commentId: id });
    }
  };

  useEffect(() => {
    if (responseDelete !== null) {
      deleteComment(isReply, id);
    }
  }, [responseDelete]);

  return (
    <div className={`post-comment real ${isReply ? "is-reply" : ""}`}>
      {!isHome && (
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
      )}
      <div className="comment-details">
        <p>
          <NavLink to={`/${username}`} className="username">
            {username}
          </NavLink>
          {/* <span>{text}</span> */}
          <Linkify options={linkifyOptions}>{text}</Linkify>
        </p>
        {!isHome && (
          <>
            <div className="comment-stats">
              <p className="time">{formatDateComments(date)}</p>
              {likesCount > 0 && (
                <p className="like-details">
                  {likesCount} {likesCount > 1 ? " likes" : " like"}
                </p>
              )}
              {allowComment && (
                <button onClick={replyOptionHandler}>Reply</button>
              )}
            </div>
            {!isReply && commentReplyCount > 0 && (
              <p
                onClick={commentRepliesHandler}
                style={{ width: "max-content" }}
                className="view-reply"
              >
                <span className="dash large"></span>
                {commentRepliesNum > 0 || !showComment
                  ? `View replies (${
                      commentRepliesNum === 0
                        ? commentReplyCount
                        : commentRepliesNum
                    })`
                  : "Hide replies"}
              </p>
            )}
          </>
        )}
      </div>

      {isCreator && (
        <div onClick={() => setDeleteModal(true)} className="comment-options">
          <svg
            aria-label="Comment Options"
            className="_8-yf5"
            fill="#8e8e8e"
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
      )}

      <div
        onClick={toggleLike}
        className={`comment-like ${commentLiked ? "active" : ""}`}
      >
        <svg
          aria-label="Like"
          fill="#262626"
          height="12"
          viewBox="0 0 48 48"
          width="12"
        >
          <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
        </svg>
      </div>

      {deleteModal && (
        <Modal onClick={setDeleteModal} isUser={true} isOptions={true}>
          <button onClick={deleteCommentHandler} className="red-option">
            Delete
          </button>
        </Modal>
      )}

      {openLoginModal && <LoginModal setModal={setOpenLoginModal} />}
    </div>
  );
};

export default PostComment;
