import React from "react";
import styles from "./ScrollableContainer.module.css";
import classnames from "classnames";

interface IScrollableContainer {
  className: string;
  containerRef?: React.RefObject<HTMLDivElement>;
  [x:string]: any;
}

const ScrollableContainer: React.FC<IScrollableContainer> = ({
  children,
  className,
  containerRef,
  ...props
}) => {
  return (
    <div
      className={classnames(styles.container, className)}
      ref={containerRef}
      {...props}
    >
      {children}
    </div>
  );
};

export default ScrollableContainer;
