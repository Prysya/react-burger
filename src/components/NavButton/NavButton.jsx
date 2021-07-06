import React, { memo } from "react";
import { NavLink, useLocation } from "react-router-dom";

import styles from "./NavButton.module.css";

import PropTypes from "prop-types";
import classNames from "classnames";

const NavButton = ({ IconComponent, text, to, textSize = "default" }) => {
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

NavButton.propTypes = {
  IconComponent: PropTypes.func,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  textSize: PropTypes.oneOf(['default', 'large', 'medium', 'small'])
};

export default memo(NavButton);
