import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "../../../utils";
import { IInitialItemsState } from "../itemsSlice/interfaces";
import { IInitialModalWindowsState } from "./interfaces";
import { ApiUrl, ErrorMessages } from "../../../enums";
import { Ingredient } from "../../../interfaces";

export const handleOpenOrderDetailsModal = createAsyncThunk<
  never | number,
  void,
  {
    state: {
      modalWindows: IInitialModalWindowsState;
      items: IInitialItemsState;
    };
  }
>("modalWindows/handleOpenOrderDetailsModal", async (_, { getState }) => {
  const {
    items: { selectedBun, selectedItems },
  } = getState();

  try {
    const selectedIngredientsId = selectedItems.map(
      ({ _id }: Ingredient) => _id
    );

    let body = {};

    if (selectedBun) {
      body = {
        ingredients: [selectedBun._id, ...selectedIngredientsId],
      };
    }

    const { data } = await axios.post(ApiUrl.CreateOrder, body, {
      headers: {
        Authorization: "Bearer " + getCookie("token"),
      },
    });

    const {
      order: { number },
    } = data;

    if (number && typeof number === "number") {
      return number;
    }

    throw new Error(ErrorMessages.OrderNumberIsUndefined);
  } catch (err) {
    throw err;
  }
});
