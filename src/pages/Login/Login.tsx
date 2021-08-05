import React, { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import * as yup from "yup";

import { FormContainer } from "../../components";
import { INPUTS, VALIDATION_SCHEMA } from "../../constants";
import { Routes } from "../../enums";
import {
  handleLoginFormSubmit,
  resetToDefault,
  setUserData,
} from "../../services/slices";
import { useAppDispatch } from "../../hooks";
import { IFetchUserData } from "../../interfaces";

const schema = yup.object().shape({
  email: VALIDATION_SCHEMA.EMAIL,
  password: VALIDATION_SCHEMA.PASSWORD,
});

const Login: React.FC = () => {
  const [isPasswordHide, setPasswordHide] = useState(true);

  const dispatch = useAppDispatch();

  const history = useHistory();

  useEffect(() => {
    dispatch(resetToDefault());
    //eslint-disable-next-line
  }, []);

  const handlePasswordHide = () => setPasswordHide((prev) => !prev);

  const onSubmit = (data: IFetchUserData) => {
    dispatch(handleLoginFormSubmit(data))
      .then(unwrapResult)
      .then((data) => {
        dispatch(setUserData(data));

        history.replace({ pathname: Routes.Main });
      })
      .catch(() => {});
  };

  const inputs = useMemo(
    () => [
      INPUTS.createEmailInputProps("E-mail"),
      INPUTS.createPasswordInputProps(
        "Пароль",
        isPasswordHide,
        handlePasswordHide
      ),
    ],
    [isPasswordHide]
  );

  const subtitle = useMemo(
    () => [
      {
        text: "Вы — новый пользователь?",
        linkText: "Зарегистрироваться",
        type: "text",
        onLinkClick: () => {
          history.push(Routes.Register);
        },
      },
      {
        text: "Забыли пароль?",
        type: "text",
        linkText: "Восстановить пароль",
        onLinkClick: () => {
          history.push(Routes.ForgotPassword);
        },
      },
    ],
    //eslint-disable-next-line
    []
  );

  return (
    <FormContainer
      buttonValue="Войти"
      onSubmit={onSubmit}
      inputs={inputs}
      subtitle={subtitle}
      title="Вход"
      schema={schema}
    />
  );
};

export default Login;
