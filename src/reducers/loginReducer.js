export default (state = null, action) => {
  switch (action.type) {
    case "CURRENT_USER":
      return { ...state, ...action.payload };
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};
