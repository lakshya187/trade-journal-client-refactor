const closeOptionStartReducer = (state = null, action) => {
  switch (action.type) {
    case "CLOSE_OPTION_START":
      return action.payload;
    default:
      return state;
  }
};
export default closeOptionStartReducer;
