import React, {useEffect, useMemo, useState} from "react";
import { useHistory } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import * as yup from "yup";

import { FormContainer } from "../../components";
import { INPUTS, VALIDATION_SCHEMA } from "../../constants";
import {handleRegisterFormSubmit, resetToDefault, setUserData} from "../../services/slices";
import {Routes} from "../../enums";
import {useAppDispatch} from "../../hooks";
import {ISetFetchUserData} from "../../interfaces";

const schema = yup.object().shape({
  name: VALIDATION_SCHEMA.STRING,
  password: VALIDATION_SCHEMA.PASSWORD,
  email: VALIDATION_SCHEMA.EMAIL,
});

const Register:React.FC = () => {
  const [isPasswordHide, setPasswordHide] = useState(true);

  const history = useHistory();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetToDefault());
    //eslint-disable-next-line
  }, []);

  const handlePasswordHide = ():void => setPasswordHide((prev) => !prev);

  const onSubmit = (data:ISetFetchUserData):void => {
    dispatch(handleRegisterFormSubmit(data))
      .then(unwrapResult)
      .then((data) => {
        dispatch(setUserData(data));

        history.replace({ pathname: Routes.Main });
      })
      .catch((rejectedValueOrSerializedError) => {
        console.error(rejectedValueOrSerializedError);
      });
  }

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
          history.push(Routes.Login);
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
