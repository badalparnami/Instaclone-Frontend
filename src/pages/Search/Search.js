import React from "react";
import "../Activity/Activity.css";

import SearchUserCard from "../../components/SearchUserCard";

const Search = ({ value }) => {
  return (
    <div className="popup-card">
      {value === "check" && (
        <ul>
          <SearchUserCard />
          <SearchUserCard />
          <SearchUserCard />
          <SearchUserCard />
        </ul>
      )}
      {value !== "check" && (
        <p style={{ padding: "2rem", textAlign: "center", color: "#999" }}>
          No Results found.
        </p>
      )}
    </div>
  );
};

export default Search;
