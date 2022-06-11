const closeOptionReducer = (state = {}, action) => {
  switch (action.type) {
    case "CLOSE_OPTION":
      return action.payload;
    default:
      return state;
  }
};
export default closeOptionReducer;
