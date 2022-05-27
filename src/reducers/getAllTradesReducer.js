const getAllTradesReducer = (state = null, action) => {
  switch (action.type) {
    case "GET_ALL_TRADES":
      return action.payload;
    default:
      return state;
  }
};

export default getAllTradesReducer;
