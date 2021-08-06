import { Route, RouteProps } from "react-router-dom";
import { RouteStatuses } from "../enums";
import { HiddenForAuthUsersRoute, ProtectedRoute } from "../components";
import React from "react";

export const checkRouteStatusAndReturnSelectedRoute = (
  status: RouteStatuses.Hidden | RouteStatuses.Protected | undefined
): React.FC<RouteProps> | typeof Route =>
  status === RouteStatuses.Protected
    ? ProtectedRoute
    : status === RouteStatuses.Hidden
    ? HiddenForAuthUsersRoute
    : Route;
