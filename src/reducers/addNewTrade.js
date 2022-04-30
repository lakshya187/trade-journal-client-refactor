export default (state = {}, action) => {
  switch (action.type) {
    case "CREATE_NEW_TRADE":
      return { ...action.payload };
    default:
      return state;
  }
};
