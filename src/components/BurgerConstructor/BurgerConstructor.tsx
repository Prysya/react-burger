import React, { memo, useCallback, useEffect, useMemo } from "react";
import { useDrop } from "react-dnd";
import classnames from "classnames";
import classNames from "classnames";
import { unwrapResult } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

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
  handleWaitingOrderNumber,
} from "../../services/slices";

import { ItemTypes, LoadStatuses, Routes } from "../../enums";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Ingredient } from "../../interfaces";

const MemoCurrencyIcon = memo(CurrencyIcon);

const BurgerConstructor: React.FC = () => {
  const dispatch = useAppDispatch();

  const history = useHistory();

  const {
    auth: { isAuthenticated },
    data: { dataLoading },
    items: { selectedBun, selectedItems, fullPrice },
    modalWindows: {
      isOrderButtonDisabled,
      orderNumberError,
      orderNumberWaitAuth,
    },
  } = useAppSelector(({ items, modalWindows, data, auth }) => ({
    items,
    modalWindows,
    data,
    auth,
  }));

  useEffect(() => {
    dispatch(calculateFullPrice());
  }, [dispatch, selectedBun, selectedItems]);

  useEffect(() => {
    if (isAuthenticated && orderNumberWaitAuth) {
      dispatch(handleOpenOrderDetailsModal())
        .then(unwrapResult)
        .then(() => dispatch(deleteAllIngredients()))
        .catch(() => {});
    }

    //eslint-disable-next-line
  }, []);

  const [{ isHover, item }, drop] = useDrop({
    accept: ItemTypes.Ingredient,
    drop: (item: Ingredient) => {
      return item.type === "bun"
        ? dispatch(handleBunSelection(item))
        : dispatch(handleItemAddition({ ...item, randomId: uuidv4() }));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
      item: monitor.getItem(),
    }),
  });

  const handleOrderButtonClick = useCallback(() => {
    dispatch(handleWaitingOrderNumber());

    dispatch(handleGetUserData())
      .then(unwrapResult)
      .then(() => {
        dispatch(handleOpenOrderDetailsModal())
          .then(unwrapResult)
          .then(() => dispatch(deleteAllIngredients()))
          .catch(() => {});
      })
      .catch(() => {
        history.replace({
          pathname: Routes.Login,
          state: { from: Routes.Main },
        });
      });

    //eslint-disable-next-line
  }, [dispatch, selectedBun, selectedItems]);

  const hoveredClass = useMemo(
    () =>
      selectedItems.length === 0
        ? styles.hoveredElements_empty
        : styles.hoveredElements,
    [selectedItems]
  );

  if (dataLoading === LoadStatuses.Pending) return null;

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
      {selectedBun || selectedItems.length > 0 ? (
        <>
          {selectedBun && (
            <BurgerElement
              index={-1}
              type="top"
              isLocked={true}
              image={selectedBun.image}
              name={`${selectedBun.name} (верх)`}
              price={selectedBun.price}
            />
          )}

          <ScrollableContainer
            className={classnames(
              isHover &&
                (item.type !== "bun" ||
                  (selectedBun && Object.keys(selectedBun).length === 0)) &&
                hoveredClass
            )}
          >
            <ul className={styles.burgerItemsContainer}>
              {selectedItems.map(
                ({ name, price, image, _id, randomId }, index) => (
                  <BurgerElement
                    name={name}
                    price={price}
                    image={image}
                    index={index}
                    key={randomId}
                    id={_id}
                  />
                )
              )}
            </ul>
          </ScrollableContainer>

          {selectedBun && Object.keys(selectedBun).length > 0 && (
            <BurgerElement
              type="bottom"
              isLocked={true}
              index={-1}
              image={selectedBun.image}
              name={`${selectedBun.name} (низ)`}
              price={selectedBun.price}
            />
          )}
          <div className={`${styles.footer} mt-10`}>
            <span className="text text_type_digits-medium">
              {fullPrice} <MemoCurrencyIcon type="primary" />
            </span>
            <Button
              type="primary"
              size="medium"
              onClick={
                selectedBun && !isOrderButtonDisabled
                  ? handleOrderButtonClick
                  : undefined
              }
            >
              {!selectedBun
                ? "Необходимо выбрать булочку"
                : isOrderButtonDisabled
                ? "Заказ оформляется..."
                : "Оформить заказ"}
            </Button>
          </div>
          {orderNumberError && (
            <span
              className={classNames(
                styles.errorMessage,
                "text",
                "text_type_main-default",
                "mt-1"
              )}
            >
              Произошла ошибка при выполнении заказа
            </span>
          )}
        </>
      ) : (
        <div
          className={classNames(
            styles.emptyContainer,
            isHover && styles.emptyContainerHovered,
            "p-1"
          )}
        >
          <h2 className="text text_type_main-medium">
            Выберите или перенесите сюда булочку, а затем ингредиенты
          </h2>
        </div>
      )}
    </div>
  );
};

export default memo(BurgerConstructor);
