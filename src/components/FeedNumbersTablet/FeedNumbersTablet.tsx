import React, { useMemo } from "react";
import classnames from "classnames";
import styles from "./FeedNumbersTablet.module.css";
import { OrderColumns } from "./OrderColumns";
import { useAppSelector } from "../../hooks";

const FeedNumbersTablet:React.FC = () => {
  const { orders, total, totalToday } = useAppSelector((state) => state.orders);

  const readyOrders = useMemo(
    () => orders.filter(({ status }) => status === "done").splice(0, 20),
    [orders]
  );
  const onWorkOrders = useMemo(
    () => orders.filter(({ status }) => status === "pending").splice(0, 20),
    [orders]
  );

  return (
    <div className={classnames(styles.section, "pt-25", "pb-10")}>
      <div className={styles.flexContainer}>
        <OrderColumns title="Готовы" orders={readyOrders} />
        <OrderColumns
          title="В работе"
          orders={onWorkOrders}
          variant="secondary"
        />
      </div>

      <div className="mb-15">
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p
          className={classnames(
            "text",
            "text_type_digits-large",
            styles.numbers
          )}
        >
          {total}
        </p>
      </div>

      <div>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p
          className={classnames(
            "text",
            "text_type_digits-large",
            styles.numbers
          )}
        >
          {totalToday}
        </p>
      </div>
    </div>
  );
};

export default FeedNumbersTablet;
