const errorReducer = (state = null, action) => {
  switch (action.type) {
    case "ERROR":
      return { error: true };
    default:
      return state;
  }
};
export default errorReducer;
