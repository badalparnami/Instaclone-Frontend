import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import PostComment from "../../components/PostComment";
import useReq from "../../hooks/useReq";
import { clearComment, updateComment } from "../../store/actions/comment";
import LoginModal from "../../components/LoginModal";

const PostCommentMain = ({
  avatar,
  username,
  text,
  isCommentLiked,
  likeCount,
  commentReplyCount: commentRepliesCount,
  id,
  commentRef,
  isCreator,
  deleteCommentMain,
  date,
  allowComment,
}) => {
  const [commentReplyCount, setCommentReplyCount] = useState(
    commentRepliesCount
  );
  const [commentRepliesNum, setCommentRepliesNum] = useState(
    commentRepliesCount
  );
  const [showComment, setShowComment] = useState(true);

  const { requestData, response, clear } = useReq();

  const [commentReply, setCommentReply] = useState([]);

  const dispatch = useDispatch();

  const { id: newCId, text: newCText, commentId, date: newCDate } = useSelector(
    (state) => state.comment
  );

  const profileData = useSelector((state) => state.profile);

  const { loggedIn } = useSelector((state) => state.auth);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  useEffect(() => {
    if (response !== null) {
      const mapComment = response.details.map((c) => ({
        username: c.username,
        avatar: c.avatar,
        text: c.text,
        likeCount: c.likeCount,
        isCommentLiked: c.isLiked,
        id: c.id,
        isCreator: profileData.username === username,
        date: c.date,
      }));
      setCommentReply((prev) => [...mapComment, ...prev]);

      setCommentRepliesNum(
        commentRepliesNum < 3
          ? commentRepliesNum - commentRepliesNum
          : commentRepliesNum - 3
      );

      clear();
    }
  }, [response]);

  const commentRepliesHandler = () => {
    if (!loggedIn) {
      setOpenLoginModal(true);
      return;
    }
    if (commentRepliesNum === 0) {
      setShowComment(!showComment);
    } else {
      requestData(
        "get",
        `comment/comments/${id}/${commentReplyCount - commentRepliesNum}`
      );
    }
  };

  const replyOptionHandler = () => {
    if (!loggedIn) {
      setOpenLoginModal(true);
      return;
    }
    dispatch(updateComment({ commentId: id }));
    commentRef.current.focus();
    setTimeout(() => {
      commentRef.current.changeValue(`@${username} `);
    }, 1);
  };

  useEffect(() => {
    if (newCId && commentId === id) {
      setCommentReply((prev) => [
        ...prev,
        {
          id: newCId,
          text: newCText,
          avatar: profileData.avatar,
          username: profileData.username,
          isCommentLiked: false,
          likeCount: 0,
          isCreator: true,
          date: newCDate,
        },
      ]);

      setCommentReplyCount((prev) => prev + 1);
      dispatch(clearComment());
    }
  }, [newCId]);

  const deleteComment = (isReply, id) => {
    if (isReply) {
      setCommentReply((prev) => prev.filter((c) => c.id !== id));
    } else {
      deleteCommentMain(id);
    }
  };

  const repliesLikeHandler = (id, num) => {
    const index = commentReply.findIndex((e) => e.id === id);
    if (index === -1) {
      return;
    }
    const newCommentReply = [...commentReply];

    newCommentReply[index] = {
      ...newCommentReply[index],
      isCommentLiked: !newCommentReply[index].isCommentLiked,
      likeCount: newCommentReply[index].likeCount + num,
    };

    setCommentReply(newCommentReply);
  };

  return (
    <>
      <PostComment
        avatar={avatar}
        username={username}
        text={text}
        isCommentLiked={isCommentLiked}
        likeCount={likeCount}
        commentReplyCount={commentReplyCount}
        commentRepliesNum={commentRepliesNum}
        id={id}
        isCreator={isCreator}
        replyOptionHandler={replyOptionHandler}
        deleteComment={deleteComment}
        commentRepliesHandler={commentRepliesHandler}
        showComment={showComment}
        date={date}
        allowComment={allowComment}
      />

      {commentReply.length > 0 &&
        showComment &&
        commentReply.map((c) => (
          <PostComment
            avatar={c.avatar}
            username={c.username}
            text={c.text}
            isCommentLiked={c.isCommentLiked}
            likeCount={c.likeCount}
            id={c.id}
            isCreator={c.isCreator}
            replyOptionHandler={replyOptionHandler}
            isReply={true}
            key={c.id}
            deleteComment={deleteComment}
            repliesLikeHandler={repliesLikeHandler}
            date={c.date}
            allowComment={allowComment}
          />
        ))}

      {openLoginModal && <LoginModal setModal={setOpenLoginModal} />}
    </>
  );
};

export default PostCommentMain;
