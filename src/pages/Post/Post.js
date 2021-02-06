import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import "./Post.css";

import PostCTA from "../../components/PostCTA";
import PostCaption from "../../components/PostCaption";
import PostAddComment from "../../components/PostAddComment";
import PostHeader from "../../components/PostHeader";
import useReq from "../../hooks/useReq";
import PostCommentMain from "./PostCommentMain";
import { formatDatePost } from "../../utils/date";
import LoginModal from "../../components/LoginModal";

const Post = (props) => {
  const { loggedIn } = useSelector((state) => state.auth);
  const profileData = useSelector((state) => state.profile);
  const { requestData, response, clear } = useReq();
  const {
    requestData: requestDataCommments,
    response: responseComments,
    clear: clearComments,
  } = useReq();

  const [updatedState, setUpdatedState] = useState(false);
  const [allowComment, setAllowComment] = useState(false);
  const [isArchived, setIsArchived] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [postComments, setPostComments] = useState([]);
  const [current, setCurrent] = useState(1);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const commentRef = useRef();
  const likeRef = useRef();

  useEffect(() => {
    if (loggedIn !== undefined) {
      fetchData();
    }
  }, [loggedIn]);

  useEffect(() => {
    if (response !== null && !updatedState) {
      setAllowComment(response.postDetails.allowComment);
      setIsArchived(response.postDetails.isArchived);
      setLikeCount(response.postDetails.likeCount);
      setIsLiked(response.postDetails.isLiked);
      setIsSaved(response.postDetails.isSaved);
      setPostComments(response.postDetails.comment);
      setUpdatedState(true);
    }
  }, [response, updatedState]);

  useEffect(() => {
    if (responseComments !== null) {
      setPostComments([...postComments, ...responseComments.details]);
      setCurrent((prev) => prev + 1);
      clearComments();
    }
  }, [responseComments]);

  const fetchData = () => {
    clear();
    setUpdatedState(false);
    requestData("get", `post/detail/${props.match.params.id}`);
  };

  const addPostComment = (id, text, date) => {
    setPostComments((prev) => [
      ...prev,
      {
        avatar: profileData.avatar,
        id,
        isLiked: false,
        likeCount: 0,
        replyCount: 0,
        text,
        date,
        username: profileData.username,
      },
    ]);
  };

  const deleteComment = (id) => {
    setPostComments((prev) => prev.filter((c) => c.id != id));
  };

  const moreCommentsHandler = () => {
    if (!loggedIn) {
      setOpenLoginModal(true);
      return;
    }
    requestDataCommments(
      "get",
      `comment/get/${props.match.params.id}/${current}`
    );
  };

  return (
    <main className="post-page">
      {response && updatedState && (
        <div className="post-page-container">
          <div className="post-image">
            <img
              src={response.postDetails.media}
              alt=" "
              style={response.postDetails.styles}
            />
          </div>
          <div className="post-details">
            <PostHeader
              relation={response.relation}
              username={response.postDetails.creatorUsername}
              allowComment={allowComment}
              setAllowComment={setAllowComment}
              isArchived={isArchived}
              setIsArchived={setIsArchived}
              postId={props.match.params.id}
              pendingTag={response.postDetails.isInPendingTagged}
              tagged={response.postDetails.isInTaggedList}
              fetchData={fetchData}
              isPrivate={response.private}
              avatar={response.postDetails.avatar}
            />
            <div className="post-comments">
              {response.postDetails.caption && (
                <PostCaption
                  caption={response.postDetails.caption}
                  username={response.postDetails.creatorUsername}
                  date={response.postDetails.date}
                  avatar={response.postDetails.avatar}
                />
              )}

              {postComments.map((c) => (
                <PostCommentMain
                  avatar={c.avatar}
                  commentReplyCount={c.replyCount}
                  isCommentLiked={c.isLiked}
                  likeCount={c.likeCount}
                  text={c.text}
                  username={c.username}
                  key={c.id}
                  id={c.id}
                  date={c.date}
                  commentRef={commentRef}
                  isCreator={c.username === profileData.username}
                  deleteCommentMain={deleteComment}
                  allowComment={allowComment}
                />
              ))}

              {response.postDetails.totalComments > postComments.length && (
                <div onClick={moreCommentsHandler} className="more-comments">
                  <span></span>
                </div>
              )}
              {/* <PostComment />

              <PostComment isReply={true} /> */}
            </div>

            <div className="post-stats">
              <PostCTA
                isSaved={isSaved}
                isLiked={isLiked}
                setIsLiked={setIsLiked}
                setIsSaved={setIsSaved}
                postId={props.match.params.id}
                setLikeCount={setLikeCount}
                commentRef={commentRef}
                likeRef={likeRef}
                allowComment={allowComment}
              />
              {likeCount > 0 ? (
                <p className="like-count">
                  {likeCount}
                  {likeCount > 1 ? " likes" : " like"}
                </p>
              ) : (
                <p className="like-count" style={{ fontWeight: 400 }}>
                  Be the first to{" "}
                  <b
                    onClick={() => likeRef.current.click()}
                    style={{ cursor: "pointer", fontWeight: 500 }}
                  >
                    like this
                  </b>
                </p>
              )}

              {/* <p className="date">January 6</p> */}
              <p className="date">
                {formatDatePost(response.postDetails.date)}
              </p>
            </div>

            {allowComment && (
              <PostAddComment
                postId={props.match.params.id}
                ref={commentRef}
                addPostComment={addPostComment}
              />
            )}
          </div>
        </div>
      )}
      {openLoginModal && <LoginModal setModal={setOpenLoginModal} />}
    </main>
  );
};

export default Post;
