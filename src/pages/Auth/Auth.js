import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Auth.css";

import { auth } from "../../store/actions/auth";

const InputContainer = (props) => {
  const [focusedValue, setFocusedValue] = useState(false);

  return (
    <div className={`form-input ${focusedValue ? "active" : ""}`}>
      <input
        required
        placeholder=" "
        {...props}
        onFocus={() => setFocusedValue(true)}
        onBlur={() => setFocusedValue(false)}
      />
      <span>{props.text}</span>
      <span className="valid"></span>
    </div>
  );
};

const Auth = ({ isLoginPage }) => {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [focusedPass, setFocusedPass] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();

  const showPassword = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };

  useEffect(() => {
    if (!isLoginPage) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [isLoginPage]);

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
    <div className="auth">
      <div className="auth-container">
        <h1></h1>
        {!isLogin && (
          <h2>Sign up to see photos and videos from your friends.</h2>
        )}
        <form onSubmit={onSubmitHandler}>
          <InputContainer
            type="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            text="Email"
          />
          {!isLogin && (
            <InputContainer
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              text="Full Name"
              minLength="3"
              pattern="^[a-zA-Z\s]+$"
              title="Only alphabets allowed"
            />
          )}
          {!isLogin && (
            <InputContainer
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              text="Username"
              minLength="3"
            />
          )}
          <div className={`form-input ${focusedPass ? "active" : ""}`}>
            <input
              required
              type={showPass ? "text" : "password"}
              placeholder=" "
              minLength="6"
              maxLength="30"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
              title="Password should be of atleast 6 characters containing atleast 1 uppercase, 1 lowercase and 1 number"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedPass(true)}
              onBlur={() => setFocusedPass(false)}
            />
            <span>Password</span>
            <p onClick={showPassword}>{showPass ? "Hide" : "Show"}</p>
            <span className="valid"></span>
          </div>
          <div className="form-button">
            <button>{isLogin ? "Log In" : "Sign up"}</button>
          </div>
        </form>
      </div>

      <div className="auth-change">
        <p>
          {isLogin ? "Don't have an account?" : "Have an account?"}
          <NavLink
            onClick={() => {
              setIsLogin(!isLogin);
            }}
            to={isLogin ? "/signup" : "/"}
          >
            {isLogin ? " Sign up" : " Log in"}
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Auth;
