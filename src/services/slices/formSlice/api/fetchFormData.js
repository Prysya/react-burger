import { LOAD_STATUSES } from "../../../../constants";
import axios from "axios";

export const fetchFormData =
  (apiUrl) =>
  async (formData, { getState, rejectWithValue }) => {
    const { formLoading } = getState().form;

    if (formLoading !== LOAD_STATUSES.PENDING) return;

    try {
      const {data} = await axios.post(apiUrl, formData);

      if (data && data?.success) {
        return data;
      }

      throw new Error(data.message);
    } catch (e) {
      if (!e.response) {
        throw e;
      }

      return rejectWithValue(e.response.data);
    }
  };
