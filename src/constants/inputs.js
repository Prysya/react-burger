export const INPUTS = {
  name: { name: "name", placeholder: "Имя", type: "text" },
  createEmailInputProps:(placeholder) => ({ name: "email", placeholder, type: "text" }),
  createPasswordInputProps: (placeholder, isPasswordHide, handler) => ({
    name: "password",
    placeholder,
    type: isPasswordHide ? "password" : "text",
    icon: isPasswordHide ? "ShowIcon" : "HideIcon",
    onIconClick: handler
  }),
  createTokenProps: (defaultValue) => ({name: 'token', placeholder: 'Введите код из письма', type: 'text', defaultValue})
}
