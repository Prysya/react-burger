import React, { memo } from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";

const ControlledInput = ({
  type,
  placeholder,
  errors,
  name,
  control,
  defaultValue = "",
  inputRef,
  ...props
}) => {
  return (
    <Controller
      render={({ field: { ref, ...field } }) => (
        <Input
          type={type}
          placeholder={placeholder}
          errorText={errors[name]?.message}
          error={errors.hasOwnProperty(name)}
          success={true}
          ref={inputRef}
          {...field}
          {...props}
        />
      )}
      name={name}
      control={control}
      defaultValue={defaultValue}
    />
  );
};

ControlledInput.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  defaultValue: PropTypes.string,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(HTMLInputElement) })
  ])
};

export default memo(ControlledInput);
