const initialState = {
  isAlertActive: false,
  text: null,
  ticks: null,
  loading: false,
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_ALERT":
      return {
        ...state,
        isAlertActive: true,
        text: action.text,
        ticks: action.ticks,
      };
    case "HIDE_ALERT":
      return {
        ...state,
        text: null,
        ticks: null,
        isAlertActive: false,
      };
    case "SHOW_PROGRESS_BAR":
      return {
        ...state,
        loading: true,
      };
    case "HIDE_PROGRESS_BAR":
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default alertReducer;
