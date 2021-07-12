import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../../constants";
import { fetchTokenSend } from "./api/fetchTokenSend";

export const handleUpdateToken = createAsyncThunk(
  "auth/handleUpdateToken",
  fetchTokenSend(API_URL.TOKEN_RESET)
);
