import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";

import useReq from "../hooks/useReq";

const ImageUploader = ({ makeMeFalse, openPicker, redirect, setRedirect }) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const filePickerRef = useRef();

  const { alertHandler } = useReq();

  useEffect(() => {
    if (openPicker) {
      filePickerRef.current.click();
      makeMeFalse(false);
    }
  }, [openPicker, makeMeFalse]);

  useEffect(() => {
    if (!file) {
      return;
    }

    const processFile = () => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(setPreviewUrl(fileReader.result));
        };
      });
    };

    const helper = async () => {
      if (file.type === "image/png" || file.type === "image/jpeg") {
        await processFile();
        setRedirect(true);
      } else {
        alertHandler("Invalid type. Supported types are png and jpeg.");
        setFile(null);
      }
    };

    helper();

    return () => {
      window.URL.revokeObjectURL(previewUrl);
    };
  }, [file, setRedirect]);

  // const pickImageHandler = () => {
  //   filePickerRef.current.click();
  // };

  const pickedHandler = (event) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
    }
  };

  if (previewUrl && redirect) {
    return (
      <Redirect
        to={{
          pathname: "/newpost",
          state: { image: previewUrl, file },
        }}
      />
    );
  }

  return (
    <input
      ref={filePickerRef}
      type="file"
      style={{ display: "none" }}
      accept=".jpg,.jpeg"
      onChange={pickedHandler}
    />
  );
};

export default ImageUploader;
