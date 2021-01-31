import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Post.css";

import PostCTA from "../../components/PostCTA";
import PostCaption from "../../components/PostCaption";
import PostComment from "../../components/PostComment";
import PostAddComment from "../../components/PostAddComment";
import PostHeader from "../../components/PostHeader";
import useReq from "../../hooks/useReq";

const Post = (props) => {
  const { loggedIn } = useSelector((state) => state.auth);
  const { requestData, response, clear } = useReq();

  const [updatedState, setUpdatedState] = useState(false);
  const [allowComment, setAllowComment] = useState(false);
  const [isArchived, setIsArchived] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (loggedIn !== undefined) {
      clear();
      setUpdatedState(false);
      requestData("get", `post/detail/${props.match.params.id}`);
    }
  }, [loggedIn]);

  useEffect(() => {
    if (response !== null && !updatedState) {
      setAllowComment(response.postDetails.allowComment);
      setIsArchived(response.postDetails.isArchived);
      setLikeCount(response.postDetails.likeCount);
      setIsLiked(response.postDetails.isLiked);
      setIsSaved(response.postDetails.isSaved);
      setUpdatedState(true);
    }
  }, [response, updatedState]);

  return (
    <main className="post-page">
      {response && (
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
            />
            <div className="post-comments">
              {response.postDetails.caption && (
                <PostCaption
                  caption={response.postDetails.caption}
                  username={response.postDetails.creatorUsername}
                />
              )}
              <PostComment />

              <div className="post-comment real">
                <a className="user-avatar" href="">
                  <img
                    alt="virat.kohli's profilePicture"
                    draggable="false"
                    src="https://instagram.fdel11-1.fna.fbcdn.net/v/t51.2885-19/s150x150/120097897_172397281086637_5031602793879746188_n.jpg?_nc_ht=instagram.fdel11-1.fna.fbcdn.net&amp;_nc_ohc=dBwUjVtwxNUAX-1aZEw&amp;tp=1&amp;oh=c49552f8616605bbce2acd9a255560ff&amp;oe=6032E336"
                  />
                </a>
                <div className="comment-details">
                  <p>
                    <a href="#" className="username">
                      virat.kohli
                    </a>
                    <span>
                      WHAT A WIN!!! Well done to all the boys and the
                      management. Enjoy this historic feat lads. Cheers 👏🏼🇮🇳
                    </span>
                  </p>
                  <div className="comment-stats">
                    <p className="time">1d</p>
                    <p className="like-details">1 like</p>
                    <button>Reply</button>
                  </div>
                  <p className="view-reply">
                    <span className="dash large"></span>
                    View replies (7)
                  </p>
                </div>
                <div className="comment-like">
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
              </div>
              <div className="post-comment real">
                <a className="user-avatar" href="">
                  <img
                    alt="virat.kohli's profilePicture"
                    draggable="false"
                    src="https://instagram.fdel11-1.fna.fbcdn.net/v/t51.2885-19/s150x150/120097897_172397281086637_5031602793879746188_n.jpg?_nc_ht=instagram.fdel11-1.fna.fbcdn.net&amp;_nc_ohc=dBwUjVtwxNUAX-1aZEw&amp;tp=1&amp;oh=c49552f8616605bbce2acd9a255560ff&amp;oe=6032E336"
                  />
                </a>
                <div className="comment-details">
                  <p>
                    <a href="#" className="username">
                      virat.kohli
                    </a>
                    <span>
                      WHAT A WIN!!! Well done to all the boys and the
                      management. Enjoy this historic feat lads. Cheers 👏🏼🇮🇳
                    </span>
                  </p>
                  <div className="comment-stats">
                    <p className="time">1d</p>
                    <p className="like-details">1 like</p>
                    <button>Reply</button>
                  </div>
                  <p className="view-reply">
                    <span className="dash large"></span>
                    Hide replies
                  </p>
                </div>
                <div className="comment-like">
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
              </div>
              <PostComment isReply={true} />
              <div className="post-comment real is-reply">
                <a className="user-avatar" href="">
                  <img
                    alt="virat.kohli's profilePicture"
                    draggable="false"
                    src="https://instagram.fdel11-1.fna.fbcdn.net/v/t51.2885-19/s150x150/120097897_172397281086637_5031602793879746188_n.jpg?_nc_ht=instagram.fdel11-1.fna.fbcdn.net&amp;_nc_ohc=dBwUjVtwxNUAX-1aZEw&amp;tp=1&amp;oh=c49552f8616605bbce2acd9a255560ff&amp;oe=6032E336"
                  />
                </a>
                <div className="comment-details">
                  <p>
                    <a href="#" className="username">
                      virat.kohli
                    </a>
                    <span>
                      WHAT A WIN!!! Well done to all the boys and the
                      management. Enjoy this historic feat lads. Cheers 👏🏼🇮🇳
                    </span>
                  </p>
                  <div className="comment-stats">
                    <p className="time">1d</p>
                    <p className="like-details">1 like</p>
                    <button>Reply</button>
                  </div>
                </div>
                <div className="comment-like">
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
              </div>
              <div className="post-comment real">
                <a className="user-avatar" href="">
                  <img
                    alt="virat.kohli's profilePicture"
                    draggable="false"
                    src="https://instagram.fdel11-1.fna.fbcdn.net/v/t51.2885-19/s150x150/120097897_172397281086637_5031602793879746188_n.jpg?_nc_ht=instagram.fdel11-1.fna.fbcdn.net&amp;_nc_ohc=dBwUjVtwxNUAX-1aZEw&amp;tp=1&amp;oh=c49552f8616605bbce2acd9a255560ff&amp;oe=6032E336"
                  />
                </a>
                <div className="comment-details">
                  <p>
                    <a href="#" className="username">
                      virat.kohli
                    </a>
                    <span>
                      WHAT A WIN!!! Well done to all the boys and the
                      management. Enjoy this historic feat lads. Cheers 👏🏼🇮🇳
                    </span>
                  </p>
                  <div className="comment-stats">
                    <p className="time">1d</p>
                    <p className="like-details">1 like</p>
                    <button>Reply</button>
                  </div>
                </div>
                <div className="comment-options">
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
                <div className="comment-like">
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
              </div>
            </div>

            <div className="post-stats">
              <PostCTA
                isSaved={isSaved}
                isLiked={isLiked}
                setIsLiked={setIsLiked}
                setIsSaved={setIsSaved}
                postId={props.match.params.id}
                setLikeCount={setLikeCount}
              />
              {likeCount > 0 && (
                <p className="like-count">
                  {likeCount}
                  {likeCount > 1 ? " likes" : " like"}
                </p>
              )}

              <p className="date">January 6</p>
            </div>

            <PostAddComment />
          </div>
        </div>
      )}
    </main>
  );
};

export default Post;
