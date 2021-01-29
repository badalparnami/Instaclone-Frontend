import React from "react";
import "./Suggestions.css";

import SuggestionCard from "../../components/SuggestionCard";

const Suggestions = () => {
  return (
    <div class="suggestions-page large">
      <h1>Suggestions For You</h1>
      <div class="suggestions-card">
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
      </div>
    </div>
  );
};

export default Suggestions;
