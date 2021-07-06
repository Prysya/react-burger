import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

import { handleGetUserData } from "../../services/slices";
import { LOAD_STATUSES } from "../../constants";
import { Loader } from "../Loader";

const HiddenForAuthUsersRoute = ({ children, ...props }) => {
  const { isAuthenticated, tokenResponseStatus } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(handleGetUserData());
    }
    //eslint-disable-next-line
  }, []);

  if (tokenResponseStatus === LOAD_STATUSES.PENDING) {
    return <Loader />;
  }

  return (
    <Route
      {...props}
      render={({ location }) =>
        isAuthenticated ? (
          <Redirect to={location.state?.from || "/"} />
        ) : (
          children
        )
      }
    />
  );
};

export default HiddenForAuthUsersRoute;
