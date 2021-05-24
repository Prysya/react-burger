import React from 'react';
import PropTypes from "prop-types";
import styles from './OrderDetails.module.css';

//TODO: text-shadow

const OrderDetails = ({orderNumber}) => {
  return (
    <>
      <h3 className={`${styles.orderNumber} text text_type_digits-large mb-8`}>{String(orderNumber).padStart(6, "0")}</h3>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img className='mb-15' src='/' alt={'galochka'} />
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </>
  );
}

OrderDetails.propTypes = {
  orderNumber: PropTypes.number.isRequired,
}

export default OrderDetails;
