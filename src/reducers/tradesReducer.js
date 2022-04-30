import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case "GET_SINGLE_TRADE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
