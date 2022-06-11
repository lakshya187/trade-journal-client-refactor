const singleOptionsReducer = (state = null, action) => {
  switch (action.type) {
    case "SINGLE_OPTION_TRADE":
      return action.payload;
    default:
      return state;
  }
};
export default singleOptionsReducer;
