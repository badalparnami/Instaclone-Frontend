import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./Auth.css";

import { auth } from "../../store/actions/auth";

const InputContainer = ({ value, setValue, text }) => {
  const [focusedValue, setFocusedValue] = useState(false);
  return (
    <div className="form-div__main">
      <div className={`form-div__sub ${focusedValue ? "active" : ""} `}>
        <label className={value && "style"}>
          <span>{text}</span>
          <input
            aria-required="true"
            autoCapitalize="off"
            autoCorrect="off"
            type="text"
            maxLength="75"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocusedValue(true)}
            onBlur={() => setFocusedValue(false)}
          />
        </label>
        <div></div>
      </div>
    </div>
  );
};

const formValidity = {
  email: false,
  name: false,
  username: false,
  password: false,
};

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [focusedPass, setFocusedPass] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [formValid, setFormValid] = useState(false);

  const dispatch = useDispatch();

  const showPassword = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };

  useEffect(() => {
    formValidity.email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    );

    formValidity.password = password.length >= 6;

    if (isLogin) {
      if (formValidity.email && formValidity.password) {
        setFormValid(true);
      } else {
        setFormValid(false);
      }
    } else {
      formValidity.name = name.length >= 3;
      formValidity.username = username.length >= 3;

      if (
        formValidity.email &&
        formValidity.password &&
        formValidity.name &&
        formValidity.username
      ) {
        setFormValid(true);
      } else {
        setFormValid(false);
      }
    }
  }, [email, password, name, username, isLogin]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      ) &&
      password.length >= 6
    ) {
      if (isLogin) {
        dispatch(auth(email, password, isLogin));
      } else if (name.length >= 3 && username.length >= 3) {
        dispatch(auth(email, password, isLogin, username, name));
      } else {
        console.log("no you are not inside");
        return;
      }
    } else {
      console.log("no you are not outside");
      return;
    }
  };

  return (
    <article className="auth-main">
      <div className="auth">
        <div className="auth__1">
          <h1>Instagram</h1>
          <div className="auth-form">
            <form>
              {!isLogin && (
                <h2>Sign up to see photos and videos from your friends.</h2>
              )}
              <div className="form-div">
                <InputContainer
                  setValue={setEmail}
                  text="Email"
                  value={email}
                />

                {!isLogin && (
                  <InputContainer
                    setValue={setName}
                    text="Full Name"
                    value={name}
                  />
                )}

                {!isLogin && (
                  <InputContainer
                    setValue={setUsername}
                    text="Username"
                    value={username}
                  />
                )}

                <div className="form-div__main">
                  <div
                    className={`form-div__sub ${focusedPass ? "active" : ""} `}
                  >
                    <label className={password && "style"}>
                      <span>Password</span>
                      <input
                        aria-required="true"
                        autoCapitalize="off"
                        autoCorrect="off"
                        type={showPass ? "text" : "password"}
                        maxLength="75"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedPass(true)}
                        onBlur={() => setFocusedPass(false)}
                      />
                    </label>
                    {password && (
                      <div className="show-pass">
                        <div className="show-pass-container">
                          <button onClick={showPassword}>
                            {showPass ? "Hide" : "Show"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="auth-button">
                  <button
                    onClick={onSubmitHandler}
                    className={formValid ? "valid" : ""}
                  >
                    <div>{isLogin ? "Log In" : "Sign up"}</div>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="auth__2">
          <div className="auth_change">
            <p>
              {isLogin ? "Don't have an account?" : "Have an account?"}
              <a
                onClick={() => {
                  setIsLogin(!isLogin);
                }}
                href="#"
              >
                <span>{isLogin ? " Sign up" : " Log in"}</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Auth;
