import * as yup from "yup";
import { ValidationErrorMessages } from "../enums";

export const VALIDATION_SCHEMA = {
  EMAIL: yup
    .string()
    .email(ValidationErrorMessages.IsEmail)
    .required(ValidationErrorMessages.IsRequired),
  STRING: yup.string().required(ValidationErrorMessages.IsRequired),
  PASSWORD: yup
    .string()
    .min(6, ValidationErrorMessages.IsPassword)
    .required(ValidationErrorMessages.IsRequired),
  EMAIL_NOT_REQUIRED: yup.string().email(ValidationErrorMessages.IsEmail),
  STRING_NOT_REQUIRED: yup.string(),
  PASSWORD_NOT_REQUIRED: yup.string(),
};
