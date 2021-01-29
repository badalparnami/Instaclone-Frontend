import React from "react";

const SuggestionCard = () => {
  return (
    <div className="suggestion-card">
      <a href="#" className="avatar">
        <img
          src="https://res.cloudinary.com/drwb19czo/image/upload/v1606365556/oee6lxiuot8wwaxk8r2h.jpg"
          alt="Avatar"
        />
      </a>
      <div className="user-details">
        <a href="#">Kajal</a>
        <p>gunda raaj</p>
      </div>
      <button>Follow</button>
      {/* className = "active" */}
    </div>
  );
};

export default SuggestionCard;
