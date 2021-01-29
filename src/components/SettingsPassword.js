import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import SettingsFormGroup from "./SettingsFormGroup";
import { logoutAsync } from "../store/actions/auth";

const SettingsPassword = ({ username }) => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

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
      setError("New Password and Confirm new password doesn't match");
      return;
    }

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/user/password`,
        {
          pass: oldPass,
          newPass,
          confirmNewPass,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setNewPass("");
        setConfirmNewPass("");
        setOldPass("");
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 401) {
            dispatch(logoutAsync(token));
          } else {
            setError(err.response.data.message);
          }
        } else if (err.request) {
          setError("Slow Network Speed. Try Again later.");
        } else {
          setError("Oops!! Unusual error occurred");
        }
      });
  };

  return (
    <div className="settings-content">
      <div className="img-container">
        <div className="img">
          <img
            src="../../images/default-avatar290.jpg"
            alt=""
            width="100%"
            height="100%"
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
          <button>Change Password</button>
        </SettingsFormGroup>
      </form>
    </div>
  );
};

export default SettingsPassword;
