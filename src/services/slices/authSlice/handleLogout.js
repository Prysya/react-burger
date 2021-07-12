import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../../constants";
import { fetchTokenSend } from "./api/fetchTokenSend";

export const handleLogout = createAsyncThunk(
  "auth/handleLogout",
  fetchTokenSend(API_URL.LOGOUT)
);
