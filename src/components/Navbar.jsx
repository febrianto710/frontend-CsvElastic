import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const token = Cookies.get("token");
  const [dataToken, setDataToken] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      const data = jwtDecode(token);
      setDataToken(data);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/", { replace: true });
  };

  return (
    <div className="px-4 h-[80px] bg-slate-300 py-6 mb-12 flex justify-between items-center">
      <span className="text-xl font-bold sm:text-2xl poppins-regular">
        CsvElastic
      </span>

      {token ? (
        <div className="flex items-center ms-2">
          <span
            className="hidden sm:block truncate max-w-[120px] sm:max-w-none"
            title={dataToken?.username}
          >
            Hello, {dataToken?.username}
          </span>
          <button
            className="text-sm px-6 ms-4 py-2 sm:px-8 bg-red-400 rounded-md shadow-md font-bold hover:cursor-pointer hover:bg-red-500"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
