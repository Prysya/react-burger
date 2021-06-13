import React, { memo, useContext } from "react";
import { ScrollableContainer } from "../UI";
import { BurgerElement } from "./";
import PropTypes from "prop-types";

import styles from "./BurgerConstructor.module.css";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerConstructorContext } from "../../context";

const MemoCurrencyIcon = memo(CurrencyIcon);
const MemoButton = memo(Button);

const BurgerConstructor = ({
  fullPrice,
  handleOpenOrderDetailsModal,
  isOrderButtonDisabled,
}) => {
  const { selectedBun, selectedItems } = useContext(BurgerConstructorContext);

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
              nodeType="li"
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
          {fullPrice} <MemoCurrencyIcon type="primary" />
        </span>
        <MemoButton
          type="primary"
          size="medium"
          onClick={
            isOrderButtonDisabled ? undefined : handleOpenOrderDetailsModal
          }
        >
          {isOrderButtonDisabled ? "Заказ оформляется..." : "Оформить заказ"}
        </MemoButton>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  fullPrice: PropTypes.number.isRequired,
  handleOpenOrderDetailsModal: PropTypes.func.isRequired,
  isOrderButtonDisabled: PropTypes.bool,
};

export default BurgerConstructor;
