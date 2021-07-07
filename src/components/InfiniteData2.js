import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useReq from "../hooks/useReq";
import Modal from "./Modal/Modal";
import ProfilePopupUserCard from "./ProfilePopupUserCard";
import Skeleton from "react-loading-skeleton";

const placeholderArr = [0, 1, 2, 3];

const InfiniteData2 = ({
  detail,
  onClickFn,
  headingMain,
  isUser,
  username,
}) => {
  const [total, setTotal] = useState(null);
  const [curPage, setCurPage] = useState(0);
  const [data, setData] = useState([]);
  const { requestData, response, clear, loading } = useReq();

  const root = document.body;

  useEffect(() => {
    fetchMoreData();

    return () => {
      onClickFn(false);
      root.style.overflow = "auto";
    };
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
      {loading && total === null && (
        <div style={{ lineHeight: "2" }}>
          <Modal
            onClick={onClickFn}
            headingMain={headingMain}
            isOptions={false}
            isUser={true}
          >
            {placeholderArr.map((a) => (
              <Skeleton key={a} height={27} width={370} />
            ))}
          </Modal>
        </div>
      )}

      {data.length > 0 && (
        <InfiniteScroll
          dataLength={data.length}
          next={fetchMoreData}
          hasMore={total > data.length}
        >
          <Modal
            onClick={onClickFn}
            headingMain={headingMain}
            isOptions={false}
            isUser={true}
          >
            {data.map((f) => (
              <ProfilePopupUserCard
                name={f.name}
                username={f.username}
                relation={f.relation}
                key={f.username}
                avatar={f.avatar}
              />
            ))}
          </Modal>
        </InfiniteScroll>
      )}
    </>
  );
};

export default InfiniteData2;
