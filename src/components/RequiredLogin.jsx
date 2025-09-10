import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const RequireLogin = ({ children }) => {
  const token = Cookies.get("token");
  try {
    const data = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // waktu saat ini (detik)

    // token expired
    if (currentTime > data.exp) {
      Cookies.remove("token");
      return (
        <Navigate to={"/"} state={{ message: "Your token has been expired" }} />
      );
    }
  } catch (error) {
    console.log(error);
    return <Navigate to={"/"} state={{ message: "you must login first" }} />;
  }
  // if (!token) {
  //   return <Navigate to={"/"} state={{ message: "you must login first" }} />;
  // }

  return children;
};

export default RequireLogin;
