import React, { useEffect } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

import { handleGetUserData } from "../../services/slices";
import { LoadStatuses, Routes } from "../../enums";
import { Loader } from "../Loader";
import { useAppDispatch, useAppSelector } from "../../hooks";

const HiddenForAuthUsersRoute: React.FC<RouteProps> = ({
  children,
  ...props
}) => {
  const { isAuthenticated, tokenResponseStatus } = useAppSelector(
    (state) => state.auth
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(handleGetUserData());
    }
    //eslint-disable-next-line
  }, []);

  if (tokenResponseStatus === LoadStatuses.Pending) {
    return <Loader />;
  }

  return (
    <Route
      {...props}
      render={({ location }) =>
        isAuthenticated ? (
          <Redirect
            to={{ pathname: Routes.Profile, state: { from: location } }}
          />
        ) : (
          children
        )
      }
    />
  );
};

export default HiddenForAuthUsersRoute;
