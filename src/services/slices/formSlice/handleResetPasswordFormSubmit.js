import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../../constants";
import { fetchFormData } from "./api/fetchFormData";

export const handleResetPasswordFormSubmit = createAsyncThunk(
  "form/handleResetPasswordFormSubmit",
  fetchFormData(API_URL.RESET_PASSWORD)
);
