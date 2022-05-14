export default (state = null, action) => {
  console.log(action.payload);
  switch (action.type) {
    case "CURRENT_USER":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
