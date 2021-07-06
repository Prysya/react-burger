import { LOAD_STATUSES, MESSAGES } from "../../../../constants";
import axios from "axios";

export const fetchData =
  (url) =>
  async (_, { getState }) => {
    const { dataLoading, data } = getState().data;
    
    if (data.length > 0) return data;
    
    if (dataLoading !== LOAD_STATUSES.PENDING ) return;

    try {
      const { data } = await axios.get(url);
      
      if (data && Array.isArray(data.data)) {
        return data.data;
      }

      throw new Error(MESSAGES.ERRORS.DATA_IS_UNDEFINED);
    } catch (err) {
      throw err;
    }
  };
