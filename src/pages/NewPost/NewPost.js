import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import NavIcon from "../../components/NavIcon";

import "./NewPost.css";

const BackButtonIcon = () => (
  <NavIcon ariaLabel="Back" height="24" width="24" />
);

const NewPostFilters = ({ image, setImageFilter, name, imageFilter }) => {
  return (
    <li onClick={() => setImageFilter(filters[name])}>
      <span className={imageFilter === filters[name] ? "active" : ""}>
        {name}
      </span>
      <img
        style={{ filter: filters[name] }}
        src={image}
        alt={`${name} filter`}
      />
    </li>
  );
};

const filters = {
  Normal: "none",
  Clarendon: "saturate(2)",
  Gingham: "contrast(0.7) saturate(1.5)",
  Moon: "grayscale(1)",
  Lark: "saturate(1.6) hue-rotate(15deg)",
  Reyes: "contrast(0.7)",
  Juno: "hue-rotate(-20deg)",
};

const filtersArray = [
  "Normal",
  "Clarendon",
  "Gingham",
  "Moon",
  "Lark",
  "Reyes",
  "Juno",
];

const PostUpload = ({ location }) => {
  const [image, setImage] = useState();
  const [isImage, setIsImage] = useState(true);
  const [rotateImage, setRotateImage] = useState(0);
  const [imageFilter, setImageFilter] = useState(filters["Normal"]);
  const [page, setPage] = useState("filters");
  const history = useHistory();

  useEffect(() => {
    if (typeof location.state === "undefined") {
      setIsImage(false);
    } else {
      setImage(location.state.image);
    }
    setIsImage(false);
  }, [location]);

  if (!isImage & !image) {
    return <Redirect to="/" />;
  }

  const rotateImageHandler = () => {
    setRotateImage(rotateImage + 90);
  };

  if (page === "filters") {
    return (
      <div className="new-post">
        {image && (
          <>
            <div className="new-post__header">
              <button onClick={() => history.goBack()} className="close">
                ✕
              </button>
              <h3>New Post</h3>
              <button onClick={() => setPage("caption")} className="next">
                Next
              </button>
            </div>
            <div className="new-post__preview">
              <img
                style={{
                  transform: `rotate(${rotateImage}deg)`,
                  filter: imageFilter,
                }}
                src={image}
                alt=""
              />
              <button onClick={rotateImageHandler} className="rotate">
                <span></span>
              </button>
            </div>
            <ul className="new-post__filter">
              {filtersArray.map((filter) => (
                <NewPostFilters
                  image={image}
                  setImageFilter={setImageFilter}
                  name={filter}
                  imageFilter={imageFilter}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    );
  }

  if (page === "caption") {
    return (
      <div className="new-post options">
        <div className="new-post__header">
          <button onClick={() => setPage("filters")} className="close back">
            <span
              style={{ display: "inline-block", transform: "rotate(270deg)" }}
            >
              <BackButtonIcon />
            </span>
          </button>
          <h3>New Post</h3>
          <button className="next">Share</button>
        </div>
        <div className="new-post__caption">
          <div className="post-avatar">
            <img src="./default-avatar.jpg" alt="Avatar" />
          </div>
          <textarea autofocus placeholder="Write a caption..."></textarea>
          <div className="post-preview">
            <img
              src={image}
              alt=""
              style={{
                transform: `rotate(${rotateImage}deg)`,
                filter: imageFilter,
              }}
            />
          </div>
        </div>
        <div className="new-post__options">
          <button className="tag-people">
            <span>Tag People</span>
            <span
              style={{ display: "inline-block", transform: "rotate(90deg)" }}
            >
              <BackButtonIcon />
            </span>
          </button>
          <p onClick={() => setPage("advanced")} className="advanced">
            Advanced Setting
          </p>
        </div>
      </div>
    );
  }

  if (page === "advanced") {
    return (
      <div className="new-post advanced">
        <div style={{ border: "1px solid #dbdbdb" }}>
          <div className="new-post__header">
            <button onClick={() => setPage("caption")} className="close back">
              <span
                style={{ display: "inline-block", transform: "rotate(270deg)" }}
              >
                <BackButtonIcon />
              </span>
            </button>
            <h3>Advanced Setting</h3>
          </div>
          <h4>Comments</h4>
          <div className="new-post__options">
            <button>
              <span>Turn Off Commenting</span>
              <span
                style={{ display: "inline-block", transform: "rotate(90deg)" }}
              >
                <BackButtonIcon />
              </span>
            </button>
            <p>
              You can change this later by going to the menu at the top of your
              post.
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default PostUpload;
