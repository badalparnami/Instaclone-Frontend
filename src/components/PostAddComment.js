import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { NavLink } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import useReq from "../hooks/useReq";
import { updateComment } from "../store/actions/comment";
import Loader from "./Loader/Loader";
import Search from "../pages/Search/Search";
import PopupHelper from "./PopupHelper";

let PostAddComment = ({ postId, addPostComment }, ref) => {
  const [commentValue, setCommentValue] = useState("");
  const { requestData, response, clear, loading, alertHandler } = useReq();
  const [mention, setMention] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const commentData = useSelector((state) => state.comment);
  const { loggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const insideRef = useRef();

  useEffect(() => {
    if (mention !== null) {
      setIsSearchOpen(true);
    } else {
      setIsSearchOpen(false);
    }
  }, [mention]);

  useEffect(() => {
    if (response !== null) {
      if (commentData.commentId) {
        dispatch(
          updateComment({
            id: response.id,
            text: response.text,
            date: response.date,
          })
        );
      } else {
        addPostComment(response.commentId, response.text, response.date);
      }
      clear();
      setCommentValue("");
    }
  }, [response]);

  //Trying to change the value from other components but didn't worked. Used useImperativeHandle hook but still not able to change. Figured out dispatch was the real culprit (didn't know how), to overcome the problem used setTimeout to change the value. I think without useImperativeHandle hook value can be changed now.
  useImperativeHandle(ref, () => ({
    changeValue: (newValue) => {
      insideRef.current.value = newValue;
    },
    focus: () => {
      insideRef.current.focus();
    },
  }));

  const submitComment = () => {
    if (commentValue.trim().length < 1) {
      return;
    }

    if (commentData.commentId) {
      requestData("post", "commentreply/create", {
        comment: commentData.commentId,
        text: commentValue,
      });
    } else {
      requestData("post", "comment/create", {
        postid: postId,
        text: commentValue,
      });
    }
  };

  const valueHandler = (e) => {
    setCommentValue(e.target.value);

    let isMention = e.target.value.match(new RegExp(/@[a-zA-Z0-9]+$/));

    if (isMention) {
      setMention(isMention[0].substring(1));
    }
  };

  const selectedUser = (username, m, t, r) => {
    if (m === "everyone" || (m === "follow" && r === true)) {
      setCommentValue(commentValue.replace(mention, username));
      setMention(null);
    } else {
      alertHandler(`Can not mention ${username} as it is not allowed.`);
    }
  };

  return (
    <div className="post-add_comment">
      {loggedIn ? (
        <>
          <input
            ref={insideRef}
            placeholder="Add a comment..."
            type="text"
            value={commentValue}
            // onChange={(e) => setCommentValue(e.target.value)}
            onChange={valueHandler}
            onKeyPress={(e) => (e.key === "Enter" ? submitComment() : "")}
          />
          {isSearchOpen && (
            <PopupHelper
              isPopupOpen={isSearchOpen}
              setIsPopupOpen={setIsSearchOpen}
              isProfile={true}
            >
              <Search value={mention} onClick={selectedUser} />
            </PopupHelper>
          )}
          <button disabled={loading} onClick={submitComment}>
            Post {loading && <Loader />}
          </button>
        </>
      ) : (
        <span style={{ fontSize: "1.4rem", fontWeight: 400, color: "#adadad" }}>
          <NavLink to="/" style={{ textDecoration: "none" }} color="#8e8e8e">
            Log in{" "}
          </NavLink>
          to like or comment.
        </span>
      )}
    </div>
  );
};

PostAddComment = forwardRef(PostAddComment);

export default PostAddComment;
