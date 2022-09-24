const mainDashboardStatsReducer = (state = null, action) => {
  switch (action.type) {
    case "DASHBOARD_TOTAL_RETURNS":
      return action.payload;
    default:
      return state;
  }
};

export default mainDashboardStatsReducer;
