import React from "react";
import FadeIn from "react-fade-in";
import PropTypes from "prop-types";

const FadeAnim = ({ children, className, wrapperTag = "div" }) => {
  return (
    <FadeIn className={className} wrapperTag={wrapperTag}>
      {children}
    </FadeIn>
  );
};

FadeAnim.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  wrapperTag: PropTypes.string,
};

export default FadeAnim;
