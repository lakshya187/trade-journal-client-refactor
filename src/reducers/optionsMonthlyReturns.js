const optionsMonthlyReturnsReducer = (state = null, action) => {
  switch (action.type) {
    case "OPTIONS_MONTHLY_RETURNS":
      return action.payload;
    default:
      return state;
  }
};

export default optionsMonthlyReturnsReducer;
