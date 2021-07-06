import * as yup from "yup";
import { MESSAGES } from "./messages";

export const VALIDATION_SCHEMA = {
  EMAIL: yup
    .string(MESSAGES.VALIDATION_ERRORS.IS_STRING)
    .email(MESSAGES.VALIDATION_ERRORS.IS_EMAIL)
    .required(MESSAGES.VALIDATION_ERRORS.IS_REQUIRED),
  STRING: yup
    .string(MESSAGES.VALIDATION_ERRORS.IS_STRING)
    .required(MESSAGES.VALIDATION_ERRORS.IS_REQUIRED),
  PASSWORD: yup
    .string(MESSAGES.VALIDATION_ERRORS.IS_STRING)
    .min(8, MESSAGES.VALIDATION_ERRORS.IS_PASSWORD)
    .required(MESSAGES.VALIDATION_ERRORS.IS_REQUIRED),
  EMAIL_NOT_REQUIRED: yup
    .string(MESSAGES.VALIDATION_ERRORS.IS_STRING)
    .email(MESSAGES.VALIDATION_ERRORS.IS_EMAIL),
  STRING_NOT_REQUIRED: yup.string(MESSAGES.VALIDATION_ERRORS.IS_STRING),
  PASSWORD_NOT_REQUIRED: yup
    .string(MESSAGES.VALIDATION_ERRORS.IS_STRING)
};
