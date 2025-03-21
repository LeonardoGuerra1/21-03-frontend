import { Navigate } from "react-router-dom";
import { ROUTER } from "../../router";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  validate: boolean,
  children: ReactNode
}

function ProtectedRoute({ validate, children }: ProtectedRouteProps) {
  if (!validate) return <Navigate to={ROUTER.INDEX.path} />
  return children
}

export default ProtectedRoute;