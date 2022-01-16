import { Navigate } from "react-router-dom";
import { useUser } from "../hook/useUser";

const PrivateRoute = ({ children }) => {
  const { isLogin } = useUser();
  return isLogin ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
