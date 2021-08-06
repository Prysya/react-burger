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
    setUserData: (state, action) => {
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
    getSuccessForPasswordReset: (state) => {
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
      builder.addCase(thunk.pending, (state) => {
        if (state.tokenResponseStatus === LoadStatuses.Idle) {
          state.tokenResponseStatus = LoadStatuses.Pending;
        }
      });
      builder.addCase(thunk.fulfilled, (state) => {
        if (state.tokenResponseStatus === LoadStatuses.Pending) {
          state.tokenResponseStatus = LoadStatuses.Idle;
          state.isPasswordForgotten = false;
        }
      });
      builder.addCase(thunk.rejected, (state, action) => {
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

    builder.addMatcher(isFulfilled(handleUpdateToken), (state, action) => {
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
      builder.addMatcher(isPending(thunk), (state) => {
        state.refreshTokenResponseStatus = LoadStatuses.Pending;
      });
    }

    builder.addMatcher(isPending(handleGetUserData), (state) => {
      state.accessTokenResponseStatus = LoadStatuses.Pending;
    });

    builder.addMatcher(isRejected(handleUpdateToken), (state) => {
      state.refreshTokenResponseStatus = LoadStatuses.Idle;
      authSlice.caseReducers.handleDeleteTokensAndLogout(state);
    });

    builder.addMatcher(isRejected(handleLogout), (state) => {
      state.refreshTokenResponseStatus = LoadStatuses.Idle;
    });

    builder.addMatcher(isRejected(handleGetUserData), (state) => {
      state.isAuthenticated = false;
      state.accessTokenResponseStatus = LoadStatuses.Idle;
    });

    builder.addMatcher(isFulfilled(handleUpdateToken), (state) => {
      state.refreshTokenResponseStatus = LoadStatuses.Idle;
    });

    builder.addMatcher(isFulfilled(handleGetUserData), (state) => {
      state.accessTokenResponseStatus = LoadStatuses.Idle;
    });

    builder.addMatcher(isFulfilled(handleLogout), (state) => {
      state.refreshTokenResponseStatus = LoadStatuses.Idle;
      authSlice.caseReducers.handleDeleteTokensAndLogout(state);
    });

    for (const thunk of [handleUpdateUserData, handleGetUserData]) {
      builder.addMatcher(isFulfilled(thunk), (state, action) => {
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
