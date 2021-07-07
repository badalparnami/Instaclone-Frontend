import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { authCheckState, clearError } from "./store/actions/auth";
import { getProfile, clearError as clearErrorA } from "./store/actions/profile";
import { showAlert } from "./store/actions/alert";
import Auth from "./pages/Auth/Auth";
import Nav from "./pages/Nav/Nav";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/NotFound/NotFound";
import Home from "./pages/Home/Home";
import Explore from "./pages/Explore/Explore";
import Post from "./pages/Post/Post";
import Settings from "./pages/Settings/Settings";
import NewPost from "./pages/NewPost/NewPost";
import User from "./pages/User/User";
import Snackbar from "./components/Snackbar/Snackbar";
import Hashtag from "./pages/Hashtag/Hashtag";
import LoadingScreen from "./components/Loading";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import useWindowSize from "./hooks/useWindowSize";
import PlaceholderPage from "./components/PlaceholderPage";

import "./App.css";
import "./pages/Suggestions/Suggestions.css";

const App = () => {
  const dispatch = useDispatch();
  const { token, loggedIn, logout, error } = useSelector((state) => state.auth);
  const { error: errorA, loading } = useSelector((state) => state.profile);
  const { loading: loadingProgressBar } = useSelector((state) => state.alert);
  const history = useHistory();

  const {
    location: { pathname },
  } = history;

  const size = useWindowSize();

  useEffect(() => {
    dispatch(authCheckState());
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(getProfile(token));
    }
  }, [token]);

  useEffect(() => {
    if (error !== null) {
      dispatch(showAlert(error));
      dispatch(clearError());
    }
  }, [error]);

  useEffect(() => {
    if (errorA !== null) {
      dispatch(showAlert(errorA));
      dispatch(clearErrorA());
    }
  }, [errorA]);

  let routes;

  useEffect(() => {
    if (logout) {
      history.push("/");
      dispatch(clearError());
    }
  }, [logout]);

  if (token && loggedIn === true && loading !== null) {
    routes = (
      <Switch>
        <Route
          path={["/", "/signup"]}
          exact
          render={(props) =>
            token && (loggedIn || loggedIn === false) ? (
              <Home {...props} />
            ) : (
              <Auth {...props} isLoginPage={true} />
            )
          }
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
        <Route
          path="/accounts/edit"
          exact
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
          path="/accounts/data"
          exact
          render={(props) => <Settings {...props} page="data" />}
        />
        <Route
          path="/accounts/data/like"
          exact
          render={(props) => <Settings {...props} subpage="like" />}
        />
        <Route
          path="/accounts/data/archive"
          exact
          render={(props) => <Settings {...props} subpage="archive" />}
        />
        <Route
          path="/accounts/data/pending_post"
          exact
          render={(props) => <Settings {...props} subpage="pendingPost" />}
        />
        <Route
          path="/accounts/data/block"
          exact
          render={(props) => <Settings {...props} subpage="block" />}
        />
        <Route
          path="/accounts/data/pending_request"
          exact
          render={(props) => <Settings {...props} subpage="followReq" />}
        />
        <Route
          path="/newpost"
          exact
          render={(props) => <NewPost {...props} />}
        />
        <Route path="/explore/tags/:id" component={Hashtag} />
        <Route path="/404" component={NotFound} />
        <Route path="/post/:id" component={Post} />
        <Route
          path="/:id"
          exact
          render={(props) => <User {...props} page="post" />}
        />
        <Route
          path="/:id/tagged"
          exact
          render={(props) => <User {...props} page="tagged" />}
        />
        <Redirect to="/404" />
      </Switch>
    );
  }

  if (loggedIn === false) {
    routes = (
      <Switch>
        <Route
          path="/"
          exact
          render={(props) =>
            token && (loggedIn || loggedIn === false) ? (
              <Home {...props} />
            ) : (
              <Auth {...props} isLoginPage={true} />
            )
          }
        />
        <Route path="/explore/tags/:id" component={Hashtag} />
        <Route
          path="/signup"
          exact
          render={(props) => <Auth {...props} isLoginPage={false} />}
        />
        <Route path="/404" component={NotFound} />
        <Route path="/post/:id" component={Post} />
        <Route
          path="/:id"
          exact
          render={(props) => <User {...props} page="post" />}
        />
        <Route
          path="/:id/tagged"
          exact
          render={(props) => <User {...props} page="tagged" />}
        />
        <Redirect to="/404" />
      </Switch>
    );
  }

  if (size.width <= 767) {
    return <PlaceholderPage />;
  }

  return (
    <div className="App">
      <Snackbar />

      {loadingProgressBar && <ProgressBar />}

      {token && (loggedIn || loggedIn === false) ? (
        <Nav isLoggedIn={true} />
      ) : pathname === "/" || pathname === "/signup" ? (
        ""
      ) : (
        <Nav isLoggedIn={false} />
      )}

      {loading && <LoadingScreen />}
      {routes}
    </div>
  );
};

export default App;
