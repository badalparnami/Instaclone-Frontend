import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";

const ImageUploader = ({ makeMeFalse, openPicker, redirect, setRedirect }) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const filePickerRef = useRef();

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
        fileReader.onload = () => {
          resolve(setPreviewUrl(fileReader.result));
        };

        fileReader.readAsDataURL(file);
      });
    };

    const helper = async () => {
      await processFile();
      setRedirect(true);
    };

    helper();
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
          state: { image: previewUrl },
        }}
      />
    );
  }

  return (
    <input
      ref={filePickerRef}
      type="file"
      style={{ display: "none" }}
      accept=".jpg,.png,.jpeg"
      onChange={pickedHandler}
    />
  );
};

export default ImageUploader;
