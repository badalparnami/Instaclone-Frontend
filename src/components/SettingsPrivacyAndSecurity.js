import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import SettingsFormGroup from "./SettingsFormGroup";
import { updateProfile } from "../store/actions/profile";
import useReq from "../hooks/useReq";
import Modal from "./Modal/Modal";

const SettingsPrivacyAndSecurity = ({
  manuallyApproveTag,
  privateP,
  tag,
  mention,
}) => {
  const [isPrivateAcc, setIsPrivateAcc] = useState(privateP);
  const [userTag, setUserTag] = useState(
    manuallyApproveTag ? "manually" : "automatically"
  );
  const [allowtag, setAllowTag] = useState(tag);
  const [allowMention, setAllowMention] = useState(mention);

  const dispatch = useDispatch();
  const { requestData, response, clear, alertHandler } = useReq(true);
  const [updates, setUpdates] = useState(null);

  const [openOptionsPrivate, setOpenOptionsPrivate] = useState(false);
  const [openOptionsUserTag, setOpenOptionsUserTag] = useState(false);

  const root = document.body;

  useEffect(() => {
    if (isPrivateAcc !== privateP && isPrivateAcc !== null) {
      if (privateP === true) {
        setOpenOptionsPrivate(true);
        return;
      }
      updateProfileSettings(["private", isPrivateAcc], {
        private: isPrivateAcc,
      });
    }

    if (manuallyApproveTag && userTag !== "manually" && userTag !== null) {
      setOpenOptionsUserTag(true);
    }

    if (
      !manuallyApproveTag &&
      userTag !== "automatically" &&
      userTag !== null
    ) {
      updateProfileSettings(["manuallyApproveTag", true], {
        manuallyApproveTag: true,
      });
    }

    if (tag !== allowtag && allowtag !== null) {
      updateProfileSettings(["tag", allowtag], { tag: allowtag });
    }

    if (mention !== allowMention && allowMention !== null) {
      updateProfileSettings(["mention", allowMention], {
        mention: allowMention,
      });
    }
  }, [
    isPrivateAcc,
    userTag,
    allowtag,
    allowMention,
    privateP,
    tag,
    manuallyApproveTag,
    mention,
  ]);

  useEffect(() => {
    if (response !== null) {
      alertHandler("Settings saved");
      root.style.overflow = "auto";
      setOpenOptionsPrivate(false);
      setOpenOptionsUserTag(false);
      dispatch(updateProfile(updates));
      clear();
    }
  }, [response, updates]);

  const updateProfileSettings = (security, updates) => {
    requestData("post", "user/security", { security });
    setUpdates(updates);
  };

  const privateAccHandler = () => {
    updateProfileSettings(["private", isPrivateAcc], {
      private: isPrivateAcc,
    });
  };

  const userTagHandler = () => {
    updateProfileSettings(["manuallyApproveTag", false], {
      manuallyApproveTag: false,
    });
  };

  const revertPrivateState = () => {
    setOpenOptionsPrivate(false);
    setIsPrivateAcc(privateP);
  };

  const revertUserTagState = () => {
    setOpenOptionsUserTag(false);
    setUserTag(manuallyApproveTag ? "manually" : "automatically");
  };

  return (
    <div className="settings-content">
      <div className="img-container">
        <div className="img"></div>
        <div className="settings_username">
          <h1>Account Privacy</h1>
        </div>
      </div>

      <form className="privacy" action="">
        <SettingsFormGroup
          label="Private Account"
          type="checkbox"
          isChecked={[isPrivateAcc]}
          onChange={() => setIsPrivateAcc(!isPrivateAcc)}
          pContent="When your account is private, only people you approve can see
                your photos and videos on Instagram. Your existing followers
                won't be affected."
        />

        <SettingsFormGroup
          label="Photos of You"
          type="radio"
          name="usertag"
          isChecked={[userTag === "automatically", userTag === "manually"]}
          pContent="Choose how you want photos of you added to your profile."
          onChange={setUserTag}
        />

        <SettingsFormGroup
          label="Allow Tags From"
          type="radio"
          name="allowtag"
          isChecked={[
            allowtag === "everyone",
            allowtag === "follow",
            allowtag === "none",
          ]}
          onChange={setAllowTag}
          pContent="Choose who can tag you in their photos. When people try to tag
                you, they'll see if you don't allow tags from everyone."
        />

        <SettingsFormGroup
          label="Allow @mentions From"
          type="radio"
          name="allowmention"
          onChange={setAllowMention}
          isChecked={[
            allowMention === "everyone",
            allowMention === "follow",
            allowMention === "none",
          ]}
          pContent="Choose who can @mention you to link your account in their
          comments and captions. When people try to @mention you,
          they'll see if you don't allow @mentions."
        />
      </form>

      {openOptionsPrivate && (
        <Modal onClick={revertPrivateState} isUser={true} isOptions={true}>
          <h4 className="unfollow-popup">
            <b>Change Privacy?</b> <br /> <br /> Anyone will be able to see your
            photos. You will no longer need to approve followers and all your
            pending followers (if any) will be automatically converted to your
            followers.
          </h4>
          <button onClick={privateAccHandler} className="blue-option">
            Okay
          </button>
        </Modal>
      )}

      {openOptionsUserTag && (
        <Modal onClick={revertUserTagState} isUser={true} isOptions={true}>
          <h4 className="unfollow-popup">
            All your pending tagged post (if any) will be automatically
            approved.
          </h4>
          <button onClick={userTagHandler} className="blue-option">
            Okay
          </button>
        </Modal>
      )}
    </div>
  );
};

export default SettingsPrivacyAndSecurity;
