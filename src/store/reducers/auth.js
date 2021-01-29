const initialState = {
  token: null,
  error: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_START":
    case "LOGOUT_START":
      return {
        ...state,
        error: null,
        loading: true,
      };
    case "AUTH_SUCCESS":
      return {
        ...state,
        token: action.idToken,
        error: null,
        loading: false,
      };
    case "AUTH_FAIL":
    case "LOGOUT_FAIL":
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case "AUTH_LOGOUT":
      return {
        ...initialState,
      };
    case "CLEAR":
      return {
        ...state,
        error: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
