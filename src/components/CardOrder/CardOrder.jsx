import React, { memo, useCallback } from "react";
import classnames from "classnames";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { checkOrderStatus } from "../../utils";

import styles from "./CardOrder.module.css";
import { useDispatch } from "react-redux";
import {
  handleOpenFeedInfoModal,
  handleOrderSelection,
} from "../../services/slices";
import { ROUTES } from "../../constants";
import { useHistory } from "react-router-dom";

const MemoCurrencyIcon = memo(CurrencyIcon);

const CardOrder = ({
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
  const dispatch = useDispatch();

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

    history.replace({
      pathname: `${fromProfile ? ROUTES.ORDERS : ROUTES.FEED}/${_id}`,
      state: {
        from: fromProfile ? ROUTES.ORDERS : ROUTES.FEED
      }
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

CardOrder.propTypes = {
  _id: PropTypes.string.isRequired,
  orderNumber: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  burgerName: PropTypes.string.isRequired,
  orderStatus: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  price: PropTypes.number.isRequired,
  iconsCount: PropTypes.number,
  fromProfile: PropTypes.bool,
};

export default memo(CardOrder);
