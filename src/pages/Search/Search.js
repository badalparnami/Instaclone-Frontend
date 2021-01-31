import React, { useEffect } from "react";
import "../Activity/Activity.css";

import SearchUserCard from "../../components/SearchUserCard";
import useReq from "../../hooks/useReq";

const Search = ({ value, onClick }) => {
  const { requestData, response, clear } = useReq();

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (value.length === 0) {
        clear();
      }
      if (value.length > 1) {
        clear();
        requestData("get", `user/search/${value}`);
      }
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [value]);

  return (
    <div className="popup-card">
      {response && (
        <ul>
          {response.users.map((u) => (
            <SearchUserCard
              username={u.username}
              name={u.name}
              key={u.username}
              onClick={onClick}
              avatar={u.avatar}
            />
          ))}
        </ul>
      )}
      {value && !response && (
        <p style={{ padding: "2rem", textAlign: "center", color: "#999" }}>
          Searching ...
        </p>
      )}
      {value && response && response.users.length === 0 && (
        <p style={{ padding: "2rem", textAlign: "center", color: "#999" }}>
          No Results Found.
        </p>
      )}
    </div>
  );
};

export default Search;
