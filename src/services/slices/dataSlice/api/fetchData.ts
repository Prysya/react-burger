import axios from "axios";
import { ErrorMessages } from "../../../../enums";

export const fetchData = async (apiUrl: string) => {
  try {
    const { data } = await axios.get(apiUrl);

    if (data && Array.isArray(data.data)) {
      return data.data;
    }

    throw new Error(ErrorMessages.DataIsUndefined);
  } catch (err) {
    throw err;
  }
};
