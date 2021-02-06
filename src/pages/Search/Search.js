import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../Activity/Activity.css";

import SearchUserCard from "../../components/SearchUserCard";
import useReq from "../../hooks/useReq";

const Search = ({ value, onClick, closeMe }) => {
  const { requestData, response, clear } = useReq();
  const history = useHistory();

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

  const redirectToProfile = (username) => {
    history.push(`/${username}`);
    closeMe("");
  };

  return (
    <div className="popup-card">
      {response && (
        <ul>
          {response.users.map((u) => (
            <SearchUserCard
              username={u.username}
              name={u.name}
              key={u.username}
              onClick={onClick || redirectToProfile}
              avatar={u.avatar}
              mention={u.mention}
              tag={u.tag}
              relation={u.relation}
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
