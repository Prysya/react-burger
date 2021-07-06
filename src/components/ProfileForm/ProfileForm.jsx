import React, { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./ProfileForm.module.css";

import { FadeAnim } from "../../uikit";
import { LOAD_STATUSES, VALIDATION_SCHEMA } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { ControlledInput } from "../ControlledInput";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { handleUpdateUserData } from "../../services/slices";
import { unwrapResult } from "@reduxjs/toolkit";
import classNames from "classnames";

const schema = yup.object().shape({
  name: VALIDATION_SCHEMA.STRING_NOT_REQUIRED,
  email: VALIDATION_SCHEMA.EMAIL_NOT_REQUIRED,
  password: VALIDATION_SCHEMA.PASSWORD_NOT_REQUIRED,
});

const initialState = { name: true, email: true, password: true };

const ProfileForm = () => {
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { userName, userEmail, tokenResponseStatus } = useSelector(
    (state) => state.auth
  );

  const [disabledInputs, setDisabledInputs] = useState(initialState);

  const [nameValue, emailValue, passwordValue] = watch(["name", "email", "password"]);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const onSubmit = (data) => {
    const newData = {};
    console.log(data);

    if (data.email !== userEmail) {
      newData.email = data.email;
    }

    if (data.name !== userName) {
      newData.name = data.name;
    }

    if (data.password.length > 7) {
      newData.password = data.password;
    }

    dispatch(handleUpdateUserData(newData))
      .then(unwrapResult)
      .then(() => {
        setSuccess(true);

        const timer = setTimeout(() => {
          setSuccess(false);
          clearInterval(timer);
        }, 1500);
      })
      .catch(() => {
        setError(true);

        const timer = setTimeout(() => {
          setError(false);
          clearInterval(timer);
        }, 1500);
      });
  };

  const handleInputsReset = () => {
    reset({ name: userName, email: userEmail, password: "" });
  };

  const inputs = useMemo(
    () => [
      {
        name: "name",
        placeholder: "Имя",
        type: "text",
        defaultValue: userName,
        inputRef: nameRef,
      },
      {
        name: "email",
        placeholder: "E-mail",
        type: "text",
        defaultValue: userEmail,
        inputRef: emailRef,
      },
      {
        name: "password",
        placeholder: "Пароль",
        type: "password",
        inputRef: passwordRef,
      },
    ],
    [userEmail, userName]
  );

  return (
    <FadeAnim className={styles.container}>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        {Array.isArray(inputs) &&
          inputs.map(
            ({
              type,
              name,
              placeholder,
              defaultValue = "",
              inputRef,
              ...props
            }) => {
              return (
                <ControlledInput
                  key={name}
                  placeholder={placeholder}
                  control={control}
                  name={name}
                  errors={errors}
                  icon={"EditIcon"}
                  type={type}
                  disabled={disabledInputs[name]}
                  defaultValue={defaultValue}
                  inputRef={inputRef}
                  onIconClick={() => {
                    setDisabledInputs({ ...initialState, [name]: false });
                    setTimeout(() => inputRef.current.focus(), 0);
                  }}
                  onBlur={() => setDisabledInputs(initialState)}
                  {...props}
                />
              );
            }
          )}

        {error && (
          <span
            className={classNames(
              "text",
              "text_type_main-default",
              styles.error
            )}
          >
            Ошибка обновления данных
          </span>
        )}
        {success && (
          <span
            className={classNames(
              "text",
              "text_type_main-default",
              styles.success
            )}
          >
            Данные успешно обновлены
          </span>
        )}
      </form>

      {(isDirty || (!nameValue && nameValue !== userName && emailValue !== userEmail && passwordValue)) && (
        <FadeAnim className={styles.buttonsContainer}>
          <Button type="secondary" size="medium" onClick={handleInputsReset}>
            Отмена
          </Button>
          <Button
            type="primary"
            size="medium"
            onClick={
              tokenResponseStatus === LOAD_STATUSES.IDLE
                ? handleSubmit(onSubmit)
                : undefined
            }
          >
            Сохранить
          </Button>
        </FadeAnim>
      )}
    </FadeAnim>
  );
};

export default ProfileForm;
