import React, { useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";


import { INPUTS, ROUTES, VALIDATION_SCHEMA } from "../../constants";
import { FormContainer } from "../../components";
import {
  getSuccessForPasswordReset,
  handleForgotPasswordFormSubmit,
  resetToDefault,
} from "../../services/slices";

const schema = yup.object().shape({
  email: VALIDATION_SCHEMA.EMAIL,
});

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    dispatch(resetToDefault());
    //eslint-disable-next-line
  }, []);

  const onSubmit = (data) =>
    dispatch(handleForgotPasswordFormSubmit(data))
      .then(unwrapResult)
      .then(() => {
        dispatch(getSuccessForPasswordReset());
        
        history.push(ROUTES.RESET_PASSWORD);
      })
      .catch((rejectedValueOrSerializedError) => {
        console.error(rejectedValueOrSerializedError);
      });

  const inputs = useMemo(
    () => [INPUTS.createEmailInputProps("Укажите e-mail")],
    []
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

export default ForgotPassword;
