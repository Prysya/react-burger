import React, { memo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import classNames from "classnames";

import styles from "./NavButton.module.css";
import { TIconProps } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";

interface INavButton {
  IconComponent?: ({ type }: TIconProps) => JSX.Element;
  text: string;
  to: string;
  textSize?: "default" | "large" | "medium" | "small";
}

const NavButton: React.FC<INavButton> = ({
  IconComponent,
  text,
  to,
  textSize = "default",
}) => {
  const { pathname } = useLocation();

  return (
    <div className="p-5">
      <NavLink
        exact
        className={classNames(
          styles.link,
          "text",
          `text_type_main-${textSize}`,
          "text_color_inactive"
        )}
        activeClassName={styles.active}
        to={to}
      >
        {IconComponent && (
          <IconComponent type={pathname === to ? "primary" : "secondary"} />
        )}
        {text}
      </NavLink>
    </div>
  );
};

export default memo(NavButton);
