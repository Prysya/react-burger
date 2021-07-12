import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";

import { Loader } from "../../components";
import { handleLogout } from "../../services/slices";
import { ROUTES } from "../../constants";

const Logout = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleLogout())
      .then(unwrapResult)
      .then(() => history.replace({ pathname: ROUTES.LOGIN }))
      .catch(() => history.replace({ pathname: ROUTES.PROFILE }));

    //eslint-disable-next-line
  }, []);

  return <Loader />;
};

export default Logout;
