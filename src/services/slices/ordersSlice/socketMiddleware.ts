import { AnyAction, MiddlewareAPI } from "@reduxjs/toolkit";
import { ICloseReason, IWsActions } from "./interfaces";
import { getCookie } from "../../../utils";

export const socketMiddleware = (
  wsUrl: string,
  wsActions: IWsActions,
  isAuth?: boolean
) => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return (next: (i: AnyAction) => void) => (action: AnyAction) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } =
        wsActions;

      const token = getCookie("token");

      if (type === wsInit.type) {
        socket = new WebSocket(isAuth ? `${wsUrl}?token=${token}` : wsUrl);
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = (error) => {
          dispatch(onError(`Ошибка: ${error}`));
        };

        socket.onclose = (event) => {
          const closeReason: ICloseReason = {
            code: event.code,
            reason: event.reason,
            wasClean: event.wasClean,
          };

          dispatch(onClose(closeReason));
        };

        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch(onMessage(restParsedData));
        };

        if (type === wsSendMessage.type) {
          const message = isAuth ? { ...payload, token } : { ...payload };

          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};
