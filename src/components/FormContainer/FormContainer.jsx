import React from "react";
import styles from "./FormContainer.module.css";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { LOAD_STATUSES } from "../../constants";
import { FadeAnim } from "../../uikit";
import { ControlledInput } from "../ControlledInput";

const FormContainer = ({
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
    useSelector((state) => state.form);

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
          size="default"
          onClick={
            formLoading === LOAD_STATUSES.PENDING
              ? undefined
              : handleSubmit(onSubmit)
          }
        >
          {formLoading === LOAD_STATUSES.PENDING ? "Загрузка..." : buttonValue}
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

FormContainer.propTypes = {
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  buttonValue: PropTypes.string.isRequired,
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      placeholder: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string,
      defaultValue: PropTypes.string,
    }).isRequired
  ).isRequired,
  subtitle: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      linkText: PropTypes.string.isRequired,
      onLinkClick: PropTypes.func.isRequired,
    })
  ).isRequired,
  schema: PropTypes.object.isRequired,
};

export default FormContainer;
