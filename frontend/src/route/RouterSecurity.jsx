import { Navigate, Outlet } from "react-router-dom";

const RouterSecurity = ({ isAllowed, redirectPath = "/login", children }) => {
  if (!isAllowed) {
    return (
        <Navigate to = {redirectPath} replace />
    )
  }
  return children ? children : <Outlet />
};

export default RouterSecurity;
