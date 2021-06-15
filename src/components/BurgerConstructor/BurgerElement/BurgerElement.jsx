import React, { memo, useRef } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

import styles from "./BurgerElement.module.css";
import { useDrag, useDrop } from "react-dnd";
import classnames from "classnames";
import { useDispatch } from "react-redux";
import { deleteIngredient, handleItemMove } from "../../../services/reducers";

const MemoDragItem = memo(DragIcon);

const BurgerElement = ({
  type,
  isLocked,
  name,
  price,
  image,
  nodeType = "div",
  index,
  id,
}) => {
  const NodeType = nodeType;

  const dispatch = useDispatch();

  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: "burgerElement",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(handleItemMove({ dragIndex, hoverIndex }));
      item.index = hoverIndex;
    },
  });

  const [{ isDrag }, drag] = useDrag({
    type: "burgerElement",
    item: { id, index },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  console.log(id);

  const containerIsDragging = isDrag ? styles.containerIsDragging : "";

  drag(drop(ref));

  return (
    <NodeType
      className={classnames(styles.container, "pl-8", containerIsDragging)}
      ref={isLocked ? null : ref}
      data-handler-id={handlerId}
    >
      {!isLocked && (
        <span className={styles.dragItem}>
          <MemoDragItem type="primary" />
        </span>
      )}
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={name}
        price={price}
        thumbnail={image}
        handleClose={
          isLocked
            ? undefined
            : () => dispatch(deleteIngredient({ index, name }))
        }
      />
    </NodeType>
  );
};

BurgerElement.propTypes = {
  type: PropTypes.oneOf(["top", "bottom"]),
  isLocked: PropTypes.bool,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  nodeType: PropTypes.string,
  index: PropTypes.number,
  id: PropTypes.string,
};

export default memo(BurgerElement);
