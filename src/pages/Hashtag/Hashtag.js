import React, { useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import useReq from "../../hooks/useReq";
import ImageWOverlay from "../../components/ImageWOverlay";
import "./Hashtag.css";

const Hashtag = () => {
  const { response, requestData, clear } = useReq();
  const [posts, setPosts] = useState([]);
  const [mainImg, setMainImg] = useState(null);
  const [total, setTotal] = useState(null);
  const [curPage, setCurPage] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    fetchMoreData();
  }, []);

  useEffect(() => {
    if (response !== null) {
      setPosts([...posts, ...response.posts]);
      setMainImg(response.main);
      if (total === null) {
        setTotal(response.total);
      }
      setCurPage((prev) => prev + 1);
      clear();
    }
  }, [response]);

  const fetchMoreData = () => {
    requestData("get", `hashtag/${id}/${curPage}`);
  };

  if (total !== null && posts.length === 0) {
    return <Redirect to="/404" />;
  }

  return (
    <div className="hashtag">
      {mainImg && (
        <div className="hashtag-header">
          <div className="hashtag-mainimg">
            <img
              src={
                mainImg.slice(0, 50) +
                "w_320,h_320,c_thumb/" +
                mainImg.slice(50)
              }
              alt=" "
            />
          </div>
          <h1>#{id}</h1>
        </div>
      )}
      {posts.length > 0 && (
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchMoreData}
          hasMore={total > posts.length}
        >
          <div className="profile-images">
            {posts.map((p) => (
              <ImageWOverlay
                commentCount={p.commentCount}
                likeCount={p.likeCount}
                media={
                  p.media.slice(0, 50) +
                  "w_640,h_640,c_thumb/" +
                  p.media.slice(50)
                }
                styles={p.styles}
                key={p.id}
                id={p.id}
              />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Hashtag;
