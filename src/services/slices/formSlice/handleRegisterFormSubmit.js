import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../../constants";
import { fetchFormData } from "./api/fetchFormData";

export const handleRegisterFormSubmit = createAsyncThunk(
  "form/handleRegisterFormSubmit",
  fetchFormData(API_URL.REGISTER)
);
