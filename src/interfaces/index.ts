import React from "react";

export interface Ingredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v?: number;
  desc?: string;
  id?: number;
  randomId?: string;
  index?: number;
}

export interface IUser {
  accessToken: string;
  refreshToken: string;
  success: boolean;
  user: { email: string; name: string };
}

export interface IFetchUserData {
  email: string;
  password: string;
}
export interface ISetFetchUserData {
  name?: string;
  email?: string;
  password?: string;
  token?: string;
}

export interface ILocationItem {
  hash: string;
  key: string;
  pathname: string;
  search: string;
  state: null;
}

export interface ILocation {
  hash: string;
  key: string;
  pathname: string;
  search: string;
  state: { background: ILocationItem } | null;
  background: ILocationItem;
}

export interface IInputProps {
  placeholder: string;
  name: string;
  type: 'text' | 'password' | "email";
  defaultValue?: string;
  inputRef?: React.RefObject<HTMLInputElement>
  icon?: string;
  onIconCLick?: () => void
}

export interface IFormSubtitle {
  text: string;
  linkText: string;
  onLinkClick: () => void;
}

export interface ParsedIngredient {
  count: number;
  image: string;
  id: string;
  itemPrice: number;
  name: string
}

export interface IDataObject {
  [key: string]: {
    price: number;
    image: string;
    name: string;
    type: string;
  };
}
