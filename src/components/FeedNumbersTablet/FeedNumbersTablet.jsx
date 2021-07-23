import React, { useMemo } from "react";
import classnames from "classnames";
import styles from "./FeedNumbersTablet.module.css";
import { useSelector } from "react-redux";
import { OrderColumns } from "./OrderColumns";

const FeedNumbersTablet = () => {
  const { orders, total, totalToday } = useSelector((state) => state.orders);

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

FeedNumbersTablet.propTypes = {
  // total: PropTypes.number.isRequired,
  // totalToday: PropTypes.number.isRequired,
  // orders: PropTypes.shape({
  //   id: PropTypes.string.isRequired,
  //   status: PropTypes.string.isRequired,
  //   number: PropTypes.string.isRequired,
  // }),
};

export default FeedNumbersTablet;
