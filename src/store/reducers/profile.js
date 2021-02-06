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
  post: null, //r
  follower: null,
  following: null,
  isUsernameChangeAllowed: null,
  lastUsername: null,
  likeCount: null,
  savedCount: null,
  blockedCount: null,
  pendingFollowerCount: null, //r
  archivePostCount: null,
  taggedPostCount: null, //r
  pendingTaggedPostCount: null, //r
  postCount: null,
};

const profileReducer = (state = initialState, action) => {
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
        ...action.data,
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

export default profileReducer;
