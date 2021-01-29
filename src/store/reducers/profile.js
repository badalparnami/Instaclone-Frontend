const initialState = {
  error: null,
  loading: false,
  name: null,
  email: null,
  username: null,
  avatar: null,
  website: null,
  bio: null,
  private: null,
  manuallyApproveTag: null,
  tag: null,
  mention: null,
  post: null,
  follower: null,
  following: null,
  isUsernameChangeAllowed: null,
  lastUsername: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PROFILE_DATA_START":
      return {
        ...state,
        error: null,
        loading: true,
      };
    case "GET_PROFILE_DATA_SUCCESS":
      return {
        ...state,
        error: null,
        loading: false,
        name: action.name,
        email: action.email,
        username: action.username,
        avatar: action.avatar,
        website: action.website,
        bio: action.bio,
        private: action.private,
        manuallyApproveTag: action.manuallyApproveTag,
        tag: action.tag,
        mention: action.mention,
        post: action.post,
        follower: action.follower,
        following: action.following,
        isUsernameChangeAllowed: action.isUsernameChangeAllowed,
        lastUsername: action.lastUsername,
      };
    case "GET_PROFILE_DATA_FAIL":
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case "CLEAR":
      return {
        ...state,
        error: null,
        loading: false,
      };
    case "UPDATE":
      return {
        ...state,
        ...action.changes,
      };
    default:
      return state;
  }
};

export default authReducer;
