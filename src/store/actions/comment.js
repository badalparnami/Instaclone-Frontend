export const updateComment = (data) => {
  return {
    type: "COMMENT_SUCCESS",
    comment: { ...data },
  };
};

export const clearComment = () => {
  return {
    type: "CLEAR",
  };
};
