import {SerializedError} from "@reduxjs/toolkit";
import {LoadStatuses} from "../../../enums";

export interface IInitialAuthState {
  tokenResponseStatus: LoadStatuses.Idle | LoadStatuses.Pending,

  accessTokenResponseStatus: LoadStatuses.Idle | LoadStatuses.Pending,
  refreshTokenResponseStatus: LoadStatuses.Idle | LoadStatuses.Pending,

  authError: string | SerializedError | null,

  userEmail: string | null,
  userName: string | null,

  isAuthenticated: boolean,

  isPasswordForgotten: boolean,
}

export interface IUpdateToken {
  accessToken: string
  refreshToken: string
  success: boolean
}
