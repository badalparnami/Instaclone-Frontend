import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "react-loading-skeleton";

import useReq from "../../hooks/useReq";

import "./Explore.css";

import ImageWOverlay from "../../components/ImageWOverlay";

const placeholderArr = [0, 1, 2, 3];

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const Explore = () => {
  const [total, setTotal] = useState(null);
  const [curPage, setCurPage] = useState(0);
  const [data, setData] = useState([]);
  const { requestData, response, clear, loading } = useReq();

  useEffect(() => {
    document.title = "Instagram";
  }, []);

  useEffect(() => {
    fetchMoreData();
  }, []);

  useEffect(() => {
    if (response !== null) {
      const posts = response.detail;
      shuffleArray(posts);
      setData([...data, ...posts]);
      if (total === null) {
        setTotal(response.total);
      }
      setCurPage((prev) => prev + 1);
      clear();
    }
  }, [response]);

  const fetchMoreData = () => {
    requestData("get", `post/explore/${curPage}`);
  };

  return (
    <>
      {loading && (
        <main className="explore-page profile-images">
          <Skeleton height={200} />
          <Skeleton height={440} />
          {placeholderArr.map((a) => (
            <Skeleton key={a} height={200} />
          ))}
        </main>
      )}
      {setData.length > 0 && (
        <InfiniteScroll
          dataLength={data.length}
          next={fetchMoreData}
          hasMore={total > data.length}
          //   loader={<h4>Loading...</h4>}
        >
          <main className="explore-page profile-images">
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
          </main>
        </InfiniteScroll>
      )}
      {/* {setData.length === 0 && total !== null && <></>} */}
    </>
  );
};

export default Explore;
