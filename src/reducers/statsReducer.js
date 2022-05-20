const statsReducer = (state = null, action) => {
  switch (action.type) {
    case "CURRENT_STATS":
      return action.payload;
    default:
      return null;
  }
};

export default statsReducer;
