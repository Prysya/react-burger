import { DECREMENT, INCREMENT, RESET, SET } from "./index";

const setFullPrice = (payload) => ({ type: SET, payload });

const incrementFullPrice = (payload) => ({ type: INCREMENT, payload });

const decrementFullPrice = (payload) => ({ type: DECREMENT, payload });

const resetFullPrice = () => ({ type: RESET });

export {
  setFullPrice,
  incrementFullPrice,
  decrementFullPrice,
  resetFullPrice,
};
