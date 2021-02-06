import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useReq from "../hooks/useReq";
import Modal from "./Modal/Modal";
import ProfilePopupUserCard from "./ProfilePopupUserCard";

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