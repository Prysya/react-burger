import React from "react";

import styles from "./OrderDetails.module.css";

import { OrderDoneImage } from "../../uikit";

interface IOrderDetails {
  orderNumber: string | number;
}

const OrderDetails:React.FC<IOrderDetails> = ({ orderNumber }) => {
  return (
    <>
      <h3 className={`${styles.orderNumber} text text_type_digits-large mb-8`}>
        {String(orderNumber).padStart(6, "0")}
      </h3>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <OrderDoneImage className="mb-15" />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
};

export default OrderDetails;
