import { fullPriceInitialState, RESET, INCREMENT, DECREMENT, SET } from "./";

const fullPriceReducer = (state, action) => {
  switch (action.type) {
    case SET:
      return action.payload;
    case INCREMENT:
      return state + action.payload;
    case DECREMENT:
      return state - action.payload;
    case RESET:
      return fullPriceInitialState;
    default:
      throw new Error(`Неправильный action.type: ${action.type}`);
  }
};

export default fullPriceReducer;
