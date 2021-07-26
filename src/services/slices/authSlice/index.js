import {
  createSlice,
  isFulfilled,
  isRejected,
  isPending,
} from "@reduxjs/toolkit";

import { deleteTokens, setTokens } from "../../../utils";

import { LOAD_STATUSES } from "../../../constants";
import { handleUpdateToken } from "./handleUpdateToken";
import { handleLogout } from "./handleLogout";
import { handleGetUserData } from "./handleGetUserData";
import { handleUpdateUserData } from "./handleUpdateUserData";

export const initialAuthState = {
  tokenResponseStatus: LOAD_STATUSES.IDLE,

  accessTokenResponseStatus: LOAD_STATUSES.IDLE,
  refreshTokenResponseStatus: LOAD_STATUSES.IDLE,

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
    handleDeleteTokensAndLogout: (state) => {
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
        if (state.tokenResponseStatus === LOAD_STATUSES.IDLE) {
          state.tokenResponseStatus = LOAD_STATUSES.PENDING;
        }
      });
      builder.addCase(thunk.fulfilled, (state) => {
        if (state.tokenResponseStatus === LOAD_STATUSES.PENDING) {
          state.tokenResponseStatus = LOAD_STATUSES.IDLE;
          state.isPasswordForgotten = false;
        }
      });
      builder.addCase(thunk.rejected, (state, action) => {
        if (state.tokenResponseStatus === LOAD_STATUSES.PENDING) {
          state.tokenResponseStatus = LOAD_STATUSES.IDLE;

          if (action.payload?.message) {
            state.authError = action.payload.message;
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
        state.refreshTokenResponseStatus = LOAD_STATUSES.PENDING;
      });
    }

    builder.addMatcher(isPending(handleGetUserData), (state) => {
      state.accessTokenResponseStatus = LOAD_STATUSES.PENDING;
    });

    builder.addMatcher(isRejected(handleUpdateToken), (state) => {
      state.refreshTokenResponseStatus = LOAD_STATUSES.IDLE;
      authSlice.caseReducers.handleDeleteTokensAndLogout(state);
    });

    builder.addMatcher(isRejected(handleLogout), (state) => {
      state.refreshTokenResponseStatus = LOAD_STATUSES.IDLE;
    });

    builder.addMatcher(isRejected(handleGetUserData), (state) => {
      state.isAuthenticated = false;
      state.accessTokenResponseStatus = LOAD_STATUSES.IDLE;
    });

    builder.addMatcher(isFulfilled(handleUpdateToken), (state) => {
      state.refreshTokenResponseStatus = LOAD_STATUSES.IDLE;
    });

    builder.addMatcher(isFulfilled(handleGetUserData), (state) => {
      state.accessTokenResponseStatus = LOAD_STATUSES.IDLE;
    });

    builder.addMatcher(isFulfilled(handleLogout), (state) => {
      state.refreshTokenResponseStatus = LOAD_STATUSES.IDLE;
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
