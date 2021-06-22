import React, {memo, useCallback, useMemo} from "react";
import { ScrollableContainer } from "../UI";
import { BurgerElement } from "./";

import styles from "./BurgerConstructor.module.css";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllIngredients,
  handleBunSelection,
  handleItemAddition,
  handleOpenOrderDetailsModal,
} from "../../services/reducers";
import classnames from "classnames";
import { useDrop } from "react-dnd";
import { ITEM_TYPES } from "../../constants";

const MemoCurrencyIcon = memo(CurrencyIcon);
const MemoButton = memo(Button);

const BurgerConstructor = () => {
  const {
    items: { selectedBun, selectedItems, fullPrice },
    modalWindows: { isOrderButtonDisabled },
  } = useSelector(({ items, modalWindows }) => ({ items, modalWindows }));

  const [{ isHover, item }, drop] = useDrop({
    accept: ITEM_TYPES.ingredient,
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

  const dispatch = useDispatch();

  const handleOrderButtonClick = useCallback(() => {
    dispatch(handleOpenOrderDetailsModal({ selectedItems, selectedBun }))
      .then(() => {
        dispatch(deleteAllIngredients());
      })
      .catch((err) => console.error(err));

    //eslint-disable-next-line
  }, [dispatch]);

  const hoveredClass = useMemo(() => selectedItems.length === 0
    ? styles.hoveredElements_empty
    : styles.hoveredElements, [selectedItems])

  return (
    <section
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
        className={classnames(
          isHover && item.type !== "bun" && hoveredClass
        )}
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
    </section>
  );
};

export default BurgerConstructor;
