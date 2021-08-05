import {createSlice, isFulfilled, isPending, isRejected,} from "@reduxjs/toolkit";

import {deleteTokens, setTokens} from "../../../utils";

import {LoadStatuses} from "../../../enums";
import {handleUpdateToken} from "./handleUpdateToken";
import {handleLogout} from "./handleLogout";
import {IInitialAuthState} from "./interfaces";
import { handleGetUserData } from "./handleGetUserData";
import { handleUpdateUserData } from "./handleUpdateUserData";

export const initialAuthState: IInitialAuthState = {
  tokenResponseStatus: LoadStatuses.Idle,

  accessTokenResponseStatus: LoadStatuses.Idle,
  refreshTokenResponseStatus: LoadStatuses.Idle,

  authError: null,

  userEmail: null,
  userName: null,

  isAuthenticated: false,

  isPasswordForgotten: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setUserData: (state:IInitialAuthState, action) => {
      if (
        action.payload?.success &&
        action.payload?.user?.name &&
        action.payload?.user?.email
      ) {
        state.userName = action.payload.user.name;
        state.userEmail = action.payload.user.email;
        state.isAuthenticated = true;

        if (action.payload?.accessToken && action.payload?.refreshToken) {
          setTokens(action);
        }
      }
    },
    handleDeleteTokensAndLogout: (state: {[key: string]: any}) => {
      Object.entries(initialAuthState).forEach(
        ([name, value]) => name !== "isPasswordForgotten" && (state[name] = value)
      );

      deleteTokens();
    },
    getSuccessForPasswordReset: (state:IInitialAuthState) => {
      state.isPasswordForgotten = true;
    },
  },
  extraReducers: (builder) => {
    for (const thunk of [
      handleUpdateToken,
      handleLogout,
      handleGetUserData,
      handleUpdateUserData,
    ]) {
      builder.addCase(thunk.pending, (state: IInitialAuthState) => {
        if (state.tokenResponseStatus === LoadStatuses.Idle) {
          state.tokenResponseStatus = LoadStatuses.Pending;
        }
      });
      builder.addCase(thunk.fulfilled, (state: IInitialAuthState) => {
        if (state.tokenResponseStatus === LoadStatuses.Pending) {
          state.tokenResponseStatus = LoadStatuses.Idle;
          state.isPasswordForgotten = false;
        }
      });
      builder.addCase(thunk.rejected, (state: IInitialAuthState, action) => {
        if (state.tokenResponseStatus === LoadStatuses.Pending) {
          state.tokenResponseStatus = LoadStatuses.Idle;

          if (action.payload?.message) {
            state.authError = action?.payload.message;
          } else {
            state.authError = action?.error;
          }
        }
      });
    }

    builder.addMatcher(isFulfilled(handleUpdateToken), (state: IInitialAuthState, action) => {
      if (
        action.payload?.success &&
        action.payload?.accessToken &&
        action.payload?.refreshToken
      ) {
        state.isAuthenticated = true;

        setTokens(action);
      }
    });

    for (const thunk of [handleUpdateToken, handleLogout]) {
      builder.addMatcher(isPending(thunk), (state: IInitialAuthState) => {
        state.refreshTokenResponseStatus = LoadStatuses.Pending;
      });
    }

    builder.addMatcher(isPending(handleGetUserData), (state: IInitialAuthState) => {
      state.accessTokenResponseStatus = LoadStatuses.Pending;
    });

    builder.addMatcher(isRejected(handleUpdateToken), (state: IInitialAuthState) => {
      state.refreshTokenResponseStatus = LoadStatuses.Idle;
      authSlice.caseReducers.handleDeleteTokensAndLogout(state);
    });

    builder.addMatcher(isRejected(handleLogout), (state: IInitialAuthState) => {
      state.refreshTokenResponseStatus = LoadStatuses.Idle;
    });

    builder.addMatcher(isRejected(handleGetUserData), (state: IInitialAuthState) => {
      state.isAuthenticated = false;
      state.accessTokenResponseStatus = LoadStatuses.Idle;
    });

    builder.addMatcher(isFulfilled(handleUpdateToken), (state: IInitialAuthState) => {
      state.refreshTokenResponseStatus = LoadStatuses.Idle;
    });

    builder.addMatcher(isFulfilled(handleGetUserData), (state: IInitialAuthState) => {
      state.accessTokenResponseStatus = LoadStatuses.Idle;
    });

    builder.addMatcher(isFulfilled(handleLogout), (state: IInitialAuthState) => {
      state.refreshTokenResponseStatus = LoadStatuses.Idle;
      authSlice.caseReducers.handleDeleteTokensAndLogout(state);
    });

    for (const thunk of [handleUpdateUserData, handleGetUserData]) {
      builder.addMatcher(isFulfilled(thunk), (state: IInitialAuthState, action) => {
        authSlice.caseReducers.setUserData(state, action);
      });
    }
  },
});

export {
  handleLogout,
  handleUpdateToken,
  handleGetUserData,
  handleUpdateUserData,
};
export const {
  setUserData,
  getSuccessForPasswordReset,
  handleDeleteTokensAndLogout,
} = authSlice.actions;
export default authSlice.reducer;
