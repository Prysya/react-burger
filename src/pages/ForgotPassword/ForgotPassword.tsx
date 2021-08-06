import React, { useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { unwrapResult } from "@reduxjs/toolkit";


import { INPUTS, VALIDATION_SCHEMA } from "../../constants";
import {Routes} from "../../enums";
import { FormContainer } from "../../components";
import {
  getSuccessForPasswordReset,
  handleForgotPasswordFormSubmit,
  resetToDefault,
} from "../../services/slices";
import {useAppDispatch} from "../../hooks";
import {IFetchUserData, IInputProps} from "../../interfaces";

const schema = yup.object().shape({
  email: VALIDATION_SCHEMA.EMAIL,
});

const ForgotPassword = () => {
  const dispatch = useAppDispatch();

  const history = useHistory();

  useEffect(() => {
    dispatch(resetToDefault());
    //eslint-disable-next-line
  }, []);

  const onSubmit = (data:Pick<IFetchUserData, 'email'>) =>
    dispatch(handleForgotPasswordFormSubmit(data))
      .then(unwrapResult)
      .then(() => {
        dispatch(getSuccessForPasswordReset());

        history.push(Routes.ResetPassword);
      })
      .catch((rejectedValueOrSerializedError) => {
        console.error(rejectedValueOrSerializedError);
      });

  const inputs = useMemo<IInputProps[]>(
    () => [INPUTS.createEmailInputProps("Укажите e-mail")],
    []
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

export default ForgotPassword;
