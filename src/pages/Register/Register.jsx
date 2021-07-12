import React, {useEffect, useMemo, useState} from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

import { FormContainer } from "../../components";
import { INPUTS, ROUTES, VALIDATION_SCHEMA } from "../../constants";
import { useDispatch } from "react-redux";
import {handleRegisterFormSubmit, resetToDefault, setUserData} from "../../services/slices";
import { unwrapResult } from "@reduxjs/toolkit";

const schema = yup.object().shape({
  name: VALIDATION_SCHEMA.STRING,
  password: VALIDATION_SCHEMA.PASSWORD,
  email: VALIDATION_SCHEMA.EMAIL,
});

const Register = () => {
  const [isPasswordHide, setPasswordHide] = useState(true);

  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetToDefault());
    //eslint-disable-next-line
  }, []);

  const handlePasswordHide = () => setPasswordHide((prev) => !prev);

  const onSubmit = (data) =>
    dispatch(handleRegisterFormSubmit(data))
      .then(unwrapResult)
      .then((data) => {
        dispatch(setUserData(data));

        history.replace({pathname: ROUTES.MAIN})
      })
      .catch((rejectedValueOrSerializedError) => {
        console.error(rejectedValueOrSerializedError);
      });

  const inputs = useMemo(
    () => [
      INPUTS.name,
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
        text: "Уже зарегестрированы?",
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
      buttonValue="Регистрация"
      onSubmit={onSubmit}
      inputs={inputs}
      subtitle={subtitle}
      title="Зарегестрироваться"
      schema={schema}
    />
  );
};

export default Register;
