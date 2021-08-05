import React, { memo } from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import {Control, Controller} from "react-hook-form";

interface IControlledInput {
  type: "text" | "email" | "password";
  placeholder: string;
  name: string;
  errors: {[key: string]: {message: string}};
  control: Control;
  defaultValue?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  [x: string]: any;
}

const ControlledInput: React.FC<IControlledInput> = ({
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
          errorText={errors?.[name]?.message}
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

export default memo(ControlledInput);
