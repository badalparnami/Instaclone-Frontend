const initialState = {
  isAlertActive: false,
  text: null,
  ticks: null,
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_ALERT":
      return {
        isAlertActive: true,
        text: action.text,
        ticks: action.ticks,
      };
    case "HIDE_ALERT":
      return {
        ...state,
        isAlertActive: false,
      };
    default:
      return state;
  }
};

export default alertReducer;
