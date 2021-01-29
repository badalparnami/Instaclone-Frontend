import React, { useEffect } from "react";
import "./Modal.css";

const Modal = ({
  onClick,
  headingMain,
  headingSub,
  content,
  children,
  isUser,
  isOptions,
  closeOnClick,
}) => {
  const root = document.body;

  useEffect(() => {
    root.style.overflow = "hidden";
  }, []);

  return (
    <div
      id="myModal"
      className="modal animation-1"
      onClick={() => {
        onClick(false);
        !closeOnClick && (root.style.overflow = "auto");
      }}
    >
      <div
        onClick={(e) => (!closeOnClick ? e.stopPropagation() : {})}
        className={`modal-content ${isUser ? "users" : ""}`}
      >
        {!isOptions && (
          <div className="header">
            <h1>{headingMain}</h1>
            <button
              onClick={() => {
                onClick(false);
                root.style.overflow = "auto";
              }}
            >
              ✕
            </button>
          </div>
        )}
        <div className={`following-overview ${isOptions ? "options" : ""}`}>
          {!children && (
            <>
              <div className="no-following-icon"></div>
              <h2>{headingSub}</h2>
              <h4>{content}</h4>
            </>
          )}
          {children}
          {children && isOptions && (
            <button
              onClick={() => {
                onClick(false);
                root.style.overflow = "auto";
                !closeOnClick && (root.style.overflow = "auto");
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* <div className="modal-content users" onClick={(e) => e.stopPropagation()}>
        <div className="header">
          <h1>Following</h1>
          <button
            onClick={() => {
              onClick(false);
              root.style.overflow = "auto";
            }}
            className="close"
          >
            ✕
          </button>
        </div>
        <div className="following-overview">
          <div className="user-card">
            <a className="avatar" href="#">
              <img
                className="avatar avatar--small"
                src="https://res.cloudinary.com/drwb19czo/image/upload/v1592143124/hkhrolzqz4zkama4uf5m.png"
                alt="Avatar"
              />
            </a>
            <div className="user-card__details">
              <a href="#"> username </a>
              <p>Name</p>
            </div>
            <button>Following</button>
          </div>

          <div className="user-card">
            <a className="avatar" href="#">
              <img
                className="avatar avatar--small"
                src="https://res.cloudinary.com/drwb19czo/image/upload/v1592143124/hkhrolzqz4zkama4uf5m.png"
                alt="Avatar"
              />
            </a>
            <div className="user-card__details">
              <a href="#"> username </a>
              <p>Name</p>
            </div>
            <button className="inactive">Follow</button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Modal;
