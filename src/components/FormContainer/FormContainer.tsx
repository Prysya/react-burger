import React from "react";
import styles from "./FormContainer.module.css";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { LoadStatuses } from "../../enums";
import { FadeAnim } from "../../uikit";
import { ControlledInput } from "../ControlledInput";
import { IFetchUserData, IFormSubtitle, IInputProps } from "../../interfaces";
import { useAppSelector } from "../../hooks";

interface IFormContainer {
  title: string;
  onSubmit: (arg: IFetchUserData) => void;
  buttonValue: string;
  inputs: IInputProps[];
  subtitle: IFormSubtitle[];
  schema: any;
}

const FormContainer: React.FC<IFormContainer> = ({
  title,
  buttonValue,
  onSubmit,
  inputs,
  subtitle,
  schema,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { formLoading, formErrorMessage, formPendingSuccessMessage } =
    useAppSelector((state) => state.form);

  return (
    <FadeAnim className={styles.container}>
      <form
        className={classNames(styles.form, "mb-20")}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2
          className={classNames("text", "text_type_main-medium", styles.title)}
        >
          {title}
        </h2>
        {Array.isArray(inputs) &&
          inputs.map(
            ({ type, name, placeholder, defaultValue = "", ...props }) => {
              return (
                <ControlledInput
                  key={name}
                  placeholder={placeholder}
                  control={control}
                  name={name}
                  errors={errors}
                  type={type}
                  {...props}
                />
              );
            }
          )}
        <Button
          type="primary"
          size="medium"
          onClick={
            formLoading === LoadStatuses.Pending
              ? undefined
              : handleSubmit(onSubmit)
          }
        >
          {formLoading === LoadStatuses.Pending ? "Загрузка..." : buttonValue}
        </Button>

        {formErrorMessage && (
          <span
            className={classNames(
              "text",
              "text_type_main-default",
              styles.error
            )}
          >
            {formErrorMessage}
          </span>
        )}
        {formPendingSuccessMessage && (
          <span
            className={classNames(
              "text",
              "text_type_main-default",
              styles.success
            )}
          >
            {formPendingSuccessMessage}
          </span>
        )}
      </form>

      <div className={styles.subtitleContainer}>
        {Array.isArray(subtitle) &&
          subtitle.map(({ text, linkText, onLinkClick }) => (
            <p
              className="text text_type_main-default text_color_inactive"
              key={text}
            >
              {`${text} `}
              <span className={styles.link} onClick={onLinkClick}>
                {linkText}
              </span>
            </p>
          ))}
      </div>
    </FadeAnim>
  );
};

export default FormContainer;
