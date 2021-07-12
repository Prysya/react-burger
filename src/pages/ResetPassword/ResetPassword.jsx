import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import { INPUTS, ROUTES, VALIDATION_SCHEMA } from "../../constants";
import { FormContainer } from "../../components";
import { handleResetPasswordFormSubmit } from "../../services/slices";
import { unwrapResult } from "@reduxjs/toolkit";
import { resetToDefault } from "../../services/slices";

const schema = yup.object().shape({
  password: VALIDATION_SCHEMA.PASSWORD,
  token: VALIDATION_SCHEMA.STRING,
});

const ResetPassword = () => {
  const [isPasswordHide, setPasswordHide] = useState(true);

  const { isPasswordForgotten } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const history = useHistory();

  const { params } = useRouteMatch();

  if (!params.hasOwnProperty("token") && !isPasswordForgotten) {
    history.replace({ pathname: ROUTES.MAIN });
  }

  useEffect(() => {
    dispatch(resetToDefault());
    //eslint-disable-next-line
  }, []);

  const handlePasswordHide = () => setPasswordHide((prev) => !prev);

  const onSubmit = (data) => {
    dispatch(handleResetPasswordFormSubmit(data))
      .then(unwrapResult)
      .then(() => {
        history.replace({ pathname: ROUTES.PROFILE });
      })
      .catch(() => {});
  };

  const inputs = useMemo(
    () => [
      INPUTS.createPasswordInputProps(
        "Введите новый пароль",
        isPasswordHide,
        handlePasswordHide
      ),
      INPUTS.createTokenProps(params?.token),
    ],
    [isPasswordHide, params]
  );

  const subtitle = useMemo(
    () => [
      {
        text: "Вспомнили пароль?",
        linkText: "Войти",
        onLinkClick: () => {
          history.push(ROUTES.LOGIN);
        },
      },
    ],
    //eslint-disable-next-line
    []
  );

  return (
    <FormContainer
      buttonValue="Восстановление пароля"
      onSubmit={onSubmit}
      inputs={inputs}
      subtitle={subtitle}
      title="Восстановить"
      schema={schema}
    />
  );
};

export default ResetPassword;
