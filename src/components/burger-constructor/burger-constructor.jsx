import React, { memo } from "react";
import { ScrollableContainer } from "../UI";
import { UpdatedConstructorElement } from "./";
import PropTypes from "prop-types";

import styles from "./burger-constructor.module.css";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const MemoCurrencyIcon = memo(CurrencyIcon);
const MemoButton = memo(Button)

const BurgerConstructor = ({ selectedItems, selectedBun, fullPrice }) => {
  return (
    <section className={`${styles.section} pt-25 pb-10`}>
      <UpdatedConstructorElement
        type="top"
        isLocked={true}
        image={selectedBun.image}
        name={`${selectedBun.name} (верх)`}
        price={selectedBun.price}
      />
      <ScrollableContainer>
        <div className={styles.burgerItemsContainer}>
          {selectedItems.map(({ name, price, image, _id, queryCount }) => (
            <UpdatedConstructorElement
              name={name}
              price={price}
              image={image}
              key={_id + queryCount}
            />
          ))}
        </div>
      </ScrollableContainer>
      <UpdatedConstructorElement
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
        <MemoButton type="primary" size="medium">
          Оформить заказ
        </MemoButton>
      </div>
    </section>
  );
};

const propTypesForObject = PropTypes.shape({
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  queryCount: PropTypes.number,
});

BurgerConstructor.propTypes = {
  selectedItems: PropTypes.arrayOf(propTypesForObject),
  selectedBun: propTypesForObject,
  fullPrice: PropTypes.number.isRequired,
};

export default BurgerConstructor;
