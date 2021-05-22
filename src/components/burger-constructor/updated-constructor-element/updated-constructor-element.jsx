import React, {memo} from 'react';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

import styles from './updated-constructor-element.module.css'

const MemoDragItem = memo(DragIcon);

const UpdatedConstructorElement = ({type, isLocked, name, price, image}) => {
  return (
    <div className={`${styles.container} pl-8`}>
      {!isLocked && <span className={styles.dragItem}><MemoDragItem type="primary"/></span>}
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={name}
        price={price}
        thumbnail={image}
      />
    </div>
  );
}

UpdatedConstructorElement.propTypes = {
  type: PropTypes.oneOf(['top', 'bottom']),
  isLocked: PropTypes.bool,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
}


export default memo(UpdatedConstructorElement);
