import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import styles from "./tab-width-image.module.css";
import PropTypes from "prop-types";

const TabWithImage = ({ IconComponent, text, isActive }) => (
  <div className={`${styles.container} p-5`}>
    <IconComponent type={isActive ? "primary" : "secondary"} />
    <NavLink
      className={`${styles.link} text text_type_main-default pl-2 ${
        !isActive ? "text_color_inactive" : styles.active
      } `}
      to="#"
    >
      {text}
    </NavLink>
  </div>
);

TabWithImage.propTypes = {
  IconComponent: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
};

export default memo(TabWithImage);
