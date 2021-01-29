import React from "react";
import "./Home.css";

import SuggestionCard from "../../components/SuggestionCard";
import HomePost from "../../components/HomePost";

const Home = () => {
  return (
    <div className="home-page">
      <div className="post-feed">
        <HomePost />
        <HomePost commentsCount={5} />
      </div>

      <div className="sidebar">
        <div className="user-card">
          <a href="">
            <img
              alt="bayer.tierra6355's profilePicture"
              data-testid="user-avatar"
              draggable="false"
              src="https://instagram.fbtz1-10.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fbtz1-10.fna.fbcdn.net&amp;_nc_ohc=aIFqrTzPvM8AX9PoqJX&amp;oh=452f5b8992811b51b13dfcbe9fc71702&amp;oe=6034650F&amp;ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2"
            />
          </a>
          <div className="username">
            <a href="">bayer</a>
          </div>
        </div>
        <div className="suggestions-page small">
          <h1>Suggestions For You</h1>
          <div className="suggestions-card">
            <SuggestionCard />
            <SuggestionCard />
            <SuggestionCard />
            <SuggestionCard />
            <SuggestionCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
