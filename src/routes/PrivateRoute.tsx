import React, { ReactElement } from "react";
import { Route, Navigate, RouteProps } from "react-router-dom";
import { useAuth } from "../AuthContext";

type PrivateRouteProps = {
  children: ReactElement;
  //   path: string;
  //   element: React.FC;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const auth = useAuth();
  return auth ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
