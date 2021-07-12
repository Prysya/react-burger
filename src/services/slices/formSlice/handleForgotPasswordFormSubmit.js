import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../../constants";
import { fetchFormData } from "./api/fetchFormData";

export const handleForgotPasswordFormSubmit = createAsyncThunk(
  "form/handleForgotPasswordFormSubmit",
  fetchFormData(API_URL.FORGOT_PASSWORD)
);
