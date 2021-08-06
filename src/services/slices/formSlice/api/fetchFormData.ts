import axios from "axios";
import { IFetchUserData, ISetFetchUserData } from "../../../../interfaces";

export const fetchFormData = async (
  apiUrl: string,
  formData: IFetchUserData | ISetFetchUserData
) => {
  try {
    const { data } = await axios.post(apiUrl, formData);

    if (data && data?.success) {
      return data;
    }
    throw new Error(data.message);
  } catch (err) {
    throw err;
  }
};
