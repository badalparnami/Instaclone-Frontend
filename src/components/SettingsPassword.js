import React, { useState, useEffect } from "react";

import SettingsFormGroup from "./SettingsFormGroup";
import useReq from "../hooks/useReq";
import Loader from "./Loader/Loader";

const SettingsPassword = ({ username, avatar }) => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");

  const {
    setError,
    requestData,
    response,
    clear,
    error,
    alertHandler,
    loading,
  } = useReq();

  useEffect(() => {
    if (response !== null) {
      alertHandler("Password changed.");
      setConfirmNewPass("");
      setNewPass("");
      setOldPass("");
      clear();
    }
  }, [response]);

  useEffect(() => {
    if (error !== null) {
      alertHandler(error);
    }
  }, [error]);

  const onSubmitHandler = (e) => {
    setError(null);
    e.preventDefault();
    if (
      !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(oldPass) ||
      !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(newPass) ||
      !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(confirmNewPass)
    ) {
      setError(
        "Password should be of atleast 6 characters containing atleast 1 uppercase, 1 lowercase and 1 number"
      );
      return;
    }

    if (newPass !== confirmNewPass) {
      setError("Please make sure both passwords match.");
      return;
    }

    requestData("post", "user/password", {
      pass: oldPass,
      newPass,
      confirmNewPass,
    });
  };

  return (
    <div className="settings-content">
      <div className="img-container">
        <div className="img">
          <img
            src={
              avatar
                ? avatar
                : `${process.env.PUBLIC_URL}/images/default-avatar290.jpg`
            }
            alt=""
            width="100%"
            height="100%"
            style={{ borderRadius: "100%" }}
          />
        </div>
        <div className="settings_username">
          <h1>{username}</h1>
        </div>
      </div>

      <form className="password-change" onSubmit={onSubmitHandler}>
        <SettingsFormGroup
          label="Old Password"
          type="password"
          isRequired={true}
          value={oldPass}
          onChange={setOldPass}
          extras={{
            minLength: 6,
            maxLength: 30,
            pattern: "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}",
            title:
              "Password should be of atleast 6 characters containing atleast 1 uppercase, 1 lowercase and 1 number",
          }}
        />

        <SettingsFormGroup
          label="New Password"
          type="password"
          isRequired={true}
          value={newPass}
          onChange={setNewPass}
          extras={{
            minLength: 6,
            maxLength: 30,
            pattern: "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}",
            title:
              "Password should be of atleast 6 characters containing atleast 1 uppercase, 1 lowercase and 1 number",
          }}
        />

        <SettingsFormGroup
          label="Confirm New Password"
          type="password"
          isRequired={true}
          value={confirmNewPass}
          onChange={setConfirmNewPass}
          extras={{
            minLength: 6,
            maxLength: 30,
            pattern: "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}",
            title:
              "Password should be of atleast 6 characters containing atleast 1 uppercase, 1 lowercase and 1 number",
          }}
        />

        <SettingsFormGroup>
          <button disabled={loading}>
            Change Password {loading && <Loader />}
          </button>
        </SettingsFormGroup>
      </form>
    </div>
  );
};

export default SettingsPassword;
