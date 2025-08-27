import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const RequireLogin = ({ children }) => {
  const token = Cookies.get("token");

  if (!token) {
    return <Navigate to={"/"} state={{ message: "you must login first" }} />;
  }

  return children;
};

export default RequireLogin;
