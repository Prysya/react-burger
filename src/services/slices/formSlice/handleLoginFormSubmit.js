import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../../constants";
import { fetchFormData } from "./api/fetchFormData";

export const handleLoginFormSubmit = createAsyncThunk(
  "form/handleLoginFormSubmit",
  fetchFormData(API_URL.LOGIN)
);
