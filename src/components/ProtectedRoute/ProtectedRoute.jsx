import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { Loader } from "../Loader";
import { handleGetUserData } from "../../services/slices";
import { ROUTES } from "../../constants";

const ProtectedRoute = ({ children, ...props }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [isUserLoaded, setUserLoaded] = useState(false);

  const dispatch = useDispatch();

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
              pathname: location.state?.from || ROUTES.LOGIN,
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
