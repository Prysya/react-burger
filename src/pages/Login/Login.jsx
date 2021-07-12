import React, { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import * as yup from "yup";

import { FormContainer } from "../../components";
import { INPUTS, ROUTES, VALIDATION_SCHEMA } from "../../constants";
import {
  handleLoginFormSubmit,
  resetToDefault,
  setUserData,
} from "../../services/slices";

const schema = yup.object().shape({
  email: VALIDATION_SCHEMA.EMAIL,
  password: VALIDATION_SCHEMA.PASSWORD,
});

const Login = () => {
  const [isPasswordHide, setPasswordHide] = useState(true);

  const dispatch = useDispatch();

  const history = useHistory();


  useEffect(() => {
    dispatch(resetToDefault());
    //eslint-disable-next-line
  }, []);

  const handlePasswordHide = () => setPasswordHide((prev) => !prev);

  const onSubmit = (data) =>
    dispatch(handleLoginFormSubmit(data))
      .then(unwrapResult)
      .then((data) => {
        dispatch(setUserData(data));

        history.replace({ pathname: ROUTES.MAIN });
      })
      .catch(() => {});

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
        onLinkClick: () => {
          history.push(ROUTES.REGISTER);
        },
      },
      {
        text: "Забыли пароль?",
        linkText: "Восстановить пароль",
        onLinkClick: () => {
          history.push(ROUTES.FORGOT_PASSWORD);
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
