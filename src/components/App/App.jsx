import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import styles from "./App.module.css";

import { ROUTE_STATUSES, ROUTES } from "../../constants";
import {
  Error404,
  Main,
  Register,
  Login,
  ForgotPassword,
  ResetPassword,
  Profile,
  Logout,
  Ingredient,
} from "../../pages";
import { AppHeader, OrderDetailsModal, IngredientDetailsModal } from "../";
import { checkRouteStatusAndReturnSelectedRoute } from "../../utils";

const routesAndComponents = [
  { path: ROUTES.MAIN, Component: Main, exact: true },
  {
    path: ROUTES.LOGIN,
    Component: Login,
    status: ROUTE_STATUSES.HIDDEN,
  },
  {
    path: ROUTES.REGISTER,
    Component: Register,
    status: ROUTE_STATUSES.HIDDEN,
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    Component: ForgotPassword,
    status: ROUTE_STATUSES.HIDDEN,
  },
  {
    path: ROUTES.RESET_PASSWORD,
    Component: ResetPassword,
    exact: true,
    status: ROUTE_STATUSES.HIDDEN,
  },
  {
    path: ROUTES.RESET_PASSWORD_WITH_TOKEN,
    Component: ResetPassword,
    status: ROUTE_STATUSES.HIDDEN,
  },
  {
    path: ROUTES.PROFILE,
    Component: Profile,
    status: ROUTE_STATUSES.PROTECTED,
  },
  { path: ROUTES.LOGOUT, Component: Logout, status: ROUTE_STATUSES.PROTECTED },
  { path: ROUTES.INGREDIENTS_WITH_ID, Component: Ingredient },
];

const App = () => {
  const { isRedirectedFromMain } = useSelector((state) => state.modalWindows);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <Switch>
          {isRedirectedFromMain && (
            <Route path={ROUTES.INGREDIENTS_WITH_ID} component={Main} exact />
          )}

          {routesAndComponents.map(({ path, Component, status, ...props }) => {
            const SelectedRoute =
              checkRouteStatusAndReturnSelectedRoute(status);

            return (
              <SelectedRoute path={path} key={path} {...props}>
                <Component />
              </SelectedRoute>
            );
          })}

          <Route path="*" component={Error404} />
        </Switch>
      </main>

      <OrderDetailsModal />
      <IngredientDetailsModal />
    </div>
  );
};

export default App;
