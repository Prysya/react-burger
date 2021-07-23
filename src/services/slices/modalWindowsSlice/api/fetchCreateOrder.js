import { LOAD_STATUSES, MESSAGES } from "../../../../constants";
import axios from "axios";
import {getCookie} from "../../../../utils";

export const fetchCreateOrder =
  (url) =>
  async (_, { getState }) => {
    const { orderNumberLoading } = getState().modalWindows;
    const { selectedBun, selectedItems } = getState().items;
    
    if (orderNumberLoading !== LOAD_STATUSES.PENDING) return;

    try {
      const selectedIngredientsId = selectedItems.map(({ _id }) => _id);
      const body = {
        ingredients: [selectedBun._id, ...selectedIngredientsId],
      };

      const {data}  = await axios.post(url, body, {
        headers: {
          Authorization: 'Bearer ' + getCookie('token'),
        }
      });

      const {
        order: { number },
      } = data;

      if (number && typeof number === "number") {
        return number;
      }

      throw new Error(MESSAGES.ERRORS.ORDER_NUMBER_IS_UNDEFINED);
    } catch (err) {
      throw err;
    }
  };
