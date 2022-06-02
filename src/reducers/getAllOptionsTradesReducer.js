const getAllOptionsTradesReducer = (state = null, action) => {
  switch (action.type) {
    case "GET_ALL_OPTIONS":
      return action.payload;
    default:
      return state;
  }
};
export default getAllOptionsTradesReducer;
