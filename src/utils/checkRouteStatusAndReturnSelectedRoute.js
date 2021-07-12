import { Route } from "react-router-dom";
import { ROUTE_STATUSES } from "../constants";
import { HiddenForAuthUsersRoute, ProtectedRoute } from "../components";

export const checkRouteStatusAndReturnSelectedRoute = (status) =>
  status === ROUTE_STATUSES.PROTECTED
    ? ProtectedRoute
    : status === ROUTE_STATUSES.HIDDEN
    ? HiddenForAuthUsersRoute
    : Route;
