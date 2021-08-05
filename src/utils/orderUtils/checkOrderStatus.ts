export const checkOrderStatus = (orderStatus: string): string => {
  switch (orderStatus) {
    case "created":
      return "Создан";
    case "pending":
      return "Готовится";
    case "error":
      return "Отменен";
    default:
      return "Выполнен";
  }
};
