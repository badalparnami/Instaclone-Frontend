import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useReq from "../hooks/useReq";
import ImageWOverlay from "./ImageWOverlay";

const InfiniteData = ({ detail, children, isUser, username }) => {
  const [total, setTotal] = useState(null);
  const [curPage, setCurPage] = useState(0);
  const [data, setData] = useState([]);
  const { requestData, response, clear } = useReq();

  useEffect(() => {
    fetchMoreData();
  }, [detail]);

  useEffect(() => {
    if (response !== null) {
      setData([...data, ...response.detail]);
      if (total === null) {
        setTotal(response.total);
      }
      setCurPage((prev) => prev + 1);
      clear();
    }
  }, [response]);

  const fetchMoreData = () => {
    if (isUser) {
      requestData("get", `user/data/${username}/${detail}/${curPage}`);
    } else {
      requestData("get", `user/details/${detail}/${curPage}`);
    }
  };

  return (
    <>
      {data.length > 0 && (
        <InfiniteScroll
          dataLength={data.length}
          next={fetchMoreData}
          hasMore={total > data.length}
          //   loader={<h4>Loading...</h4>}
        >
          <div className={`profile-images`}>
            {data.map((p) => (
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
      {data.length === 0 && total !== null && children}
    </>
  );
};

export default InfiniteData;
