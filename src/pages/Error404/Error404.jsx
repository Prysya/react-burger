import React from "react";
import classNames from "classnames";
import { useHistory } from "react-router-dom";

import styles from "./Error404.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { ROUTES } from "../../constants";
import { FadeAnim } from "../../uikit";

const Error404 = () => {
  const history = useHistory();

  return (
    <FadeAnim className={styles.container}>
      <h2
        className={classNames(
          "text",
          "text_type_digits-large",
          styles.text,
          styles.number
        )}
      >
        404
      </h2>
      <p className={classNames("text", "text_type_main-large", styles.text)}>
        страница не найдена
      </p>
      <Button
        type="primary"
        size="medium"
        onClick={() => history.replace({ pathname: ROUTES.MAIN })}
      >
        Вернуться на главную
      </Button>
    </FadeAnim>
  );
};

export default Error404;
