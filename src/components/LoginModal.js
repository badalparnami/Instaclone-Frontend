import React from "react";
import Modal from "./Modal/Modal";
import Auth from "../pages/Auth/Auth";

const LoginModal = ({ setModal }) => {
  return (
    <Modal styles={{ paddingTop: "13rem" }} onClick={setModal} isOptions={true}>
      <Auth isLoginPage={true} />
    </Modal>
  );
};

export default LoginModal;
