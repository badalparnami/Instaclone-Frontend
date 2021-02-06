import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import SettingsFormGroup from "./SettingsFormGroup";
import { updateProfile } from "../store/actions/profile";
import Modal from "./Modal/Modal";
import useReq from "../hooks/useReq";
import AvatarUploader from "./AvatarUploader";
import Loader from "./Loader/Loader";

function validURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

const notAllowedUsernames = [
  "signup",
  "profile",
  "explore",
  "post",
  "newpost",
  "404",
];

const SettingsEditProfile = ({
  nameP,
  usernameP,
  websiteP,
  bioP,
  emailP,
  lastUsername,
  isUsernameChangeAllowed,
  avatar,
}) => {
  const [name, setName] = useState(nameP);
  const [username, setUsername] = useState(usernameP);
  const [website, setWebsite] = useState(websiteP ? websiteP : "");
  const [bio, setBio] = useState(bioP ? bioP : "");
  const [email, setEmail] = useState(emailP);
  const [openRevertModal, setOpenRevertModal] = useState(false);
  const [updateObj, setUpdateObj] = useState(null);

  const dispatch = useDispatch();

  let updatesObj = {};
  const {
    requestData,
    response,
    clear,
    alertHandler,
    error,
    setError,
    loading,
  } = useReq();
  const {
    requestData: requestData2,
    response: response2,
    clear: clear2,
  } = useReq();

  const [openPicker, setOpenPicker] = useState(false);
  const [avatarOptions, setAvatarOptions] = useState(false);

  useEffect(() => {
    if (error !== null) {
      alertHandler(error);
    }
  }, [error]);

  useEffect(() => {
    if (response !== null) {
      alertHandler("Profile saved.");
      dispatch(updateProfile(updateObj));
      clear();
    }
  }, [response, updateObj]);

  useEffect(() => {
    if (response2 !== null) {
      dispatch(updateProfile({ username: lastUsername, lastUsername: null }));
      alertHandler("Username Changed");
      clear2();
    }
  }, [response2, lastUsername]);

  const onSubmitHandler = (e) => {
    setError(null);
    e.preventDefault();
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      setError("Invalid email address");
      return;
    }

    if (name.trim().length < 3) {
      setError("Name should be of more than 3 characters");
      return;
    }

    if (!/^[a-zA-Z]([a-zA-Z]+){2,}(\s[a-zA-Z]([a-zA-Z]+)*)?$/.test(name)) {
      setError("Only alphabets allowed in name");
      return;
    }

    if (username.length < 3) {
      setError("Username should be of more than 3 characters");
      return;
    }

    if (!/^[a-zA-Z0-9\\_.]+$/.test(username)) {
      setError(
        "Username can contain only letters, numbers and symbols . or _ "
      );
      return;
    }

    if (notAllowedUsernames.includes(username.toString().toLowerCase())) {
      setError("This username is not allowed");
      return;
    }

    if ((bio != undefined || bio != null) && bio.length > 120) {
      setError("Bio should be of less than 120 characters");
      return;
    }

    if ((website != undefined || website != null) && website.length > 1) {
      const isUrlValid = validURL(website);

      if (!isUrlValid) {
        setError("Invalid website");
        return;
      }
    }

    let updates = [];
    if (name !== nameP) {
      updates.push({ change: "name", value: name });
      updatesObj = { ...updatesObj, name };
    }

    if (username !== usernameP && isUsernameChangeAllowed) {
      updates.push({ change: "username", value: username });
      updatesObj = { ...updatesObj, username };
    }

    if (website !== websiteP) {
      if (websiteP !== null && website.length !== 0) {
        updates.push({ change: "website", value: website });
        updatesObj = { ...updatesObj, website };
      }
    }

    if (bio !== bioP) {
      if (bioP !== null && bio.length !== 0) {
        updates.push({ change: "bio", value: bio });
        updatesObj = { ...updatesObj, bio };
      }
    }

    if (email !== emailP) {
      updates.push({ change: "email", value: email });
      updatesObj = { ...updatesObj, email };
    }

    if (updates.length < 1) {
      return;
    }

    setUpdateObj(updatesObj);

    requestData("post", "user/profile", { updates: updates });
  };

  const revertUsername = () => {
    setOpenRevertModal(false);
    if (lastUsername) {
      requestData2("post", "user/revert");
    }
  };

  return (
    <div className="settings-content">
      <div className="img-container">
        <div className="img">
          <button style={{ display: "flex" }}>
            <img
              src={
                avatar
                  ? avatar
                  : `${process.env.PUBLIC_URL}/images/default-avatar290.jpg`
              }
              alt=""
              width="100%"
              height="100%"
              onClick={() =>
                avatar ? setAvatarOptions(true) : setOpenPicker(true)
              }
            />
          </button>
        </div>
        <div className="settings_username">
          <h1>{usernameP}</h1>
          <button
            onClick={() =>
              avatar ? setAvatarOptions(true) : setOpenPicker(true)
            }
          >
            Change Profile Photo
          </button>
        </div>
      </div>

      <form onSubmit={onSubmitHandler} action="">
        <SettingsFormGroup
          label="Name"
          type="text"
          value={name}
          placeholder="Name"
          onChange={setName}
          isRequired={true}
          pContent="Help people discover your account by using the name you're known
                by: either your full name, nickname, or business name."
          extras={{
            title: "Only alphabets allowed",
            // pattern: "^[a-z]([a-z]+){2,}(s[a-z]([a-z]+)*)?$",
            minLength: 3,
          }}
        />

        <SettingsFormGroup
          label="Username"
          type="text"
          placeholder="username"
          value={username}
          onChange={setUsername}
          isRequired={true}
          pContent={`In most cases, you'll be able to change your username back to ${
            lastUsername ? lastUsername : usernameP
          } for another 14 days.`}
          extras={{ minLength: 3, readOnly: !isUsernameChangeAllowed }}
          revert={lastUsername}
          revertHandler={() => setOpenRevertModal(!openRevertModal)}
        >
          <p>You can only change your username once within 25 days.</p>
        </SettingsFormGroup>

        <SettingsFormGroup
          label="Website"
          placeholder="Website"
          type="website"
          onChange={setWebsite}
          value={website}
        />

        <SettingsFormGroup label="Bio" type="textarea">
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            maxLength={120}
          ></textarea>
        </SettingsFormGroup>

        <SettingsFormGroup
          h2Content="Personal Information"
          pContent="Provide your personal information, even if the account is used
                for a business, a pet or something else. This won't be a part of
                your public profile."
        />

        <SettingsFormGroup
          label="Email"
          type="email"
          placeholder="website"
          isRequired={true}
          value={email}
          onChange={setEmail}
        />

        <SettingsFormGroup>
          <button disabled={loading}>Submit {loading && <Loader />}</button>
        </SettingsFormGroup>
      </form>

      {openRevertModal && (
        <Modal onClick={setOpenRevertModal} isUser={true} isOptions={true}>
          <button onClick={revertUsername}>Yes</button>
        </Modal>
      )}

      <AvatarUploader
        openPicker={openPicker}
        makeMeFalse={setOpenPicker}
        avatarOptions={avatarOptions}
        setAvatarOptions={setAvatarOptions}
      />
    </div>
  );
};

export default SettingsEditProfile;
