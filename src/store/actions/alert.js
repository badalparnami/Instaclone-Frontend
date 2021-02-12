const SHOWALERT = (text, ticks) => {
  return {
    type: "SHOW_ALERT",
    text,
    ticks,
  };
};

//Without HIDEALERT alert will work fine.
const HIDEALERT = () => {
  return {
    type: "HIDE_ALERT",
  };
};

const alertSec = 3000;

export const showAlert = (text) => {
  return (dispatch, getState) => {
    const state = getState();
    const isActive = state.alert.isAlertActive;
    if (isActive) {
      setTimeout(() => {
        setTimeout(() => {
          dispatch(HIDEALERT());
        }, alertSec);
        dispatch(SHOWALERT(text, Date.now()));
      }, alertSec - (Date.now() - state.alert.ticks) + 500);
    } else {
      setTimeout(() => {
        dispatch(HIDEALERT());
      }, alertSec);
      dispatch(SHOWALERT(text, Date.now()));
    }
  };
};

export const showBar = () => {
  return {
    type: "SHOW_PROGRESS_BAR",
  };
};

export const hideBar = () => {
  return {
    type: "HIDE_PROGRESS_BAR",
  };
};
