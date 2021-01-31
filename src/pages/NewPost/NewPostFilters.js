import React from "react";
import { useHistory } from "react-router-dom";

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

const NewPostFilter = ({ image, setImageFilter, name, imageFilter }) => {
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

const NewPostFilters = ({
  setPage,
  rotateImage,
  imageFilter,
  image,
  rotateImageHandler,
  setImageFilter,
}) => {
  const history = useHistory();

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
            {filtersArray.map((filter, id) => (
              <NewPostFilter
                image={image}
                setImageFilter={setImageFilter}
                name={filter}
                imageFilter={imageFilter}
                key={id}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default NewPostFilters;
