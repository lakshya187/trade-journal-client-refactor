const createNewOptionsReducer = (state = null, action) => {
  switch (action.type) {
    case "OPTIONS_DATA":
      return action.payload;
    default:
      return state;
  }
};
export default createNewOptionsReducer;
