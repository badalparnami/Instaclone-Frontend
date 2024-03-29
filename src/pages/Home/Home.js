import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Home.css";
import { NavLink } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "react-loading-skeleton";

import SuggestionCard from "../../components/SuggestionCard";
import HomePost from "../../components/HomePost";
import useReq from "../../hooks/useReq";
import Suggestions from "../Suggestions/Suggestions";

import defaultAvatar from "../../assets/default-avatar.jpg";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const Home = () => {
  const { requestData, response, clear, loading } = useReq();
  const [homePosts, setHomePosts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const [total, setTotal] = useState(null);
  const [curPage, setCurPage] = useState(0);

  const profileData = useSelector((state) => state.profile);

  const {
    requestData: requestDataS,
    response: responseS,
    loading: loadingS,
    clear: clearS,
  } = useReq();

  useEffect(() => {
    document.title = "Instagram";
  }, []);

  useEffect(() => {
    fetchMoreData();
  }, []);

  useEffect(() => {
    if (response !== null) {
      setHomePosts([...homePosts, ...response.posts]);
      if (response.posts.length === 0 && total === null) {
        requestDataS("get", "user/suggestions/20");
      } else {
        requestDataS("get", "user/suggestions/5");
      }
      if (total === null) {
        setTotal(response.total);
      }
      setCurPage((prev) => prev + 1);
      clear();
    }
  }, [response]);

  useEffect(() => {
    if (responseS !== null) {
      const suggestions = responseS.users;
      shuffleArray(suggestions);
      setSuggestions(suggestions);
      clearS();
    }
  }, [responseS]);

  const fetchMoreData = () => {
    requestData("get", `post/feed/${curPage}`);
  };

  if (loading && total === null) {
    return (
      <div className="home-page">
        <div className="post-feed">
          <Skeleton height={550} />
        </div>
        <div className="sidebar">
          <div className="user-card">
            <Skeleton circle={true} height={50} width={50} />
          </div>
          <div style={{ lineHeight: "2" }}>
            <Skeleton count={5} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {homePosts && homePosts.length > 0 && (
        <div className="home-page">
          <div className="post-feed">
            <InfiniteScroll
              dataLength={homePosts.length}
              next={fetchMoreData}
              hasMore={total > homePosts.length}
              //   loader={<h4>Loading...</h4>}
            >
              {homePosts.map((p) => (
                <HomePost
                  id={p.id}
                  media={p.media}
                  caption={p.caption}
                  allowComment={p.allowComment}
                  styles={p.styles}
                  date={p.date}
                  likeCount={p.likeCount}
                  username={p.creatorUsername}
                  avatar={p.avatar}
                  commentCount={p.commentCount}
                  comments={p.comment}
                  isSaved={p.isSaved}
                  isLiked={p.isLiked}
                  key={p.id}
                  userAvatar={profileData.avatar}
                  userUsername={profileData.username}
                />
              ))}
            </InfiniteScroll>
          </div>

          <div className="sidebar">
            <div className="user-card">
              <NavLink to="/profile">
                <img
                  alt=" "
                  data-testid="user-avatar"
                  draggable="false"
                  src={
                    profileData.avatar
                      ? profileData.avatar
                      : // : `${process.env.PUBLIC_URL}/images/default-avatar.jpg`
                        defaultAvatar
                  }
                />
              </NavLink>
              <div className="username">
                <NavLink to="/profile">{profileData.username}</NavLink>
              </div>
            </div>
            {loadingS && <Skeleton count={5} />}
            {suggestions && suggestions.length > 0 && (
              <div className="suggestions-page small">
                <h1>Suggestions For You</h1>
                <div className="suggestions-card">
                  {suggestions.map((u) => (
                    <SuggestionCard
                      avatar={u.avatar}
                      name={u.name}
                      username={u.username}
                      key={u.username}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {homePosts && homePosts.length === 0 && loadingS && (
        <div className="suggestions-page large" style={{ lineHeight: "3" }}>
          <Skeleton count={10} />
        </div>
      )}

      {homePosts &&
        homePosts.length === 0 &&
        suggestions &&
        suggestions.length > 0 && <Suggestions suggestions={suggestions} />}
    </>
  );
};

export default Home;
