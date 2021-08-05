import React, { memo, useRef } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./BurgerElement.module.css";
import { useDrag, useDrop } from "react-dnd";
import classnames from "classnames";
import { deleteIngredient, handleItemMove } from "../../../services/slices";
import { ItemTypes } from "../../../enums";
import { useAppDispatch } from "../../../hooks";
import { Ingredient } from "../../../interfaces";

const MemoDragItem = memo(DragIcon);

interface IBurgerElement {
  type?: "top" | "bottom";
  isLocked?: boolean;
  name: string;
  price: number;
  image: string;
  index: number;
  id?: string;
}

const BurgerElement: React.FC<IBurgerElement> = ({
  type,
  isLocked,
  name,
  price,
  image,
  index,
  id,
}) => {
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.BurgerElement,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: Ingredient, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex || !dragIndex || !hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

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
    type: ItemTypes.BurgerElement,
    item: { id, index },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const containerIsDragging = isDrag ? styles.containerIsDragging : "";

  drag(drop(ref));

  return (
    <div
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
    </div>
  );
};

export default memo(BurgerElement);
