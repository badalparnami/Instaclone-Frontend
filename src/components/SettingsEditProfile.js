import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import SettingsFormGroup from "./SettingsFormGroup";
import { logoutAsync } from "../store/actions/auth";
import { updateProfile } from "../store/actions/profile";
import Modal from "./Modal/Modal";

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

const SettingsEditProfile = ({
  nameP,
  usernameP,
  websiteP,
  bioP,
  emailP,
  lastUsername,
  isUsernameChangeAllowed,
}) => {
  const [name, setName] = useState(nameP);
  const [username, setUsername] = useState(usernameP);
  const [website, setWebsite] = useState(websiteP ? websiteP : "");
  const [bio, setBio] = useState(bioP ? bioP : "");
  const [email, setEmail] = useState(emailP);

  const [error, setError] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [openRevertModal, setOpenRevertModal] = useState(false);

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

    if (name.length < 3) {
      setError("Name should be of more than 3 characters");
      return;
    }

    if (!/^[a-zA-Zs]+$/.test(name)) {
      setError("Only alphabets allowed in name");
      return;
    }

    if (username.length < 3) {
      setError("Username should be of more than 3 characters");
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
    let updatesObj = {};
    if (name !== nameP) {
      updates.push({ change: "name", value: name });
      updatesObj = { ...updatesObj, name };
    }

    if (username !== usernameP && isUsernameChangeAllowed) {
      updates.push({ change: "username", value: username });
      updatesObj = { ...updatesObj, username };
    }

    if (
      (website != undefined || website != null) &&
      website.length > 1 &&
      website !== websiteP
    ) {
      updates.push({ change: "website", value: website });
      updatesObj = { ...updatesObj, website };
    }

    if ((bio != undefined || bio != null) && bio.length > 1 && bio !== bioP) {
      updates.push({ change: "bio", value: bio });
      updatesObj = { ...updatesObj, bio };
    }

    if (email !== emailP) {
      updates.push({ change: "email", value: email });
      updatesObj = { ...updatesObj, email };
    }

    if (updates.length < 1) {
      return;
    }

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/user/profile`,
        {
          updates: updates,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.error) {
          setError(res.data.error);
          dispatch(updateProfile(updatesObj));
        }
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

  const revertUsername = () => {
    setOpenRevertModal(false);
    if (lastUsername) {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/user/revert`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data.error) {
            setError(res.data.error);
          } else {
            dispatch(
              updateProfile({ username: lastUsername, lastUsername: null })
            );
          }
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
    }
  };

  return (
    <div className="settings-content">
      <div className="img-container">
        <div className="img">
          <button>
            <img
              src="./../images/default-avatar290.jpg"
              alt=""
              width="100%"
              height="100%"
            />
          </button>
        </div>
        <div className="settings_username">
          <h1>{usernameP}</h1>
          <button>Change Profile Photo</button>
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
            pattern: "^[a-zA-Zs]+$",
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
          <button>Submit</button>
        </SettingsFormGroup>
      </form>

      {openRevertModal && (
        <Modal onClick={setOpenRevertModal} isUser={true} isOptions={true}>
          <button onClick={revertUsername}>Yes</button>
        </Modal>
      )}
    </div>
  );
};

export default SettingsEditProfile;
