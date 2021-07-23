import { getCookie } from "../../../utils";

export const socketMiddleware = (wsUrl, wsActions, isAuth) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
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
          dispatch(onError(`Ошибка: ${error.message}`));
        };

        socket.onclose = (event) => {
          const closeReason = {
            code: event.code,
            reason: event.reason,
            wasClean: event.wasClean
          }
          
          dispatch(onClose(closeReason));
        };

        socket.onmessage = (event) => {
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
