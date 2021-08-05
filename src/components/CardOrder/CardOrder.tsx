import React, { memo, useCallback } from "react";
import classnames from "classnames";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { checkOrderStatus } from "../../utils";

import styles from "./CardOrder.module.css";
import {
  handleOpenFeedInfoModal,
  handleOrderSelection,
} from "../../services/slices";
import { Routes } from "../../enums";
import { useHistory, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { ParsedIngredient } from "../../interfaces";

const MemoCurrencyIcon = memo(CurrencyIcon);

export interface ICardOrder {
  _id: string;
  orderNumber: number;
  date: string;
  burgerName: string;
  orderStatus: string;
  ingredients: ParsedIngredient[] | [];
  price: number;
  iconsCount?: number;
  fromProfile?: boolean;
}

const CardOrder: React.FC<ICardOrder> = ({
  _id,
  orderNumber,
  date,
  burgerName,
  orderStatus,
  ingredients,
  price,
  iconsCount = 6,
  fromProfile = false,
}) => {
  const dispatch = useAppDispatch();

  const location = useLocation();

  const history = useHistory();

  const remains =
    ingredients.length > iconsCount ? ingredients.length - iconsCount : 0;

  const handleCardClick = useCallback(() => {
    dispatch(
      handleOrderSelection({
        orderNumber,
        date,
        burgerName,
        orderStatus,
        ingredients,
        fullPrice: price,
      })
    );
    dispatch(handleOpenFeedInfoModal());

    history.push({
      pathname: `${fromProfile ? Routes.Orders : Routes.Feed}/${_id}`,
      state: {
        background: location,
      },
    });
    //eslint-disable-next-line
  }, []);

  return (
    <div
      className={classnames(styles.container, "p-6")}
      onClick={handleCardClick}
    >
      <div className={classnames(styles.flexContainer, "mb-6")}>
        <p className="text text_type_digits-default">{`#${orderNumber}`}</p>
        <p className="text text_type_main-default text_color_inactive">
          {date}
        </p>
      </div>
      <p className="text text_type_main-medium mb-3">{burgerName}</p>
      <p
        className={classnames(
          "text",
          "text_type_main-small",
          (orderStatus === "pending" || orderStatus === "done") &&
            styles.orderStatusPending,
          orderStatus === "error" && styles.orderStatusError,
          "mb-4"
        )}
      >
        {checkOrderStatus(orderStatus)}
      </p>

      <div className={styles.flexContainer}>
        <div className={styles.iconContainer}>
          {[...ingredients]
            .splice(0, iconsCount)
            .map(({ image, id }, index) => {
              return (
                <div
                  className={classnames(
                    styles.icon,
                    remains > 0 && styles.iconWithRemains
                  )}
                  key={id}
                  style={{
                    zIndex: iconsCount - index,
                    backgroundImage: `url(${image})`,
                  }}
                >
                  {index === 5 && remains > 0 ? (
                    <span
                      className={classnames(
                        "text",
                        "text_type_main-default",
                        styles.remainsText
                      )}
                    >
                      +{remains}
                    </span>
                  ) : null}
                </div>
              );
            })}
        </div>

        <span
          className={classnames(
            "text",
            "text_type_digits-default",
            styles.flexContainer
          )}
        >
          {price} <MemoCurrencyIcon type="primary" />
        </span>
      </div>
    </div>
  );
};

export default memo(CardOrder);
