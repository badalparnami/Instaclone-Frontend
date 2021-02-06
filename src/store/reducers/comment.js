const initialState = {
  commentId: null,
  id: null,
  text: null,
  date: null,
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "COMMENT_SUCCESS":
      return {
        ...state,
        ...action.comment,
      };
    case "CLEAR":
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default commentReducer;
