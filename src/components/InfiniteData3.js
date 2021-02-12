import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useReq from "../hooks/useReq";
import SuggestionCard from "./SuggestionCard";
import Skeleton from "react-loading-skeleton";

const InfiniteData3 = ({ detail, children }) => {
  const [total, setTotal] = useState(null);
  const [curPage, setCurPage] = useState(0);
  const [data, setData] = useState([]);
  const { requestData, response, clear, loading } = useReq();

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
    requestData("get", `user/details/${detail}/${curPage}`);
  };

  return (
    <>
      {loading && total === null && (
        <div className="suggestions-page large" style={{ lineHeight: "3" }}>
          {/* {placeholderArr.map((a) => (
            <Skeleton height={25} />
          ))} */}
          <Skeleton height={35} count={5} />
        </div>
      )}

      {data.length > 0 && (
        <InfiniteScroll
          dataLength={data.length}
          next={fetchMoreData}
          hasMore={total > data.length}
          //   loader={<h4>Loading...</h4>}
        >
          <div className="suggestions-page large">
            <div className="suggestions-card">
              {data.map((u) => (
                <SuggestionCard
                  avatar={u.avatar}
                  name={u.name}
                  username={u.username}
                  key={u.username}
                  relation={u.relation}
                />
              ))}
            </div>
          </div>
        </InfiniteScroll>
      )}
      {data.length === 0 && total !== null && children}
    </>
  );
};

export default InfiniteData3;
