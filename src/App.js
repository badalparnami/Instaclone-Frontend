import { Route, Switch, Redirect } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { authCheckState } from "./store/actions/auth";
import { getProfile } from "./store/actions/profile";
import Auth from "./pages/Auth/Auth";
import Nav from "./pages/Nav/Nav";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/NotFound/NotFound";
import Home from "./pages/Home/Home";
import Explore from "./pages/Explore/Explore";
import Post from "./pages/Post/Post";
import Settings from "./pages/Settings/Settings";
import Suggestions from "./pages/Suggestions/Suggestions";
import NewPost from "./pages/NewPost/NewPost";

import "./App.css";
import "./pages/Suggestions/Suggestions.css";

const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(authCheckState());
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(getProfile(token));
    }
  }, [token]);

  return (
    <div className="App">
      {token ? (
        <Nav isLoggedIn={true} />
      ) : window.location.href === "http://localhost:3000/" ||
        window.location.href === "http://localhost:3000/signup" ? (
        ""
      ) : (
        <Nav isLoggedIn={false} />
      )}
      <Switch>
        <Route
          path="/"
          exact
          render={(props) =>
            !token ? (
              <Auth {...props} isLoginPage={true} />
            ) : (
              <Home {...props} />
              // <Suggestions {...props} />
            )
          }
        />
        <Route
          path="/signup"
          exact
          render={(props) => <Auth {...props} isLoginPage={false} />}
        />
        <Route
          path="/profile"
          exact
          render={(props) => <Profile {...props} page="post" />}
        />
        <Route
          path="/profile/saved"
          exact
          render={(props) => <Profile {...props} page="saved" />}
        />
        <Route
          path="/profile/tagged"
          exact
          render={(props) => <Profile {...props} page="tagged" />}
        />
        <Route path="/explore" exact component={Explore} />
        <Route path="/post/:id" component={Post} />
        <Route
          path="/accounts/edit"
          render={(props) => <Settings {...props} page="edit" />}
        />
        <Route
          path="/accounts/password/change"
          exact
          render={(props) => <Settings {...props} page="password" />}
        />
        <Route
          path="/accounts/privacy_and_security"
          exact
          render={(props) => <Settings {...props} page="privacy" />}
        />
        <Route
          path="/newpost"
          exact
          render={(props) => <NewPost {...props} />}
        />
        <Route path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    </div>
  );
};

export default App;
