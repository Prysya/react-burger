import React, { memo} from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./NavItem.module.css";
import PropTypes from "prop-types";
import classNames from "classnames";

const NavItem = ({ IconComponent, text, to }) => {
  const {pathname} = useLocation();

  return (
    <div className="p-5">
      <NavLink
        exact
        className={classNames(
          styles.link,
          "text",
          "text_type_main-default",
          "text_color_inactive"
        )}
        activeClassName={styles.active}
        to={to}
      >
        <IconComponent type={pathname === to ? "primary" : "secondary"} />
        {text}
      </NavLink>
    </div>
  );
};

NavItem.propTypes = {
  IconComponent: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default memo(NavItem);
