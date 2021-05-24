import React, {memo} from 'react';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

import styles from './UpdatedConstructorElement.module.css'

const MemoDragItem = memo(DragIcon);

const UpdatedConstructorElement = ({type, isLocked, name, price, image, nodeType = 'div'}) => {
  const NodeType = nodeType;

  return (
    <NodeType className={`${styles.container} pl-8`}>
      {!isLocked && <span className={styles.dragItem}><MemoDragItem type="primary"/></span>}
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={name}
        price={price}
        thumbnail={image}
      />
    </NodeType>
  );
}

UpdatedConstructorElement.propTypes = {
  type: PropTypes.oneOf(['top', 'bottom']),
  isLocked: PropTypes.bool,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  nodeType: PropTypes.string,
}


export default memo(UpdatedConstructorElement);
