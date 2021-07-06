import React, { memo, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import classnames from "classnames";

import styles from "./BurgerConstructor.module.css";

import { ScrollableContainer } from "../../uikit";
import { BurgerElement } from "./";

import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
  calculateFullPrice,
  deleteAllIngredients,
  handleBunSelection,
  handleGetUserData,
  handleItemAddition,
  handleOpenOrderDetailsModal,
} from "../../services/slices";

import { ITEM_TYPES, LOAD_STATUSES, ROUTES } from "../../constants";
import { unwrapResult } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";

const MemoCurrencyIcon = memo(CurrencyIcon);
const MemoButton = memo(Button);

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const {
    data: { dataLoading },
    items: { selectedBun, selectedItems, fullPrice },
    modalWindows: { isOrderButtonDisabled },
  } = useSelector(({ items, modalWindows, data }) => ({
    items,
    modalWindows,
    data,
  }));

  useEffect(() => {
    dispatch(calculateFullPrice());
  }, [dispatch, selectedBun, selectedItems]);

  const [{ isHover, item }, drop] = useDrop({
    accept: ITEM_TYPES.INGREDIENT,
    drop: (item) => {
      return item.type === "bun"
        ? dispatch(handleBunSelection(item))
        : dispatch(handleItemAddition(item));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
      item: monitor.getItem(),
    }),
  });

  const handleOrderButtonClick = useCallback(() => {
    dispatch(handleGetUserData())
      .then(unwrapResult)
      .then(() => {
        dispatch(handleOpenOrderDetailsModal({ selectedItems, selectedBun }))
          .then(unwrapResult)
          .then(() => dispatch(deleteAllIngredients()))
          .catch(() => {});
      })
      .catch(() => {
        history.replace({ pathname: ROUTES.LOGIN });
      });

    //eslint-disable-next-line
  }, [dispatch]);

  const hoveredClass = useMemo(
    () =>
      selectedItems.length === 0
        ? styles.hoveredElements_empty
        : styles.hoveredElements,
    [selectedItems]
  );

  if (dataLoading === LOAD_STATUSES.PENDING) return null;
  
  return (
    <div
      className={classnames(
        styles.section,
        isHover && item.type === "bun" && styles.hoveredBun,
        "pt-25",
        "pb-10"
      )}
      ref={drop}
    >
      <BurgerElement
        type="top"
        isLocked={true}
        image={selectedBun.image}
        name={`${selectedBun.name} (верх)`}
        price={selectedBun.price}
      />

      <ScrollableContainer
        className={classnames(isHover && item.type !== "bun" && hoveredClass)}
      >
        <ul className={styles.burgerItemsContainer}>
          {selectedItems.map(({ name, price, image, _id, randomId }, index) => (
            <BurgerElement
              name={name}
              price={price}
              image={image}
              nodeType="li"
              index={index}
              key={randomId}
              id={_id}
            />
          ))}
        </ul>
      </ScrollableContainer>

      <BurgerElement
        type="bottom"
        isLocked={true}
        image={selectedBun.image}
        name={`${selectedBun.name} (низ)`}
        price={selectedBun.price}
      />
      <div className={`${styles.footer} mt-10`}>
        <span className="text text_type_digits-medium">
          {fullPrice} <MemoCurrencyIcon type="primary" />
        </span>
        <MemoButton
          type="primary"
          size="medium"
          onClick={isOrderButtonDisabled ? undefined : handleOrderButtonClick}
        >
          {isOrderButtonDisabled ? "Заказ оформляется..." : "Оформить заказ"}
        </MemoButton>
      </div>
    </div>
  );
};

export default memo(BurgerConstructor);
