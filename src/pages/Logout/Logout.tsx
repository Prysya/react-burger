import React, { useEffect } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";

import { Loader } from "../../components";
import { handleLogout } from "../../services/slices";
import { Routes } from "../../enums";
import {useAppDispatch} from "../../hooks";

const Logout = () => {
  const history = useHistory();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(handleLogout())
      .then(unwrapResult)
      .then(() => history.replace({ pathname: Routes.Login }))
      .catch(() => history.replace({ pathname: Routes.Profile }));

    //eslint-disable-next-line
  }, []);

  return <Loader />;
};

export default Logout;
