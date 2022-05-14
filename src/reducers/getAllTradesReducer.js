export default (state = [], action) => {
  switch (action.type) {
    case "GET_ALL_TRADES":
      return action.payload;
    default:
      return state;
  }
};
