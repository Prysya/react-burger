import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../../constants";
import { fetchUserData } from "./api/fetchUserData";

export const handleGetUserData = createAsyncThunk(
  "auth/handleGetUserData",
  fetchUserData(API_URL.USER_DATA, "get")
);
