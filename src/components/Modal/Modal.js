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
  styles,
}) => {
  const root = document.body;

  useEffect(() => {
    root.style.overflow = "hidden";
  }, []);

  return (
    <div
      id="myModal"
      className="modal animation-1"
      style={{ ...styles }}
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
                !closeOnClick && (root.style.overflow = "auto");
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
