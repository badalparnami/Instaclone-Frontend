import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import "./NewPost.css";
import NavIcon from "../../components/NavIcon";
import NewPostAdvanced from "./NewPostAdvanced";
import NewPostCaption from "./NewPostCaption";
import NewPostFilters from "./NewPostFilters";
import NewPostTagged from "./NewPostTagged";
import useReq from "../../hooks/useReq";

export const BackButtonIcon = () => (
  <NavIcon ariaLabel="Back" height="24" width="24" />
);

const PostUpload = ({ location }) => {
  const [image, setImage] = useState();
  const [isImage, setIsImage] = useState(true);
  const [rotateImage, setRotateImage] = useState(0);
  const [imageFilter, setImageFilter] = useState("none");
  const [page, setPage] = useState("filters");

  const [caption, setCaption] = useState("");
  const [commentOff, setCommentOff] = useState(false);
  const [taggedUser, setTaggedUser] = useState([]);

  const { clear, requestData, response } = useReq();
  const history = useHistory();
  const { avatar } = useSelector((state) => state.profile);

  useEffect(() => {
    if (typeof location.state === "undefined") {
      setIsImage(false);
    } else {
      setImage(location.state.image);
    }
    setIsImage(false);
  }, [location]);

  useEffect(() => {
    if (response !== null) {
      history.push(`/post/${response.postId}`);
    }
    return () => clear();
  }, [response]);

  if (!isImage & !image) {
    return <Redirect to="/" />;
  }

  const rotateImageHandler = () => {
    setRotateImage(rotateImage + 90);
  };

  const onSubmitHandler = () => {
    const cc = caption.split(" ");

    const hash = cc
      .filter((c) => c.startsWith("#"))
      .map((h) => h.slice(1))
      .filter((f) => f.length > 0);

    const styles = {
      transform: `rotate(${rotateImage})deg`,
      filter: imageFilter,
    };

    const unique = [...new Set(hash)];

    const formData = new FormData();
    formData.append("image", location.state.file);
    formData.append("caption", caption);
    formData.append("allowComment", !commentOff);
    formData.append("tag", JSON.stringify(taggedUser));
    formData.append("styles", JSON.stringify(styles));
    formData.append("hashTag", JSON.stringify(unique));

    requestData("post", "post/create", formData);
  };

  if (page === "filters") {
    return (
      <NewPostFilters
        image={image}
        imageFilter={imageFilter}
        rotateImage={rotateImage}
        rotateImageHandler={rotateImageHandler}
        setImageFilter={setImageFilter}
        setPage={setPage}
      />
    );
  }

  if (page === "caption") {
    return (
      <NewPostCaption
        image={image}
        imageFilter={imageFilter}
        rotateImage={rotateImage}
        setCaption={setCaption}
        setPage={setPage}
        taggedUser={taggedUser}
        onSubmitHandler={onSubmitHandler}
        caption={caption}
        avatar={avatar}
      />
    );
  }

  if (page === "advanced") {
    return (
      <NewPostAdvanced
        commentOff={commentOff}
        setCommentOff={setCommentOff}
        setPage={setPage}
      />
    );
  }

  if (page === "tagged") {
    return (
      <NewPostTagged
        setPage={setPage}
        setTaggedUser={setTaggedUser}
        taggedUser={taggedUser}
      />
    );
  }
};

export default PostUpload;
