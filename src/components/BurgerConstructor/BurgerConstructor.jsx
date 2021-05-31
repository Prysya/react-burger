import React, { memo } from "react";
import { ScrollableContainer } from "../UI";
import { BurgerElement } from "./";
import PropTypes from "prop-types";

import styles from "./BurgerConstructor.module.css";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const MemoCurrencyIcon = memo(CurrencyIcon);
const MemoButton = memo(Button)

const BurgerConstructor = ({ selectedItems, selectedBun, fullPrice, handleOpenOrderDetailsModal }) => {
  return (
    <section className={`${styles.section} pt-25 pb-10`}>
      <BurgerElement
        type="top"
        isLocked={true}
        image={selectedBun.image}
        name={`${selectedBun.name} (верх)`}
        price={selectedBun.price}
      />
      <ScrollableContainer>
        <ul className={styles.burgerItemsContainer}>
          {selectedItems.map(({ name, price, image, _id, queryCount }) => (
            <BurgerElement
              name={name}
              price={price}
              image={image}
              nodeType='li'
              key={_id + queryCount}
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
          {fullPrice} <MemoCurrencyIcon type="primary"/>
        </span>
        <MemoButton type="primary" size="medium" onClick={handleOpenOrderDetailsModal}>
          Оформить заказ
        </MemoButton>
      </div>
    </section>
  );
};

const burgerItemPropTypes = PropTypes.shape({
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  queryCount: PropTypes.number,
});

BurgerConstructor.propTypes = {
  selectedItems: PropTypes.arrayOf(burgerItemPropTypes),
  selectedBun: burgerItemPropTypes,
  fullPrice: PropTypes.number.isRequired,
  handleOpenOrderDetailsModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;
