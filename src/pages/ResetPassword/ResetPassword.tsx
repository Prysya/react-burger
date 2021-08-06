import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";

import * as yup from "yup";

import { INPUTS, VALIDATION_SCHEMA } from "../../constants";
import { FormContainer } from "../../components";
import {
  handleResetPasswordFormSubmit,
  resetToDefault,
} from "../../services/slices";
import { Routes } from "../../enums";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { IFetchUserData } from "../../interfaces";

const schema = yup.object().shape({
  password: VALIDATION_SCHEMA.PASSWORD,
  token: VALIDATION_SCHEMA.STRING,
});

const ResetPassword: React.FC = () => {
  const [isPasswordHide, setPasswordHide] = useState(true);

  const { isPasswordForgotten } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const history = useHistory();

  const { params } = useRouteMatch<{ token: string }>();

  if (!params.hasOwnProperty("token") && !isPasswordForgotten) {
    history.replace({ pathname: Routes.Main });
  }

  useEffect(() => {
    dispatch(resetToDefault());
    //eslint-disable-next-line
  }, []);

  const handlePasswordHide = () => setPasswordHide((prev) => !prev);

  const onSubmit = (data: Pick<IFetchUserData, "email">) => {
    dispatch(handleResetPasswordFormSubmit(data))
      .then(unwrapResult)
      .then(() => {
        history.replace({ pathname: Routes.Profile });
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
          history.push(Routes.Login);
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
