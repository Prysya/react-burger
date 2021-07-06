import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../../constants";
import { fetchUserData } from "./api/fetchUserData";

export const handleUpdateUserData = createAsyncThunk(
  "auth/handleUpdateUserData",
  fetchUserData(API_URL.USER_DATA, "patch")
);
