import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import PostHeader from "./PostHeader";
import PostCTA from "./PostCTA";
import PostCaption from "./PostCaption";
import PostComment from "./PostComment";
import PostAddComment from "./PostAddComment";
import { formatDatePost } from "../utils/date";

const HomePost = ({
  id,
  media,
  caption,
  allowComment,
  styles,
  date,
  likeCount: likeCount1,
  username,
  avatar,
  commentCount,
  comments: comments1,
  isSaved: isSaved1,
  isLiked: isLiked1,
  userAvatar,
  userUsername,
}) => {
  const [likeCount, setLikeCount] = useState(likeCount1);
  const [isLiked, setIsLiked] = useState(isLiked1);
  const [isSaved, setIsSaved] = useState(isSaved1);
  const [comments, setComments] = useState(comments1);

  const addPostComment = (id, text, date) => {
    setComments((prev) => [
      ...prev,
      {
        avatar: userAvatar,
        id,
        isLiked: false,
        likeCount: 0,
        replyCount: 0,
        text,
        date,
        username: userUsername,
      },
    ]);
  };

  return (
    <div className="home-page__post post-details">
      <PostHeader
        isHome={true}
        username={username}
        allowComment={allowComment}
        postId={id}
        avatar={avatar}
      />

      <div className="post-image">
        <img
          alt=" "
          decoding="auto"
          style={{ objectFit: "cover", ...styles }}
          src={media}
        />
      </div>

      <div className="post-stats">
        <PostCTA
          setIsLiked={setIsLiked}
          setIsSaved={setIsSaved}
          setLikeCount={setLikeCount}
          isLiked={isLiked}
          isSaved={isSaved}
          postId={id}
        />
        {likeCount > 0 && (
          <p className="like-count">
            {likeCount}
            {likeCount > 1 ? " likes" : " like"}
          </p>
        )}
      </div>

      <div className="post-comments">
        <PostCaption isHome={true} username={username} caption={caption} />
        {commentCount > 2 && (
          <NavLink className="show-more-comments" to={`/post/${id}`}>
            View all {commentCount} comments
          </NavLink>
        )}
        {/* <PostComment username={username} isHome={true} /> */}
        {comments.map((c) => (
          <PostComment
            username={c.username}
            avatar={c.avatar}
            text={c.text}
            isCommentLiked={c.isLiked}
            isHome={true}
            key={c.id}
            id={c.id}
          />
        ))}
        <p className="date">{formatDatePost(date)}</p>
      </div>

      {allowComment && (
        <PostAddComment postId={id} addPostComment={addPostComment} />
      )}
    </div>
  );
};

export default HomePost;
