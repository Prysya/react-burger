import React, { JSXElementConstructor } from "react";
import FadeIn from "react-fade-in";

interface IFadeAnim {
  className: string;
  wrapperTag?: JSXElementConstructor<any>;
}

const FadeAnim: React.FC<IFadeAnim> = ({ children, className, wrapperTag }) => {
  return (
    <FadeIn className={className} wrapperTag={wrapperTag}>
      {children}
    </FadeIn>
  );
};

export default FadeAnim;
