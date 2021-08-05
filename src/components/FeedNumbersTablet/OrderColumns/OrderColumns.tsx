import React, { memo } from "react";
import classnames from "classnames";
import styles from "./OrderColumns.module.css";
import { IOrder } from "../../../services/slices/ordersSlice/interfaces";

interface IOrderColumns {
  title: string;
  variant?: "primary" | "secondary";
  orders: IOrder[];
}

const OrderColumns:React.FC<IOrderColumns> = ({
  title,
  variant = "primary",
  orders,
}) => {
  return (
    <div className={classnames(styles.container, "mb-15")}>
      <p className="text text_type_main-default mb-6">{title}:</p>
      <div className={styles.orderColumns}>
        {orders.length > 0 &&
          orders.map(({ number, _id }) => (
            <p
              className={classnames(
                "text",
                "text_type_digits-default",
                styles.orderItem,
                variant === "primary" && styles.variantPrimary
              )}
              key={_id}
            >
              {number}
            </p>
          ))}
      </div>
    </div>
  );
};

export default memo(OrderColumns);
