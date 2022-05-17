export default (state = null, action) => {
  switch (action.type) {
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};
