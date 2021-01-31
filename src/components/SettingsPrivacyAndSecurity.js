import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import SettingsFormGroup from "./SettingsFormGroup";
import { updateProfile } from "../store/actions/profile";
import useReq from "../hooks/useReq";

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
  const { requestData, response, clear } = useReq();
  const [updates, setUpdates] = useState(null);

  useEffect(() => {
    if (isPrivateAcc !== privateP && isPrivateAcc !== null) {
      updateProfileSettings(["private", isPrivateAcc], {
        private: isPrivateAcc,
      });
    }

    if (manuallyApproveTag && userTag !== "manually" && userTag !== null) {
      updateProfileSettings(["manuallyApproveTag", false], {
        manuallyApproveTag: false,
      });
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
    dispatch,
  ]);

  useEffect(() => {
    if (response !== null) {
      dispatch(updateProfile(updates));
      clear();
    }
  }, [response, updates]);

  const updateProfileSettings = (security, updates) => {
    requestData("post", "user/security", { security });
    setUpdates(updates);
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
    </div>
  );
};

export default SettingsPrivacyAndSecurity;
