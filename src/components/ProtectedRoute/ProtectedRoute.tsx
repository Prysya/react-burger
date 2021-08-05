import React, { useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { Redirect, Route, RouteProps } from "react-router-dom";
import PropTypes from "prop-types";

import { Loader } from "../Loader";
import { handleGetUserData } from "../../services/slices";
import { Routes } from "../../enums";
import { useAppDispatch, useAppSelector } from "../../hooks";

const ProtectedRoute: React.FC<RouteProps> = ({ children, ...props }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const [isUserLoaded, setUserLoaded] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(handleGetUserData())
        .then(unwrapResult)
        .catch(() => {})
        .finally(() => setUserLoaded(true));
    } else {
      setUserLoaded(true);
    }

    return () => {
      setUserLoaded(false);
    };
    //eslint-disable-next-line
  }, []);

  if (!isUserLoaded) {
    return <Loader />;
  }

  return (
    <Route
      {...props}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: Routes.Login,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
