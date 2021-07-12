import { API_URL } from "../../../constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCreateOrder } from "./api/fetchCreateOrder";

export const handleOpenOrderDetailsModal = createAsyncThunk(
  "modalWindows/handleOpenOrderDetailsModal",
  fetchCreateOrder(API_URL.CREATE_ORDER)
);
