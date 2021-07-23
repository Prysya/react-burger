export const checkOrderStatus = (orderStatus) => {
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
