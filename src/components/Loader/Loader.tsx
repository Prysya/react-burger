import React from "react";
import style from "./Loader.module.css";

const Loader:React.FC = () => {
  return (
    <div className={style.loadContainer}>
      <div className={style.ldsHeart}>
        <div />
      </div>
    </div>
  );
};

export default Loader;
