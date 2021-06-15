import React, { memo } from "react";
import { ScrollableContainer } from "../UI";
import { BurgerElement } from "./";

import styles from "./BurgerConstructor.module.css";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllIngredientsAndBun,
  handleOpenOrderDetailsModal,
} from "../../services/reducers";
import classnames from "classnames";
import {useDrop} from "react-dnd";

const MemoCurrencyIcon = memo(CurrencyIcon);
const MemoButton = memo(Button);

const BurgerConstructor = () => {
  const {
    items: { selectedBun, selectedItems, fullPrice },
    modalWindows: { isOrderButtonDisabled },
  } = useSelector(({ items, modalWindows }) => ({ items, modalWindows }));

  // const [, dropTarget] = useDrop({
  //   accept: 'burgerElement',
  //   drop(itemId) {
  //     console.log("BURGERCONST:", itemId)
  //   }
  // })

  const dispatch = useDispatch();

  const handleOrderButtonClick = () => {
    dispatch(handleOpenOrderDetailsModal({ selectedItems, selectedBun }))
      .then(() => {
        dispatch(deleteAllIngredientsAndBun());
      })
      .catch((err) => console.error(err));
  };

  return (
    <section className={classnames(styles.section, 'pt-25', 'pb-10')}>
      <BurgerElement
        type="top"
        isLocked={true}
        image={selectedBun.image}
        name={`${selectedBun.name} (верх)`}
        price={selectedBun.price}
      />

      <ScrollableContainer>
        <ul className={styles.burgerItemsContainer} >
          {selectedItems.map(({ name, price, image, _id }, index) => (
            <BurgerElement
              name={name}
              price={price}
              image={image}
              nodeType="li"
              index={index}
              key={_id + index}
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
