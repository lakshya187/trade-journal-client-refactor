const mainDashboardStatsCombinedReducer = (state = null, action) => {
  switch (action.type) {
    case "MAINDASHBOARD_STATS":
      return action.payload;
    default:
      return state;
  }
};

export default mainDashboardStatsCombinedReducer;
