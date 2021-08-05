import React, { memo } from "react";
import classnames from "classnames";
import styles from "./FeedInfo.module.css";
import { checkOrderStatus } from "../../utils";
import { ScrollableContainer } from "../../uikit";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {ParsedIngredient} from "../../interfaces";

const MemoCurrencyIcon = memo(CurrencyIcon);

interface IFeedInfo {
  hideOrderNumber?: boolean;
  burgerName: string;
  orderNumber: number;
  orderStatus: string;
  ingredients: ParsedIngredient[];
  date: string;
  fullPrice: number;
}

const FeedInfo: React.FC<IFeedInfo> = ({
  orderNumber,
  burgerName,
  orderStatus,
  ingredients,
  date,
  fullPrice,
  hideOrderNumber = false,
}) => {
  return (
    <div className={classnames(styles.container, "pt-5")}>
      {hideOrderNumber ? null : (
        <p
          className={classnames(
            "text",
            "text_type_digits-default mb-7",
            styles.orderNumber
          )}
        >
          #{orderNumber}
        </p>
      )}

      <p className="text text_type_main-medium mb-3">{burgerName}</p>
      <p
        className={classnames(
          "text",
          "text_type_main-small",
          styles.orderStatus,
          (orderStatus === "pending" || orderStatus === "done") &&
            styles.orderStatusPending,
          orderStatus === "error" && styles.orderStatusError,
          "mb-15"
        )}
      >
        {checkOrderStatus(orderStatus)}
      </p>

      <p className="text text_type_main-medium mb-6">Состав:</p>
      <ScrollableContainer
        className={classnames(styles.itemsContainer, "mb-10")}
      >
        {ingredients.map(({ id, image, name, count, itemPrice }) => (
          <div className={styles.flexContainer} key={id}>
            <div className={styles.itemInfoContainer}>
              <div
                className={styles.icon}
                style={{ backgroundImage: `url(${image})` }}
              />
              <p
                className={classnames(
                  "text",
                  "text_type_main-default",
                  styles.name
                )}
              >
                {name}
              </p>
            </div>

            <p
              className={classnames(
                "text",
                "text_type_digits-default",
                styles.itemInfoContainer
              )}
            >
              {`${count} x ${itemPrice}`}
              <MemoCurrencyIcon type="primary" />
            </p>
          </div>
        ))}
      </ScrollableContainer>

      <div className={styles.flexContainer}>
        <p className="text text_type_main-default text_color_inactive">
          {date}
        </p>
        <p
          className={classnames(
            "text",
            "text_type_digits-default",
            styles.itemInfoContainer
          )}
        >
          {fullPrice}
          <MemoCurrencyIcon type="primary" />
        </p>
      </div>
    </div>
  );
};

export default FeedInfo;
