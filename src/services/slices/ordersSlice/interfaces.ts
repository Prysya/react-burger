import type {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";
import {Ingredient, ParsedIngredient} from "../../../interfaces";

export interface IWsActions {
  wsInit: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  wsSendMessage: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithPayload<ICloseReason>;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<IWsMessage>;
}

export interface ICloseReason {
  code: number;
  reason: string;
  wasClean: boolean;
}

export interface IWsMessage {
  total: number;
  totalToday: number;
  orders: Array<IOrder>;
}

export interface IOrder {
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export interface ICurrentOrder {
  orderNumber: number;
  date: string;
  burgerName: string;
  orderStatus: string;
  ingredients: ParsedIngredient[];
  fullPrice: number;
}

export interface IOrderRequest {
  success: boolean;
  orders: IOrder[];
  total: number;
  totalToday: number;
}

export interface IInitialOrderState {
  orders: IOrder[];
  currentUserOrders: IOrder[];
  selectedOrder: ICurrentOrder | null;

  total: number;
  totalToday: number;

  wsError: string | null;
  wsClose: ICloseReason | null;
  wsConnected: boolean;
  wsAuthConnected: boolean;
}
