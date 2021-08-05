import { IInputProps } from "../interfaces";

interface IInputs {
  name: IInputProps;
  createEmailInputProps: (x: string) => IInputProps;
  createPasswordInputProps: (
    x: string,
    y: boolean,
    z: () => void
  ) => IInputProps;
  createTokenProps: (x: string) => IInputProps;
}

export const INPUTS: IInputs = {
  name: { name: "name", placeholder: "Имя", type: "text" },
  createEmailInputProps: (placeholder) => ({
    name: "email",
    placeholder,
    type: "text",
  }),
  createPasswordInputProps: (placeholder, isPasswordHide, handler) => ({
    name: "password",
    placeholder,
    type: isPasswordHide ? "password" : "text",
    icon: isPasswordHide ? "ShowIcon" : "HideIcon",
    onIconClick: handler,
  }),
  createTokenProps: (defaultValue) => ({
    name: "token",
    placeholder: "Введите код из письма",
    type: "text",
    defaultValue,
  }),
};
