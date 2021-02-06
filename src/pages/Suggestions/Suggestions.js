import React from "react";
import "./Suggestions.css";

import SuggestionCard from "../../components/SuggestionCard";

const Suggestions = ({ suggestions }) => {
  return (
    <div className="suggestions-page large">
      <h1>Suggestions For You</h1>
      <div className="suggestions-card">
        {suggestions.map((u) => (
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
  );
};

export default Suggestions;
