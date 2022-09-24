const equityMonthlyReturnsReducer = (state = null, action) => {
  switch (action.type) {
    case "EQUITY_MONTHLY_RETURNS":
      return action.payload;
    default:
      return state;
  }
};

export default equityMonthlyReturnsReducer;
