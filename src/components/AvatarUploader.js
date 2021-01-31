import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import useReq from "../hooks/useReq";
import { updateProfile } from "../store/actions/profile";

import Modal from "./Modal/Modal";

const AvatarUploader = ({
  makeMeFalse,
  openPicker,
  avatarOptions,
  setAvatarOptions,
}) => {
  const [file, setFile] = useState(null);
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const { response, requestData, clear } = useReq();
  const {
    response: responseRemAvatar,
    requestData: requestDataRemAvatar,
    clear: clearRemAvatar,
  } = useReq();

  useEffect(() => {
    if (openPicker) {
      filePickerRef.current.click();
      makeMeFalse(false);
    }
  }, [openPicker, makeMeFalse]);

  useEffect(() => {
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      requestData("post", "user/avatar", formData);
      setFile(null);
    }
  }, [file]);

  useEffect(() => {
    if (response !== null) {
      dispatch(updateProfile({ avatar: response.avatar }));
      clear();
    }
  }, [response]);

  useEffect(() => {
    if (responseRemAvatar !== null) {
      dispatch(updateProfile({ avatar: null }));
      clearRemAvatar();
    }
  }, [responseRemAvatar]);

  const pickedHandler = (event) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
    }
  };

  const removeAvatar = () => {
    requestDataRemAvatar("delete", "user/avatar");
  };

  return (
    <>
      <input
        ref={filePickerRef}
        type="file"
        style={{ display: "none" }}
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      {avatarOptions && (
        <Modal onClick={setAvatarOptions} isUser={true} isOptions={true}>
          <h4
            style={{
              fontWeight: 600,
              fontSize: "1.8rem",
              padding: "2.5rem",
            }}
            className="unfollow-popup"
          >
            Change Profile Photo
          </h4>

          <button
            onClick={() => {
              makeMeFalse(true);
              setAvatarOptions(false);
            }}
            className="blue-option"
          >
            Upload Photo
          </button>
          <button
            onClick={() => {
              removeAvatar();
              setAvatarOptions(false);
            }}
            className="red-option"
          >
            Remove Current Photo
          </button>
        </Modal>
      )}
    </>
  );
};

export default AvatarUploader;
